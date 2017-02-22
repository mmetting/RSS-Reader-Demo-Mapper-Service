# RSS Reader Demo Mapper Service
This service is based on RHMAP's API Mapper, which is a visual tool for transforming the response of JSON APIs. It allows users to:

* Rename Fields
* Exclude fields which are not needed
* Transform Fields using built-in transformations, or custom transforms they have defined themselves

## Usage in the RSS Reader Demo
For our demo, we are using the RSS Mapper Service to streamline the response from the [Connector Service](https://github.com/mmetting/RSS-Reader-Demo-RSS-Connector). We don't want the client to retrieve information, which are not necessary and can be considered overhead. Additionally, we would like to transform the response to extract images from the content of the RSS feed.

_In other words_: We mobile-optimise our RSS feed!

> In order to use the Mapping Service, the [Connector Service](https://github.com/mmetting/RSS-Reader-Demo-RSS-Connector) would need to be deployed and reachable from the internet. To check your Connector Service, try to reach it via a browser: ![alt text](./pictures/get_url.png "Get the URL") ![alt text](./pictures/append_feeds.png "Result")

## Provision a new API Mapper Service
### Prepare

- Click on `MBaaS Services & APIs`
- Select `Provision a new MBaaS Service/API`
![alt text](./pictures/mbaas_service.png "Provision a service")

- Choose the `API Mapper` template
- Name your new Service: `RSS Mapper`
![alt text](./pictures/specify_details.png "Specify the name")

- Click `Next`
- Wait for the service to provision
- Click `Finish`, you'll be directed to the details screen of your new service.
![alt text](./pictures/finish_provisioning.png "Finished provisioning")

- Scroll down and make the MBaaS Service `public` and add it to the RSS project.
![alt text](./pictures/make_public.png)

- Select the `Deploy` tab in the AppStudio and deploy the MBaaS service:
![alt text](./pictures/deployment_finished.png "Deployment finished")

- Visit the data browser, depending on your application configuration a `Upgrade Database` action will be available, this means the application is using an old/legacy shared database and it needs to be upgraded to use a dedicated one. Note the application needs to be first finished its initial deploy and be running to perform this task.
![alt text](./pictures/upgrade_database.png "Upgrade Database")

- Click `Upgrade now`
![alt text](./pictures/upgrade_now.png "Upgrade now")

- Click `Next` and Re-deploy the service

### Add the transformation implementation to the service

- Click the `Editor` tab
- Expand the `transformations` folder
- Add a new file in the `transformations` by clicking `File -> New File`

- Name the new file:  `contentToImageTransformation.js`
- Add the following code snippet to the newly created [file](./transformations/contentToImageTransformation.js) and save it:

```
// First, tell the mapper what value types this transformation is valid for
exports.type = "string";
// Then, implement the transformation function
exports.transform = function(content) {

  if (content.length > 0) {
    //extract the first image url
    var regex = /<img.*?src="(.*?)"/;
    var array = regex.exec(content);
    
    if (array !== null) {
      var imageSrc = array[1];  
      if (imageSrc.length > 0) {
        return imageSrc;   
      }
    }
  }
  
  return content;
};

```

![alt text](./pictures/transformations.png "contentToImageTransformation.js")

- Open the [`application.js`](./application.js) file and add the `contentToImageTransformation` transformation:

```
...
app.use('/', apiMapper({
  transformations: {
    // Add your custom transformations here! `customMixedArrayTransform` is an example of this.
    contentToImageTransformation: require('./transformations/contentToImageTransformation.js')
  }
}));
...
```
- Save your changes
- Select the `Deploy` tab in the AppStudio and deploy the MBaaS service:
![alt text](./pictures/deployment_finished.png "Deployment finished")

### Configure the service

- Click on the `Preview` tab
- Select `Create New Request`
![alt text](./pictures/add_new_request.png "Create a new request")

- Specify the URL of the deployed [Connector Service](https://github.com/mmetting/RSS-Reader-Demo-RSS-Connector)
- Specify `/feeds` as the Mount Path
- Click `Create Request` 
![alt text](./pictures/configuration_1.png "Add the URL and Mount Path")

- Click `Add Mapping+`
![alt text](./pictures/add_mapping.png "Click Add Mapping")

- Expand the Array items section
![alt text](./pictures/expanded_array_items.png "Expanded array items")

- Click on the `link` array item and un-check `Use this field?`
- Click on the `pubDate` array item and un-check `Use this field?`
- Click on the `content` array item:
    - Rename to `image`
    - Select the `contentToImageTransformation` transformation
- Click on the `contentSnippet` array item:    
    - Rename to `teaser`
- Click on the `guid` array item and un-check `Use this field?`

- The final result should look like the following:
![alt text](./pictures/mapping.png "Mapping")

> Sometimes the AppStudio reverts your changes on the mapping, please make sure, all rename actions and setting the transformation on the `content -> image` array item are set.

- Click `Done`
- Select the `Deploy` tab in the AppStudio and deploy the MBaaS service:
![alt text](./pictures/deployment_finished.png "Deployment finished")
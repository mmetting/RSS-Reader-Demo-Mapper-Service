##RSS Reader Demo Mapper Service
This service is based on RHMAP's API Mapper, which is a visual tool for transforming the response of JSON APIs. It allows users to:

* Rename Fields
* Exclude fields which are not needed
* Transform Fields using built-in transformations, or custom transforms they have defined themselves

###Setup
1. Make the newly created service public
![Public Service](/public/images/publicservice.jpg)
2. Visit the data browser, depending on your application configuration a "Upgrade Database" action will be available, this means the application is using an old/legacy shared database and it needs to be upgraded to use a dedicated one. Note the application needs to be first finished its initial deploy and be running to perform this task.
![Public Service](/public/images/databrowser.jpg)
3. Re-deploy the service
4. You can now use the API mapper under the "Preview" section of the studio. The mapper can be popped out of the studio fullscreen by visiting the deploy host of this service in a web browser. 

##Writing your own Mappings
As well as using built-in mappings, you can also write your own transformation functions. Here's how. 
1. In the studio's code editor, open the `application.js` file in the root directory.
2. You'll notice the API mapper route is instantiated by providing one optional transformation, called `mixedArrayTransform`. By looking at this, you can probably figure out how to add your own!  
We're going to add a transformation called 'even', which changes even numbers to 0, and odd numbers to 1 - really simple! Here's the implementation:
    
    // First, tell the mapper it operates on numbers
    exports.type = 'number';
    // then, implement the function.
    exports.transform = function(n){
      return n%2;
    };
      
3. Now that we've created our transformation file, we need to include it in `application.js`. We'll replace the instantiation of the API mapper route with something like this:
    
    app.use('/', require('./lib/api')({      
      transformations : {
        even : require('./transformations/even.js')
      }
    }));
    
4. You can now use your new transformation on numeric types!

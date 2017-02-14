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
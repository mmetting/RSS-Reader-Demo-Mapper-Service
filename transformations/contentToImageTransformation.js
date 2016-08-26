// First, tell the mapper what value types this transformation is valid for
exports.type = "string";
// Then, implement the transformation function
exports.transform = function(content) {

  if (content.length > 0) {
    var regex = /<img.*?src="(.*?)"/;
    var imageSrc = regex.exec(content)[1];
    
    if (imageSrc.length > 0) {
      return imageSrc;   
    } else {
      return content;
    }
  } else {
    return content;
  }
};
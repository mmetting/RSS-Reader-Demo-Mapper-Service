// First, tell the mapper what value types this transformation is valid for
exports.type = "string";
// Then, implement the transformation function
exports.transform = function(content) {

  var regex = /<img.*?src="(.*?)"/;
  var imageSrc = regex.exec(content)[1];

  return imageSrc;
};
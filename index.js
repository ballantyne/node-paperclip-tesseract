var tesseract = require('tesseract_native');
var Ocr = new tesseract.OcrEio();

module.exports = function(paperclip) {
  var obj = {};
  obj.paperclip = paperclip;
  obj.perform = function(options, next) {
    Ocr.ocr(this.paperclip.file.buffer, function(err, result) {
      var object = {};
      if (result) {
        object.text = result;
      }
      console.log(object);
      next(err, object);
    });
  }
  return obj;
}


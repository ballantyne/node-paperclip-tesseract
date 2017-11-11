const tesseract           = require('tesseract_native');
const Ocr                 = new tesseract.OcrEio();

module.exports            = function(paperclip) {
  var obj = {};
  obj.paperclip           = paperclip;
  obj.perform             = function(options, next) {
    var attribute;
    if (options.attribute) {
      attribute           = options.attribute;
    } else {
      attribute           = 'text';
    }
    
    Ocr.ocr(this.paperclip.file().file.buffer, function(err, result) {
      var object          = {};
      if (result) {
        object[attribute] = result;
      }
      next(err, object);
    });
  }
  return obj;
}


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
    var opts;
    if (options.options) {
      opts = options.options;
    } else {
      opts = {};
    }
    
    Ocr.ocr(this.paperclip.file().file.buffer, opts, function(err, result) {
      var object          = {};
      if ((result && result.trim().length > 0) || options.empty) {
        object[attribute] = result.trim();
      } else {
        object[attribute] = false;
      }
      next(err, object);
    });
  }
  return obj;
}


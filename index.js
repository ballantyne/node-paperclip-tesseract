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
    
    if (options.allow_empty == true && options.mark_false == true) {
      options.allow_empty = false;
    }

    Ocr.ocr(this.paperclip.file().file.buffer, opts, function(err, result) {
      var object          = {};
      if ((result && result.trim().length > 0) || options.allow_empty) {
        object[attribute] = result.trim();
      } else {
        if (options.mark_false) {
          object[attribute] = false;
        }
      }
      next(err, object);
    });
  }
  return obj;
}


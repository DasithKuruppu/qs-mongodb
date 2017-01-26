var moment = require('moment');
exports.convertType = function (obj) {
  var key, value;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      if ('object' === typeof value) {
        value = exports.convertType(value);
      } else if ('string' === typeof value) {
        var strReg = value.match(/^["'](.+)["']$/);
        if (strReg) {
          value = strReg[1];
        } else {
          if (parseFloat(value) == value) {
            value = parseFloat(value);
          } else {
            if (moment(value, moment.ISO_8601, true).isValid()) {
              value = new Date(value);
            }
            else {
              if (value === 'true') {
                value = true;
              } else if (value === 'false') {
                value = false;
              }
            }
          }
        }
      }
      obj[key] = value;
    }
  }
  return obj;
};
// checks if the object has all the metioned fields, @para: obj {}, fields []
module.exports = function checkFields(obj, fields) {
  fields.forEach((fname) => {
    if (!obj.hasOwnProperty(fname)) {
      return false;
    }
  });
  return true;
};

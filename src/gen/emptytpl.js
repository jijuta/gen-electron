const camelCase = require("camelcase");
const utils = require("./tpl/utils.js");
String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function setctrl(items, self) {
  let payload = self.payload;
  let tb = payload.items[0];
  return JSON.stringify(payload);
}
module.exports = {
    getCtrl : setctrl
}
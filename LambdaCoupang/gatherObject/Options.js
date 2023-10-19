const OptionRows = require('./OptionRows.js');
const AttributeVendorItemMap = require('./AttributeVendorItemMap.js');

class Options{
    constructor(jsonInfo){
        this.jsonInfo = jsonInfo;
        this.attributeVendorItemMap = new AttributeVendorItemMap(this.jsonInfo["attributeVendorItemMap"]);
        this.optionRows = new OptionRows(this.jsonInfo["optionRows"]);
    }
    getJsonInfo = () => {
        return this.jsonInfo;
    }
    getAttributeVendorItemMap = () => {
        return this.attributeVendorItemMap;
    }
    getOptionRows = () => {
        return this.optionRows;
    }
}
module.exports = Options;
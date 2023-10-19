const VendorItemId = require("./VendorItemId.js");

class AllVendorItemIds{
    constructor(valueIds){
        this.valueIds = valueIds; //분석 할 Array Type
        
        this.vendorItemIds = new Array(); //VendorItemId 클래스가 push로 들어가게 됨.

        for(let i = 0; i < this.valueIds.length; i++){
            this.vendorItemIds.push(new VendorItemId(this.valueIds.at(i)))
        }

    }
    getVendorItemIds = () => this.vendorItemIds; //return Array Type

    getVendorItemId = i => this.vendorItemIds.at(i); //return i 번째 VendorItemId Class
}
module.exports = AllVendorItemIds;
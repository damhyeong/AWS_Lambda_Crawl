class GatherVendorItemIdArray{
    constructor(){
        this.gatherVendorItemIdArray = new Array();
    }
    addVendorItemIdArray(vendorItemIdArray){
        this.gatherVendorItemIdArray.push(vendorItemIdArray);
    }
    getGatherVendorItemIdArray(){
        return this.gatherVendorItemIdArray;
    }
}
module.exports = GatherVendorItemIdArray;
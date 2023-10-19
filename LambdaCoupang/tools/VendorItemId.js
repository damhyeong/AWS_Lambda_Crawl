class VendorItemId{
    constructor(valueId){
        this.buyableQuantity = valueId.getBuyableQuantity(); //Long Type
        this.vendorItemId = valueId.getVendorItemId(); //Long Type
        this.valueId = valueId.getValueId(); //String Type
        this.itemId = valueId.getItemId(); //Long Type
        this.itemName = valueId.getItemName(); //String Type
        this.i18nOriginPrice = valueId.getI18nOriginPrice(); //String Type
        this.i18nSalePrice = valueId.getI18nSalePrice(); //String Type
        this.i18nCouponPrice = valueId.getI18nCouponPrice(); //String Type
        this.deliveryType = valueId.getDeliveryType(); //String Type
        this.mainAttribute = new Array(); //String Type
        this.detailAttribute = new Array(); //String Type
    }
    setBuyableQuantity(num){
        this.buyableQuantity = num;
    }
    getBuyableQuantity(){
        return this.buyableQuantity;
    }
    getVendorItemId(){
        return this.vendorItemId;
    }
    getValueId(){
        return this.valueId;
    }
    getItemId(){
        return this.itemId;
    }
    getItemName(){
        return this.itemName;
    }
    getI18nOriginPrice(){
        return this.i18nOriginPrice;
    }
    getI18nSalePrice(){
        return this.i18nSalePrice;
    }
    getI18nCouponPrice(){
        return this.i18nCouponPrice;
    }
    getDeliveryType(){
        return this.deliveryType;
    }

    addMainAttribute(mAttr){
        return this.mainAttribute.push(mAttr);
    }
    getMainAttribute(){//return Array Type
        return this.mainAttribute;
    }
    addDetailAttribute(dAttr){
        return this.detailAttribute.push(dAttr);
    }
    getDetailAttribute(){//return Array Type
        return this.detailAttribute;
    }
}
module.exports = VendorItemId;
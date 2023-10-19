class ValueId{
    constructor(jsonInfo, valueId){
        this.jsonInfo = jsonInfo;
        this.buyableQuantity = this.jsonInfo["buyableQuantity"]; //Long Type
        this.vendorItemId = this.jsonInfo["vendorItemId"]; //Long Type
        this.valueId = valueId; //String Type (색상, 사이즈가 존재할 경우, xx:xx or xx, xx로 존재한다.)
                                //따라서 indexOf로 옵션의 일치 여부를 판단 : [-1 이거나 일치하거나]
        this.itemId = this.jsonInfo["itemId"]; //Long Type (vendorItemId의 다른 버전.)
        this.itemName = this.jsonInfo["itemName"]; // 이름 (ex - '담순 긴팔 셔츠형 잠옷 파자마 상하 세트')
        this.i18nOriginPrice = "none"; //정상가격
        this.i18nSalePrice = "none";   //할인가격
        this.i18nCouponPrice = "none"; //쿠폰가격
        this.deliveryType = this.jsonInfo["quantityBase"][0]['delivery']['type']//str - 배송 타입
        this.mainAttribute = new Array(); // ex - 색깔 or 사이즈
        this.detailAttribute = new Array(); // ex - Red or L 등등
        //"VENDOR_DELIVERY" or "ROCKET_MERCHANT" or "ROCKET_DELIVERY"
        this._getPrice();
    }
    getBuyableQuantity = () => this.buyableQuantity;
    getVendorItemId = () => this.vendorItemId;
    getValueId = () => this.valueId;
    getItemId = () => this.itemId;
    getItemName = () => this.itemName;
    getI18nOriginPrice = () => this.i18nOriginPrice;
    getI18nSalePrice = () => this.i18nSalePrice;
    getI18nCouponPrice = () => this.i18nCouponPrice;
    getDeliveryType = () => this.deliveryType;

    addMainAttribute(mainAttr){
        this.mainAttribute.push(mainAttr);
    }
    getMainAttributeArray = () => this.mainAttribute;

    addDetailAttribute(detailAttr){
        this.detailAttribute.push(detailAttr);
    }
    getDetailAttribute = () => this.detailAttribute;

    _getPrice = () => {
        try {
            let readInfo1 = this.jsonInfo["quantityBase"][0]['price']['i18nOriginPrice']['amount'];
            this.i18nOriginPrice = readInfo1;
        } catch (error) {
            //console.log("Cannot Find Origin Price");
        }
        try {
            let readInfo2 = this.jsonInfo["quantityBase"][0]['price']['i18nSalePrice']['amount'];
            this.i18nSalePrice = readInfo2;
        } catch (error) {
            //console.log("Cannot Find Sale Price");
        }
        try {
            let readInfo3 = this.jsonInfo["quantityBase"][0]['price']['i18nCouponPrice']['amount'];
            this.i18nCouponPrice = readInfo3;
        } catch (error) {
            //console.log("Cannot Find Coupon Price");
        }
    }
}
module.exports = ValueId;
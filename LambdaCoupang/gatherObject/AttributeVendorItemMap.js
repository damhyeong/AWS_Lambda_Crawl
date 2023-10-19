const ValueId = require('./ValueId.js');

class AttributeVendorItemMap{
    constructor(jsonInfo){
        this.jsonInfo = jsonInfo;
        this.valueIds = new Array();
        this._analize();
    }
    getJsonInfo = () => {
        return this.jsonInfo;
    }
    _analize = () => { //this.valueIds에 특정되지 않는 jsonObject를 Array화 한다.
        let keys = Object.keys(this.jsonInfo);
        for( let i = 0; i < keys.length; i++){
            let key = keys[i];
            this.valueIds.push(new ValueId(this.jsonInfo[key], key)); //json 정보와 key String을 넘겨 분석.
        }
    }
    getValueIds = () => {
        return this.valueIds;
    }
}
module.exports = AttributeVendorItemMap;
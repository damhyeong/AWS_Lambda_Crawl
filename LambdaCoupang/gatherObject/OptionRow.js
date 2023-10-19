const Attribute = require('./Attribute.js');

class OptionRow{
    constructor(jsonInfo){
        this.jsonInfo = jsonInfo;
        this.name = this.jsonInfo["name"]; //String Type (ex- 옵션이름 . 색상, 사이즈)
        this.attributes = this.jsonInfo["attributes"];
        this.attribute = new Array();
        this._analize();
    }
    getJsonInfo = () => {
        return this.jsonInfo;
    }
    _analize(){ //JsonArray 처리기
        for(let i in this.attributes){
            this.attribute.push(new Attribute(this.attributes[i]));
        }
    }
    getName = () => {
        return this.name;
    }
    getAttributes = () => {
        return this.attributes;
    }
    getAttributeArray = () => { //return Array
        return this.attribute;
    }
}
module.exports = OptionRow;
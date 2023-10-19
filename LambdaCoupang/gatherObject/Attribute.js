
class Attribute{
    constructor(jsonInfo){
        this.jsonInfo = jsonInfo;
        this.name = jsonInfo["name"]; //String Type (ex - 옵션명 .. 빨강, L 등등)
        this.valueId = jsonInfo["valueId"]; //String Type (ex - "301501000")
    }
    getJsonInfo = () => {
        return this.jsonInfo;
    }
    getName = () => {
        return this.name;
    }
    getValueId = () => {
        return this.valueId;
    }
}
module.exports = Attribute;
const OptionRow = require('./OptionRow.js');

class OptionRows{
    constructor(jsonInfo){
        this.jsonInfo = jsonInfo; //JsonArray Type (ex- color or size)
        this.optionRows = this.jsonInfo; //JsonArray Type (Options 클래스에서 이미 처리함)
        this.optionRow = new Array();
        this._analizing();
    }
    getJsonInfo = () => {
        return this.jsonInfo;
    }
    _analizing(){ //JsonArray 처리기
        for(let i = 0; i < this.optionRows.length; i++){
            this.optionRow.push(new OptionRow(this.optionRows[i]));
        }
    }
    getOptionRows = () => {
        return this.optionRows;
    }
    getOptionRowArray = () => { //return Array;
        return this.optionRow;
    }
}
module.exports = OptionRows;
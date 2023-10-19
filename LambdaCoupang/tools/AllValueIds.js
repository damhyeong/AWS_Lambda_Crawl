class AllValueIds{
    constructor(options){
        this.valueIds = new Array(); //str
        this.attributeName = new Array(); //str
        this.attributeDetailName = new Array(); //str

        this.options = options;
        this.optionRows = this.options.getOptionRows();
        this.optionRowArray = this.optionRows.getOptionRowArray();
        for(let i = 0; i < this.optionRowArray.length; i++){
            let mOptionRow = this.optionRowArray.at(i);
            for(let j = 0; j < mOptionRow.getAttributeArray().length; j++){
                this.valueIds.push(mOptionRow.getAttributeArray().at(j).getValueId())
                this.attributeName.push(this.optionRowArray.at(i).getName());
                this.attributeDetailName.push(mOptionRow.getAttributeArray().at(j).getName());
            }
        }
    }
    getValueIds = () => this.valueIds; //return Array Type

    getValueId = (i) => {
        return this.valueIds.at(i);
    }
    getMainAttribute = (i) => {
        return this.attributeName.at(i);
    }
    getDetailAttribute = (i) => {
        return this.attributeDetailName.at(i);
    }
}
module.exports = AllValueIds;
const LeafCategoryInfo = require('../gatherObject/LeafCategoryInfo.js');
const Options = require('../gatherObject/Options.js');
const AllValueIds = require('../tools/AllValueIds.js');
const AllVendorItemIds = require('../tools/AllVendorItemIds.js');

class StartAnalizing{
    constructor(){
        this.jsonInfo;
        this.leafCategoryInfo;
        this.options;
        this.allValueIds;
        this.allVendorItemIds;
        //this._inputAttribute();
        
        this.vendorItemIdsResultArray;
        this.sortVendorItemIdsArray;
    }
    async init(jsonInfo){
        this.jsonInfo = jsonInfo;
        this.leafCategoryInfo = new LeafCategoryInfo(this.jsonInfo['leafCategoryInfo']);
        this.options = new Options(this.jsonInfo["options"]);
        this.allValueIds = new AllValueIds(this.options);
        this.allVendorItemIds = new AllVendorItemIds(
            this.options.getAttributeVendorItemMap().getValueIds()//Array Type
            );
        this._inputAttribute();
            
        this.vendorItemIdsResultArray = this.allVendorItemIds.getVendorItemIds(); //sort 해야함
        this.sortVendorItemIdsArray = this.vendorItemIdsResultArray.sort(function (a, b){
            return a.vendorItemId - b.vendorItemId;
        });
        return this;
    }

    async returnSortVendorItemIdsArray(){
        return this.sortVendorItemIdsArray; //vendorItemId Array 
    }
    async _print (){
        console.log("start");
        console.log(this.allVendorItemIds.getVendorItemIds());
        console.log("end");
    }
    async _inputAttribute(){
        let allValueIdArray = this.allValueIds.getValueIds();
        let allVendorItemIdArray = this.allVendorItemIds.getVendorItemIds();
        
        for(let i = 0; i < allValueIdArray.length; i++){
            let valueId1 = allValueIdArray.at(i);
            for(let j = 0; j < allVendorItemIdArray.length; j++){
                let valueId2 = allVendorItemIdArray.at(j).getValueId();
                if(valueId2.indexOf(valueId1) != -1){
                    /** AttributeVendorItemMap의 valueId는 : or , 로 중복 포함이 가능하다. 따라서 vendorItemId에 속성을 추가하기 위해서는 optionRows의 valueId가 포함되어 있는지, 포함되었다면, 속성 추가. */
                    allVendorItemIdArray.at(j).addMainAttribute(this.allValueIds.getMainAttribute(i));
                    allVendorItemIdArray.at(j).addDetailAttribute(this.allValueIds.getDetailAttribute(i));
                }
            }
        }
        
    }
}
module.exports = StartAnalizing;
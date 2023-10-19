class LeafCategoryInfo{
    constructor(jsonInfo){
        this.jsonInfo = jsonInfo;
        this.categoryInfo = this.jsonInfo["categoryId"]; //Long Type (카테고리 아이디)
        this.name = this.jsonInfo["name"]; //String Type (최종 카테고리 스트링)
        this.parentsCategoryNames = this.jsonInfo["parentsCategoryNames"]; //JsonArray Type (부모 카테고리 스트링)
    }
    getJsonInfo = () => {
        return this.jsonInfo;
    }
    getCategoryInfo = () => {
        return this.categoryInfo;
    }
    getName = () => {
        return this.name;
    }
    getParentsCategoryNames = () => {
        return this.parentsCategoryNames; //return JsonArray
    }
}
module.exports = LeafCategoryInfo;
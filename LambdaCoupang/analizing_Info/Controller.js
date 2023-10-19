//중앙 컨트롤러 역할을 하게 될 소스

const ControlExcel = require("./ControlExcel.js");
const CrawlWebPages = require("./CrawlWebPages.js");
const FindQuantity = require("./FindQuantity.js");

/*
1. 엑셀 정보를 엑셀 컨트롤러에게서 Array 형태로 받아온다.
2. 그 String Array 정보를 CrawlWebPages를 생성하고, startAxios() 하여 시작.
3. 위의 메소드가 끝날 때 까지 wait.
4. 끝난 후, 받아온 vendorItemId array 정보를 엑셀 컨트롤러에 넘긴다.
*/

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const wrapSlept = async () => { await sleep(2000) };


class Controller{
    constructor(urlArray, accessKey, secretKey){
        this.urlArray = urlArray;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.aoa;
    }
    async start(){
        this.controlExcel = new ControlExcel(this.urlArray, this.accessKey, this.secretKey);

        this.crawlWebPages = new CrawlWebPages(this.urlArray); 
        await this.crawlWebPages.startAxios(); 
        await this.crawlWebPages.createClasses();
        this.gatherVendorItemArray = await this.crawlWebPages.getGatherVendorItemIdArray(); //gatherVendorItemId class Array 반환

        //console.log(this.gatherVendorItemArray);

        /*
        this.findQuantity = new FindQuantity(
            this.gatherVendorItemArray, this.accessKey, this.secretKey
            );
        await this.findQuantity.inputQuantity().then(() => {
            this.aoa = this.controlExcel.gatherToAoa(this.gatherVendorItemArray);
        });
        */
        
        await this.controlExcel.writeExcelFile(this.gatherVendorItemArray.getGatherVendorItemIdArray());

        //await this.controlExcel.makeAoaData();
        //그 다음 엑셀로 내보내기

        //모두 작성 한 뒤, Controller의 run 메소드로 제작. 위의 변수는 선언만 해두기.

        while(true){
            if(this.controlExcel.isPlacedAoa()){
                console.log(this.controlExcel.getAoa());
                this.aoa = this.controlExcel.getAoa();
                break;
            }
            await wrapSlept(1000);
        }

        console.log('real end');

        return this.aoa;
    }
}
module.exports = Controller;
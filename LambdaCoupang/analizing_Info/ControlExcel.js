
const https = require('https');
const crypto = require('crypto');


class ControlExcel{
    constructor(urlArray, accessKey, secretKey){
        this.readExcelFileUrl;
        this.writeExcelFile;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.urlSet = new Set(); //중첩 url 제거하기 위함 --> 중첩으로 접속 시 쿠팡에서 막아버림
        this.urlArray = urlArray; //Set에서 Array로 복사.
        this.length;
        this.workSheets = {};
        this.gatherVendorItemArray;
        this.aoa;
        this.placedAoa = false;
        this.newBook;

        //밑에는 FindQuantity의 기초변수
        this.datetime;
        this.method = 'GET';
        this.vendorItemId;
        this.path;
        this.query;
        this.message;
        this.urlPath;
        this.algorithm = 'sha256';
        this.signature;
        this.authorization;
        this.options;
    }

    async gatherToAoa(){
        let opt = null;
        //시작

        this.aoa = [];
        this.aoa.push(['buyableQuantity', 'vendorItemId', 'valueId', 'itemId', 'itemName', 'i18nOriginPrice', 'i18nSalePrice', 'i18nCouponPrice', 'deliveryType', 'mainAttribute', 'detailAttribute'])


        for(let vendorItemIdArray of this.gatherVendorItemArray){
            
            await Promise.allSettled([vendorItemIdArray]).then((vendorItemIdObjects) =>{
                for(let vendorItemIdObject of vendorItemIdObjects){
                    
                    this.aoa.push([]);

                    for(let vendorItemIdObj of vendorItemIdObject.value){

                        this.aoa.push([
                            vendorItemIdObj.getBuyableQuantity(),
                            vendorItemIdObj.getVendorItemId(),
                            vendorItemIdObj.getValueId(),
                            vendorItemIdObj.getItemId(),
                            vendorItemIdObj.getItemName(),
                            vendorItemIdObj.getI18nOriginPrice(),
                            vendorItemIdObj.getI18nSalePrice(),
                            vendorItemIdObj.getI18nCouponPrice(),
                            vendorItemIdObj.getDeliveryType(),
                            vendorItemIdObj.getMainAttribute(),
                            vendorItemIdObj.getDetailAttribute()
                        ])
                    }
                }
            })
        }

        //끝

        this.placedAoa = true;
    }

    async writeExcelFile(gatherVendorItemArray){
        console.log('whiteExcelFile 시작');
        // Create a new xlsx file

        this.gatherVendorItemArray = gatherVendorItemArray;
        let allLength = 0;

        for(let vendorItemIdArray of gatherVendorItemArray){
            await Promise.allSettled([vendorItemIdArray]).then((vendorItemIdObjects) =>{
                for(let vendorItemIdObject of vendorItemIdObjects){
                    for(let vendorItemIdObj of vendorItemIdObject.value){
                        allLength++;
                    }
                }
            });
        }
        console.log("allLength : " + allLength);


        this.aoa = [];
        this.aoa.push(['buyableQuantity', 'vendorItemId', 'valueId', 'itemId', 'itemName', 'i18nOriginPrice', 'i18nSalePrice', 'i18nCouponPrice', 'deliveryType', 'mainAttribute', 'detailAttribute'])

        this.gatherVendorItemArray = gatherVendorItemArray;
        //console.log('this.gatherVendorItemArray==>');
        //console.log(this.gatherVendorItemArray);

        let testingCount = 0;
        let blankNumbers = []

        //FindQuantity에서 제작했던 공식을 다시 재활용
        for(let vendorItemIdArray of this.gatherVendorItemArray){
            
            await Promise.allSettled([vendorItemIdArray]).then((vendorItemIdObjects) =>{
                for(let vendorItemIdObject of vendorItemIdObjects){
                    //let testingCount = 1;
                    //페이지 당 한 줄씩 띄우기
                    blankNumbers.push(testingCount);
                    //this.aoa.push([]);
                    //console.log('한 줄 띄움');
                    for(let vendorItemIdObj of vendorItemIdObject.value){
                        //let testingCount = 1;
                        //console.log('데이터 요청 위한 마지막 for문 시작')

                        //FindQuantity의 메소드 떼어오기 시작
                        this.datetime = new Date().toISOString().substr(2,17).replace(/:/gi, '').replace(/-/gi, '') + "Z";

                        //const vendorItemIdObj = this.vendorItemIdObject.at(j);

                        //console.log("vendorItemIdObj : " + typeof vendorItemIdObj);
                        const vItemId = vendorItemIdObj.getVendorItemId();
                        //console.log("vItemId : " + typeof vItemId);
                        //console.log("vendorItemId : " + vendorItemId);
                        this.path ='/v2/providers/seller_api/apis/api/v1/marketplace/vendor-items/' + vItemId + '/inventories';

                        this.query = '';

                        this.message = this.datetime + this.method + this.path + this.query;
                        this.urlpath = this.path + '?' + this.query;


                        this.signature = crypto.createHmac(this.algorithm, this.secretKey).update(this.message).digest('hex');

                        this.authorization = 'CEA algorithm=HmacSHA256, access-key=' + this.accessKey + ', signed-date=' + this.datetime + ', signature=' + this.signature;
                        //console.log(this.authorization);

                        const options = {
                            hostname: 'api-gateway.coupang.com',
                            port: 443,
                            path: this.urlpath,
                            method: this.method,
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8',
                                'Authorization': this.authorization,
                                'X-EXTENDED-TIMEOUT':90000
                            }
                        };

                        let body = [];

                        const promise = () => {
                            return new Promise((resolve, reject) => {
                                const req = https.request(options, res  => {
                                    //console.log(`statusCode: ${res.statusCode}`);
                                    //console.log(`reason: ${res.statusMessage}`);
                                    
                                    res.on('data', (chunk) => {
                                        body.push(chunk);
                                    }).on('end', () => {
                                        console.log("testingCount : " + testingCount);
                                        body = Buffer.concat(body).toString();
                                        const json = JSON.parse(body);
                                        vendorItemIdObj.setBuyableQuantity(json["data"]["amountInStock"]);
                                        resolve();
                                        console.log('구매가능수량 : ' + vendorItemIdObj.getBuyableQuantity());
                                        testingCount++;
                                    });
                                });
                                req.on('error', error => {
                                        console.error(error);
                                });
                                req.end();
                                //findQuantity에서 메서드 떼어오기 종료
                            })
                            
                        };

                        promise().then( () => {
                            //this.aoa.push(aoaData);
                            //console.log('aoaData : ' + aoaData);
                            
                            if(testingCount == allLength){
                                this.gatherToAoa();
                                console.log('aoaoa : ' + aoaoa);
                            }
                        });
                    }
                }
            })
        }
        console.log('writeExcelFile() 종료');
    }


    async getUrlArray(){
        return this.urlArray;
    }
    async getAccessKey(){
        return this.accessKey;
    }
    async getSecretKey(){
        return this.secretKey;
    }
    isPlacedAoa(){
        return this.placedAoa;
    }
    getAoa(){
        return this.aoa;
    }

    async print(){
        console.log(this.workSheets);
    }
}
module.exports = ControlExcel;
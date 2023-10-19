const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
//import vm from 'vm'

const StartAnalizing = require('./StartAnalizing.js');
const GatherVendorItemIdArray = require('./GatherVendorItemIdArray.js');

class CrawlWebPages{
    constructor(urls){ //입력값 ==> String Array
        this.urls = urls; //String Array Type
        this.startAnalizing;
        this.initJsonArray = new Array(); //exports 스트링 다듬고 JSON 변환 된 Array.
        this.sortedVendorItemIdsArray;
        this.gatherVendorItemIdArray = new GatherVendorItemIdArray(); //vendorItemIdArray 들을 가진 클래스
    }
    //Async 추가
    async startAxios(){
        let iJsonArray = this.initJsonArray;
        
        axios.defaults.headers = {
            'Cache-Control' : 'no-store',
            'Pragma' : 'no-store',
            'Expires' : '0',
        };
        /** url의 개수만큼 행한다. */
        for(let i = 0; i < this.urls.length; i++){
            await axios({
                method : "get", //통신 방식
                url : this.urls.at(i),// 서버
                
                headers : {'X-Requested-With' : 'XMLHttpRequest', 'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
                'Content-Type' : 'application/json', 'Cookie' : ''}, //요청 헤더 설정
                //params : {language : "utf-8"}, // ? 파라미터를 전달
                responseType : "blob", //브라우저, arraybuffer, document, json, text, stream 이 존재
                responseEncoding : 'utf8',
                httpsAgent : new https.Agent({keepAlive : true}),
                withCredentials : false, 
                timeout : 5000
            }).then(function (response){
                
                const $ = cheerio.load(response.data);
                $('script', response.data).each((index, element) => {
                    //console.log(element.childNodes); --> function(exports) 확인
                    //console.log(element.children); --> function(exports) 확인
                    
                    if(element.children[0] != undefined){
                        if(index == 4){
            
                            let initString = element.children[0].data;
                            let fIndex = initString.indexOf("exports.sdp = ");
                            let lIndex = initString.indexOf("exports.sdpIssueTypes");
                            console.log(fIndex + " : " + lIndex);
                            
                            let trimString1 = initString.slice(fIndex + 14, lIndex).trim();
                            let trimString2 = trimString1.slice(0, trimString1.length-1);
                            iJsonArray.push(JSON.parse(trimString2));
                            
                        }
                    }
                })
            }).catch(function (error){
                console.log(error);
                console.log('에러남');
                
            }).finally(function(){
                console.log('마무리');
            });
        }

    }
    async createClasses(){
        for(let i = 0; i < this.initJsonArray.length; i++){
            let initJson = this.initJsonArray.at(i);
            //console.log("에러 나기 직전");
            this.startAnalizing = new StartAnalizing();
            this.startAnalizing.init(initJson);
            //console.log("에러 났는지 확인");
                                
            this.sortedVendorItemIdsArray = this.startAnalizing.returnSortVendorItemIdsArray();
            this.gatherVendorItemIdArray.addVendorItemIdArray(this.sortedVendorItemIdsArray);
        } 
    }

    async getGatherVendorItemIdArray(){
        return this.gatherVendorItemIdArray;
    }
}

module.exports = CrawlWebPages;

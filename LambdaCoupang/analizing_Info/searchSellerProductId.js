//등록상품 ID로 조회
const https = require('https');
const crypto = require('crypto');

const datetime = new Date().toISOString().substr(2,17).replace(/:/gi, '').replace(/-/gi, '') + "Z";
const method ='GET';
//vendorItemId 넣음
const sellerProductId = '13319727450';
const path ='/v2/providers/seller_api/apis/api/v1/marketplace/seller-products/' + sellerProductId;
const query = '';

const message = datetime + method + path + query;
const urlpath = path + '?' + query;

//input your accessKey
const ACCESS_KEY = '6cb9ac84-f9d7-4702-bde7-c06d6b272211';
//input your secretKey
const SECRET_KEY = '558768253de5d863284b16d6f39a37b33a8c63b4';
const algorithm = 'sha256';

const signature = crypto.createHmac(algorithm, SECRET_KEY)
                    .update(message)
                    .digest('hex');

const authorization = 'CEA algorithm=HmacSHA256, access-key=' + ACCESS_KEY + ', signed-date=' + datetime + ', signature=' + signature;
console.log(authorization);

const options = {
  hostname: 'api-gateway.coupang.com',
  port: 443,
  path: urlpath,
  method: method,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': authorization,
    'X-EXTENDED-TIMEOUT':90000
  }
};

let body = [];

const req = https.request(options, res  => {
  console.log(`statusCode: ${res.statusCode}`);
  console.log(`reason: ${res.statusMessage}`);

  res.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    const json = JSON.parse(body);
    console.log(JSON.stringify(json, null, 2));
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
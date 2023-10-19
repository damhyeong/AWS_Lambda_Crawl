const Controller = require('./analizing_Info/Controller');

exports.handler = async (event, context, callback) => {
    if (event.body !== null && event.body !== undefined) {
        let data = event.body;
        
        let transData = JSON.parse(data);
        let urlArray = transData.urlArray;
        let accessKey = transData.aKey;
        let secretKey = transData.sKey;

        const controller = new Controller(urlArray, accessKey, secretKey);
        
        console.log(JSON.stringify(data));
        console.log(typeof data);
        console.log(JSON.stringify(urlArray));
        console.log(typeof urlArray);
        console.log(JSON.stringify(accessKey));
        console.log(typeof accessKey);
        console.log(secretKey);
        console.log(typeof secretKey);

        const aoaData = await controller.start();
        
        console.log('전송 직전!!!!!!!!!!!!!!');
        return sendRes(200, JSON.stringify(aoaData)); //aoaData 전송 형식을 바꾸면 곧 해결될 듯 JSON.parse() or JSON.stringify() 등등..
    }    
    
    return sendRes(404, '{ error: true, message: "Hello World!." }');
};
const sendRes = (status, body) => {
    var response = {
        statusCode: status,
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        },
        body: body
    };
    return response;
};
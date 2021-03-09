const router = require('./main').router

const bodyParser =(req,res)=>{
        var body = '';
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        try{
            req['body']=JSON.parse(body)
        }catch(e){
        }
        router.route(req,res)
      });
}

module.exports={
    bodyParser
}
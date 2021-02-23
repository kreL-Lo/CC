const dotenv = require('dotenv')


const config =dotenv.config({
    path:'./controllers/credentials.env'
}).parsed

const key = config.API_LANGUAGE

var DetectLanguage  = require('detectlanguage')
var lang = new DetectLanguage(key)

const detectLanguage= (text)=>{
    return new Promise( async (resolve)=>{
        let d=  await lang.detect(text).then(function(result) {
            return JSON.stringify(result);
        });
        resolve(d)
    })
}
module.exports ={
    detectLanguage
}




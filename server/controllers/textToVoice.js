const dotenv = require('dotenv')
const config =dotenv.config({
    path:'./controllers/credentials.env'
}).parsed
const url = config.URL_IBM
const key = config.API_KEY_IBM
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var Readable =require('stream').Readable

const textToVoice =(text,res,logs,flag,start)=>{
    return new Promise(async resolve=>{
        const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
            apikey: key,
        }),
        serviceUrl: url,
        });
        
        const synthesizeParams = {
        text: text,
        accept: 'audio/wav',
        voice: 'en-US_AllisonV3Voice',
        };

        let d = await textToSpeech.synthesize(synthesizeParams)
        .then(response => {
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then( async buffer => {
            let stream  = new Readable()
            stream.push(buffer)
            stream.push(null)
            stream.pipe(res)
            let end = new Date()
            let timestamp = end - start;
            if(flag==0){
                logs.randomVoiceFact.latency =( logs.randomVoiceFact.latency + timestamp )/2
            }else {
                logs.voice.latency =( logs.voice.latency + timestamp )/2  
            }
        })
        .catch(err => {
            console.log('error:', err);
        });
    })
}
module.exports={
    textToVoice
}   
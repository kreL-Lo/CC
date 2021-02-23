const http = require('http')
const dotenv = require('dotenv')
const querystring = require('querystring');
const { chucknorrisJokes } = require('./controllers/chuckNoris');
const { numbers } = require('./controllers/numbers');
const { textToVoice } = require('./controllers/textToVoice');
const { detectLanguage } = require('./controllers/language');

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    hander(req,res)
   
  }).listen(8080); //the server object listens on port 8080

const logs ={
    numbers :{
        records :0,
        latency :0
    },
    chuck :{
        records: 0,
        latency :0
    },
    randomVoiceFact:{
        records :0,
        latency :0
    },
    detectLanguage:{
        records:0,
        latency :0
    },
    voice:{
        records:0,
        latency :0
    }

}
const hander =(req,res)=>{
    const path = req.url.split('?')[0]
    switch(path){
        case '/numbers':
            hanlderNumbers(req,res) 
            break
        case '/chuck':
            handlerChuck(req,res) ;
            break
        case '/voiceWeb':
            handlerToVoice(req,res) ;
            break
        case '/detectLanguage':
            handlerLanguage(req,res) ;
            break
        case '/voice':  
            handerVoiceActual(req,res); 
            break
        case '/metrics':
            metrics(req,res);
            break   
    }
}


const hanlderNumbers = (req,res)=>{
    let start = new Date()
    logs.numbers.records++
    const params = req.url.split('?')[1]
    let qs = querystring.parse(params)
    try{
        let type = qs.type
        let number=  parseInt(qs.number)
        if (!(type == 'math' || type== 'date' || type == 'trivia' || type=='year')){
            res.write('Can only have a type of "math","date","trivia" or "year"')
            res.end()
            return }   
    let data = numbers(number,type).then( data =>{
            let b = JSON.stringify(data.data)
            res.setHeader('Content-Type','text/plain')
            res.write(b)
            res.end()
            let end = new Date()
            let timestamp = end - start;
            logs.numbers.latency = (logs.numbers.latency + timestamp) /2   
        }
    )
    
    }
    catch(e){
        console.log(e)
        res.write('Error in api')
        res.end()
    }

}


const handlerChuck = (req,res)=>{
    let start = new Date()
    logs.chuck.records++
    let data = chucknorrisJokes()
    .then( data=>{
        let value = data.data.value
        res.write(JSON.stringify(value))
        res.end()
        let end = new Date()
        let timestamp = end - start;
        logs.chuck.latency = (logs.chuck.latency  +timestamp)/2
    })
    
}

const handlerToVoice = ( req,res) =>{
    logs.randomVoiceFact.records++
    let start = new Date()
    const params = req.url.split('?')[1]
    let qs = querystring.parse(params)
    var data
    try{
        let type = qs.type
        let number=  parseInt(qs.number)
        if (!(type == 'math' || type== 'date' || type == 'trivia' || type=='year')){
            res.write('Can only have a type of "math","date","trivia" or "year"')
            res.end()
            return }   
        numbers(number,type).then(

            data=>{
                let json = JSON.stringify(data.data)
                chucknorrisJokes().then(joke=>{
                    let value = joke.data.value
                    let text = value + ", "+json
                    textToVoice(text ,res,logs,0,start)
                })
            }
        )
    }
    catch(e){
        console.log(e)
        res.write('Error in api')
        res.end()
    }
}   


const handlerLanguage = (req,res)=>{
    let start = new Date()
    logs.detectLanguage.records++
    console.log('herere')
    try{
        const params = req.url.split('?')[1]   
        const qs= querystring.parse(params)
        let text = qs.text
        detectLanguage(text).then(data=>{
            res.write(data)
            res.end()
            let end = new Date()
            let timestamp = end - start;
            logs.detectLanguage.latency =  (logs.detectLanguage.latency +timestamp)/2
        }).catch(e=>{
            console.log(e)
        })
    }catch(e){
        res.write('error')
        res.end()
    }
}

const handerVoiceActual =  (req,res)=>{
    logs.voice.records++
    let start = new Date()
    try{
        const params = req.url.split('?')[1]   
        const qs= querystring.parse(params)
        let text = qs.text
        textToVoice(text ,res,logs,1,start)
    }catch(e){
        res.write('error')
        res.end()
    }
}

const metrics =(req,res)=>{
    res.write(JSON.stringify(logs))
    res.end()
}
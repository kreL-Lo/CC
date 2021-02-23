const axios = require('axios')


const numbers =(number,type)=>{
    //@trivia, math, date, or year
    return new Promise( async resolve =>{
        var d=  await  axios.get(`http://numbersapi.com/${number}/${type}`).then(e=>{
            return e 
        })  
        resolve(d)
    })

}

module.exports ={
    numbers
}
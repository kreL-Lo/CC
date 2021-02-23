const axios = require('axios')


const chucknorrisJokes =()=>{

    return new Promise( async resolve =>{
        var d=  await  axios.get('https://api.chucknorris.io/jokes/random').then(e=>{
            return e 
        })  
        resolve(d)
    })

}

module.exports ={
    chucknorrisJokes
}
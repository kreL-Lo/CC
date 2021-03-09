

let matcher = new RegExp(/:(\w+)/g)

let route ='/:id/:id1/test/:fs'
let d= matcher.exec(route)
d= matcher.exec(route)



const getIds = (route)=>{
    let matcher = new RegExp(/:(\w+)/g)    
    let array =[]
    var m
    do {
         m = matcher.exec(route);
        if (m) {
            console.log(m[1], m[2]);
            array.push(m[1])
        }
    } while (m);
    return array
}
let d1 = console.log(getIds(route))
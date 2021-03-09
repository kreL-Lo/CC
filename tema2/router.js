
const getIds = (route)=>{
    let matcher = new RegExp(/:(\w+)/g)    
    let array =[]
    var m
    do {
         m = matcher.exec(route);
        if (m) {
            array.push(m[1])
        }
    } while (m);
    return array
}

class Router 
{
    constructor(){
        this.routes ={
            GET:{},
            POST:{},
            PUT:{},
            DELETE:{}
        }
    }
    get(route,cb){
        this.routes.GET[route]=cb;
    
    }

    put(route,cb){
        this.routes.PUT[route]=cb;
    }

    post(route,cb){
        this.routes.POST[route]=cb;
    }

    delete(route,cb){
        this.routes.DELETE[route]=cb;
    }

    checkMethod(req,res){
        var keys = Object.keys(this.routes)
        for (let x in keys){
            if (req.method==keys[x]){
                return true
            }
        }
        return false
    }
    route(req,res){

        if(this.checkMethod(req,res)==false){
            res.writeHead(404)
            res.write('NO FOUND METHOD')
            res.end()
            return 
        }

        let func = this.routes[req.method][req.url]
        if(func){
            func(req,res)
        }else{
            let found = 0 
            var keys = Object.keys(this.routes[req.method])
            keys.map(el=>{
                if(found==0){
                    let rout = el
                    let match  = this.matcher(rout,req.url)
                    if(match){
                        req['matches']= match
                        let func = this.routes[req.method][rout]
                        func(req,res)
                        found = 1 
                    }
                }
            })
            if(found ==0){
                 res.writeHead(405)
                 res.write(JSON.stringify({message:'NOT ALLOWED'}))       
                res.end()
            }
        }
    }
    arraysMatch  (arr1, arr2) {

        // Check if all items exist and are in the same order
        if(arr1.length!=arr2.length)
            return false

        for (let i =0;i<arr2.length;i++){
            if(arr1[i]!=arr2[i])
                return false
        }
        return true
    };
    
    matcher(route,url){
        var routeMatcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'))
        var ids = getIds(route)
        var match = {}
        let len = ids.length
        let d= url.match(routeMatcher)
        let arr1  = url.split('/').filter(x=>x!='').filter(x=>!/^\+?\d+$/.test(x))   
        // let arr1  = url.split('/').filter(x=>x!='')
        let arr2 = route.split('/').filter(x=>x!='').filter(x=>{return !x.includes(':')})
        arr1.sort()
        arr2.sort()
        let d12 = this.arraysMatch(arr1,arr2)
        console.log(route,url,d12)
        if(!d ||!d12)
            return null
        for(let i =0 ;i<len;i++){
            match[ids[i]]=d[i+1]
        }
        return match
    }

}
module.exports={
    Router
}

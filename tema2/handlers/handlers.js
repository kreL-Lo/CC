// let matches = req.matches
const connection = require('../main').connection
const handleCreateNewThread =(req,res)=>{
    try{
        let data =req.body
        if(data.description&& data.topic){
            let description = data.description
            let topic = data.topic
            let thread_id = req.matches.thread_id
            var qs = `SELECT * FROM THREAD WHERE id ="${thread_id}"`
            connection.query(qs,(err,values)=>{
                if(values[0]==null){
                    qs = `INSERT INTO THREAD(id,topic,description) VALUES ("${thread_id}","${topic}","${description}")`
                    res.writeHead(201)
                    res.write(JSON.stringify({message:'CREATED'}))       

                }else{
                    qs = `UPDATE THREAD SET topic = "${topic}" , description = "${description}" WHERE id = "${thread_id}"`
                    res.writeHead(200)
                    res.write(JSON.stringify({message:'UPDATED'}))       
                }
                res.end()
                connection.query(qs)
            })
        }
        else{
            res.writeHead(400);
            res.write(JSON.stringify({message:'MUST HAVE JSON LIKE {topic:Topic,description :Description}'}))       
            res.end()
        }
    }catch(e){
        console.log(e)
        res.writeHead(500);
        res.write(JSON.stringify({message:'SERVER ERROR'}))       
        res.end()
    }
}

const handelCreateThreadQuestion =(req,res)=>{
    try{
    let data =req.body
    if(data.question && data.description){
        let descrition = data.description
        let question =data.question
        let thread_id=  req.matches.thread_id
        let question_id=  req.matches.question_id
        var qs 
        qs = `SELECT * FROM THREAD WHERE id = "${thread_id}"`
        connection.query(qs,(err,values)=>{
            if(values[0]==null){
                res.writeHead(400)
                res.write(JSON.stringify({message:'not a valid thread id'}))       
                res.end()
                return 
            }
            qs = `SELECT * FROM QUESTION WHERE id= "${question_id}"`
            connection.query(qs,(err,values)=>{
                if(values[0]==null){
                    qs = `INSERT INTO QUESTION(id,question,description,thread) VALUES ("${question_id}","${question}","${descrition}","${thread_id}")`
                    res.writeHead(201)
                    res.write(JSON.stringify({message:'CREATED'}))       
                }else{
                    qs =`UPDATE QUESTION SET question = "${question}" ,thread ="${thread_id}" , description ="${descrition}" WHERE id = "${question_id}" `
                    res.write(JSON.stringify({message:'UPDATED'}))       
                }
                connection.query(qs)
                res.end()
            })

        })
    }
    else{
        console.log(e)
        res.writeHead(400);
        res.write(JSON.stringify({message:'MUST HAVE JSON LIKE {question:Question}'}))       
        res.end()
        }
    }
    catch(e){
        res.writeHead(500);
        res.write(JSON.stringify({message:'server error'}))       
        res.end()
    }
}
const handleCreateAnswerQuestion =(req,res)=>{
    try{
        let data =req.body
        if(data.answer && data.description){
            let answer = data.answer
            let description = data.description
            let question_id = req.matches.question_id
            let answer_id = req.matches.answer_id 

            var qs =`SELECT * FROM QUESTION WHERE id = "${question_id}"`
            connection.query(qs,(err,values)=>{
                if(values[0]==null){
                    res.writeHead(404)
                    res.write(JSON.stringify({message:'no question id found'}))       
                    res.end()
                    return 
                }
                qs = `SELECT * FROM ANSWER WHERE id = "${answer_id}"`

                connection.query(qs,(err,values)=>{
                    if(values[0]==null){
                        qs = `INSERT INTO ANSWER(id,answer,description,question) VALUES ("${answer_id}","${answer}","${description}","${question_id}")`
                        res.writeHead(201)
                        res.write(JSON.stringify({message:'created answer'}))       
                    }else{
                        qs =`UPDATE ANSWER SET answer ="${answer}", description ="${description}", question ="${question_id}" WHERE id = "${answer_id}" `
                        res.writeHead(200)
                        res.write(JSON.stringify({message:'updated answer'}))       
                    }
                    connection.query(qs)
                    res.end()
                })
            })
        }

        else{
            res.writeHead(400);
            res.write(JSON.stringify({message:'MUST HAVE JSON LIKE {asnwer:Answer, description:Description}'}))       
            res.end()
            }
        }
        catch(e){
            res.writeHead(500);
            res.write(JSON.stringify({message:'server error'}))       
            res.end()
        }
}
const handleGetThreads =(req,res)=>{
    try{    
        const qs = `SELECT * FROM THREAD`
        connection.query(qs,(err,values)=>{
            if(err){
                res.writeHead(500);
                res.write(JSON.stringify({message:'error in db'}))       
                res.end()
                return 
            }
            if(values[0]==null){
                res.writeHead(404)
                res.write(JSON.stringify({message:'no content'}))       
                res.end()
            }   
            else{
                res.writeHead(200)
                res.write(JSON.stringify(values))
                res.end()
            }
        })
    }catch(e){
        res.writeHead(500);
        res.write(JSON.stringify({message:'error in server'}))       
        res.end()
    }
}
const handleGetThreadQuestions =(req,res)=>{
    try{
        let matches = req.matches 
        let id = matches.thread_id
        const qs = `SELECT * FROM QUESTION WHERE thread ="${id}"`
        connection.query(qs,(err,values)=>{
            if(!err){
                if(values[0]==null){
                    res.writeHead(404)
                    res.write(JSON.stringify({message:'db error'}))       
                    res.end()
                }   
                else{
                    res.writeHead(200)
                    res.write(JSON.stringify(values))
                    res.end()
                }
                
            }
            else{
                res.writeHead(404);
                res.write(JSON.stringify({message:'no id found'}))       
                res.end()
            }
        })
    }catch(e){
        res.writeHead(500);
        res.write(JSON.stringify({message:'error in server'}))       
        res.end()
    }
}


const handleGetQuestionsAnswer = (req,res)=>{
    try{
        let id = req.matches.question_id
        console.log('here')
        const qs = `SELECT * FROM ANSWER where question ="${id}"`
        connection.query(qs,(err,values)=>{
            
            if(values[0]==null){
                res.writeHead(404)
                res.write(JSON.stringify({message:'no content'}))       
                res.end()
            }   
            else{
                res.writeHead(200)
                res.write(JSON.stringify(values))
                res.end()
            }
        })

    }catch(e){
        res.writeHead(500);
        res.write(JSON.stringify({message:'error in server'}))       
        res.end()
    }
}



const handleGetSpecificAnswerFromQuestion = (req,res)=>{
    try{
        let a_id = req.matches.answer_id

        const qs = `SELECT * FROM ANSWER where id ="${a_id}"` 
        connection.query(qs,(err,values)=>{
            if(values[0]==null){
                res.writeHead(404)
                res.write(JSON.stringify({message:'no content'}))       
                res.end()
            }   
            else{
                res.writeHead(200)
                res.write(JSON.stringify(values))
                res.end()
            }
        })

    }catch(e){
        res.writeHead(500);
        res.write(JSON.stringify({message:'Error in server'}))       
        res.end()
    }
}



const handleDeleteThread = (req,res)=>{
    try{
        let id = req.matches.thread_id
        var qs 
        qs = `DELETE FROM THREAD where id ="${id}"`
        connection.query(qs,(err,values)=>{
            if(values.affectedRows==0){
                res.writeHead(404)
                res.write(JSON.stringify({message:'no content'}))       
                res.end()
            }else{
                res.writeHead(200)
                res.write(JSON.stringify({message:'deleted thread'}))       
                res.end()
            }             
        })
    }catch(e){
        res.writeHead(500)
        res.write(JSON.stringify({message:'server error'}))       
        res.end()
    }
}
const handleDeleteQuestion = (req,res)=>{
    try{
        let id=  req.matches.question_id
        
        var qs 
        qs = `SELECT * FROM QUESTION WHERE id = "${id}"`
        console.log(qs)
        connection.query(qs,(err,values)=>{
            console.log(values)
            if(values[0]==null){
                res.writeHead(404)
                res.write(JSON.stringify({message:'no content'}))       
                res.end()
                return
            }
            qs = `DELETE FROM QUESTION WHERE id ="${id}"`
            connection.query(qs)
            res.writeHead(200)
            res.write(JSON.stringify({message:'deleted'}))       
            res.end()
        })
        

    }catch(e){
        res.writeHead(500)
        res.write(JSON.stringify({message:'server error'}))       
        res.end()
    }
}


const handleDeleteAnswer = (req,res)=>{
    try{
        let id=  req.matches.answer_id
        var qs = `DELETE FROM ANSWER WHERE id ="${id}"`
        connection.query(qs,(err,values)=>{
            if(err){
                res.writeHead(500)
                res.write(JSON.stringify({message:'db error'}))       
                res.end()
                return 
            }            
            if(values.affectedRows>0){
                res.writeHead(200)
                res.write(JSON.stringify({message:'DELETED RESOURCE'}))       
                res.end()
            }else{
                res.writeHead(404)
                res.write(JSON.stringify({message:'No resource found'}))       
                res.end()
            }
            
        })
    }catch(e){
        res.writeHead(500);
        res.write(JSON.stringify({message:'SERVER ERROR'}))       
        res.end()
    }
}




const handlePostQuestion =(req,res)=>{
    try{
        let thread_id = req.matches.thread_id
        let data= req.body
        if(data.description&& data.question){
            var qs 

            qs = `SELECT * FROM THREAD WHERE id = "${thread_id}"`
            connection.query(qs,(err,values)=>{
                if (values[0]==null){

                    res.writeHead(200)
                    res.write(JSON.stringify({message:'no thread with the given id found'}))       
                    res.end()
                    return 
                }
                qs = `INSERT INTO QUESTION (description , question ,thread) VALUES("${data.description}","${data.question}","${thread_id}")`
                connection.query(qs)

                res.writeHead(201)
                res.write(JSON.stringify({message:'Inserted a question'}))       
                res.write('')
                res.end()
            })

        }else{
            res.writeHead(404)
            res.write(JSON.stringify({message:'WRONG JSON CONTENT , MUST BE LIKE {description:<str> , question:<str> }'}))       
            res.end()
        }
    }
    catch(e){   
        res.writeHead(500);
        res.write(JSON.stringify({message:'SERVER ERROR'}))       
        res.end()
    }
}

const handlePostAnswer =(req,res)=>{

    try{
        let question_id = req.matches.question_id
        let data= req.body
        if(data){

            var qs = `SELECT * FROM QUESTION WHERE id = "${question_id}"`
            connection.query(qs,(err,values)=>{
                if(values[0]==null){

                    res.writeHead(200)
                    res.write(JSON.stringify({message:'no question with the given id found'}))
                    res.end()
                    return 
                }

                qs = `INSERT INTO ANSWER (description , answer ,question) VALUES("${data.description}","${data.answer}","${question_id}")`
                connection.query(qs)

                res.writeHead(201)
                res.write(JSON.stringify({message:'Inserted an anwer'}))
                res.end()
            })

        }else{
            res.writeHead(404)
            res.write(JSON.stringify({message:'Wront json type'}))
            res.end()
        }

    }
    catch(e){   
        res.writeHead(500);
        res.write(JSON.stringify({message:'server error'}))
        res.end()   
    }

}
module.exports={
    handleCreateNewThread,
    handelCreateThreadQuestion,
    handleCreateAnswerQuestion,
    handleGetThreads,
    handleGetThreadQuestions,
    handleGetQuestionsAnswer,
    handleGetSpecificAnswerFromQuestion,
    handleDeleteThread,
    handleDeleteQuestion,
    handleDeleteAnswer,
    handlePostQuestion,
    handlePostAnswer
}

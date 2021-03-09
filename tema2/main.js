const http = require('http')
const {Router} =require('./router')

const config = require('dotenv').config({path:'./config.env'}).parsed
const mysql = require('mysql')



var connection = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABSE
})

module.exports={
    connection
}


const {
    handleCreateNewThread, handelCreateThreadQuestion, handleCreateAnswerQuestion, handleGetThreads,
    handleGetThreadQuestions,handleGetQuestionsAnswer,handleGetSpecificAnswerFromQuestion, handleDeleteThread, handleDeleteQuestion, handleDeleteAnswer, handlePostAnswer,
    handlePostQuestion
} = require('./handlers/handlers')
const router = new Router()

router.get('/:id/test1',(req,res)=>{
    res.write('hello')
    res.end()
})


router.put("/thread/:thread_id",(req,res)=>{
    handleCreateNewThread(req,res)
})
router.put("/question/:question_id/thread/:thread_id",(req,res)=>{
    handelCreateThreadQuestion(req,res)
})
router.put("/answer/:answer_id/question/:question_id",(req,res)=>{
    handleCreateAnswerQuestion(req,res)
})
router.get("/threads",(req,res)=>{
    handleGetThreads(req,res)
})
router.get("/thread/:thread_id/questions",(req,res)=>{
    handleGetThreadQuestions(req,res)
    
})

router.get("/question/:question_id/answers",(req,res)=>{
    handleGetQuestionsAnswer(req,res)
})
  
router.get("/answer/:answer_id",(req,res)=>{
    handleGetSpecificAnswerFromQuestion(req,res)
})
router.delete('/thread/:thread_id',(req,res)=>{
    handleDeleteThread(req,res)
})
router.delete('/question/:question_id',(req,res)=>{
    handleDeleteQuestion(req,res)
})
router.delete('/answer/:answer_id',(req,res)=>{
    handleDeleteAnswer(req,res)
})
router.post('/thread/:thread_id/question',(req,res)=>{
    handlePostQuestion(req,res)
})
router.post('/question/:question_id/answer',(req,res)=>{
    handlePostAnswer(req,res)
})

module.exports={
    router
}
const {bodyParser} = require('./middleware')
http.createServer((req,res)=>{
    bodyParser(req,res)

}).listen(3000,()=>{
    console.log(`Listening on port ${3000}`)
})


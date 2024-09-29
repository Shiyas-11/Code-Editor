//imports
const express = require("express")
const cookie =require("cookie-parser")
const auth = require('./server/auth')
const bodyParser=require('body-parser')
const path=require('path')
const { fileURLToPath } = require("url")
const register = require("./server/register")


//initializations
const port=env.getport() || 8080
const app=express()
// const dir=path.dirname(fileURLToPath(import.meta.url))


//app.uses
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(dir)))


app.get("/",(req,res)=>{

})

app.post("/login",(req,res)=>{
	const res=auth(req.body.username,req.body.password)
	if(res.length!=0){

	}
	else{
		res.redirect("/loginPage")
	}
})

app.post("/register",(req,res)=>{
	register(req.body)
})







app.listen(port,(err)=>{
	if (err) console.log("ERROR STARTING SERVER")
	else console.log(`server running on ${port}`)
})
//imports
const express = require("express")
const cookie =require("cookie-parser")
const auth = require('./auth')
const bodyParser=require('body-parser')
const path=require('path')
const { fileURLToPath } = require("url")
const register = require("./register")


//initializations
const port=8080
const pathToClient=path.join(__dirname,"../client")
const app=express()
// const dir=path.dirname(fileURLToPath(import.meta.url))


//app.uses
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'../public')))

app.get("/",(req,res)=>{
	res.sendFile(path.join(pathToClient,"sample.html"))
})


app.post("/login",(req,res)=>{
	const result=auth(req.body.username,req.body.password)
	if(result.length!=0){

	}
	else{
		result.redirect("/loginPage")
	}
})

app.post("/register",(req,res)=>{
	register(req.body)
})



app.listen(port,(err)=>{
	if (err) console.log("ERROR STARTING SERVER")
	else console.log(`server running on ${port}`)
})
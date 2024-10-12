//imports
const express = require("express")
const cookie =require("cookie-parser")
const bodyParser=require('body-parser')
const path=require('path')


//initializations
const port = process.env.PORT || 8080;
const pathToClient = path.join(__dirname, "../client");
const app = express();
const execute=require('./routes/execute')

// const dir=path.dirname(fileURLToPath(import.meta.url))

//app.uses
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

//route
app.use('/execute',execute)


app.get("/", (req, res) => {
  res.sendFile(path.join(pathToClient, "index.html"));
});


app.listen(port,(err)=>{
	if (err) console.log("ERROR STARTING SERVER")
	else console.log(`server running on ${port}`)
})
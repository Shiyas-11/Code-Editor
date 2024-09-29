const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

auth=async(uname,pass)=>{
	try {
		await client.connect();
		const db=client.db('AuthDB');
		const collection=db.collection('auth');
		var result=await collection.find({username:uname,password:pass} || {email:uname,password:pass}).toArray()
		console.log("output :",result);
	} catch (error) {
		console.dir
	}
	finally{
		await client.close()
	}
	return result
}
auth("Shiyas","1234")
module.exports = auth

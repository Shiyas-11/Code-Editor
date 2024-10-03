const { spawn } = require('child_process');
const process = require('process');
let end=false
console.log(1)
const pythonProcess = spawn('python', ['./server/test.py']);
console.log(2)


pythonProcess.stdout.on('data', (data) => {
	console.log(end.toString())
	console.log(`Output from Python script: ${data.toString()}`);
	process.stdin.on('data',(input)=>{
		pythonProcess.stdin.write(input.toString())
	})
});


pythonProcess.stderr.on('data', (data) => {
	end=true
	console.error(`Error: ${data.toString()}`);
	process.exit()
});


pythonProcess.on('close', (code) => {
	end=true
	console.log(`Python script exited with code ${code} and `);
	process.exit()

});


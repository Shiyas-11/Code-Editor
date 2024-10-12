const { spawn } = require("child_process");
const fs = require("fs");

const pyRun = async (fname) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [`./server/${fname}`]);

    let outputData = "";
    let errorData = "";

    pythonProcess.stdout.on("data", (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    pythonProcess.on("close", (code) => {
      fs.unlink(`./server/${fname}`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        }
      });

      if (code !== 0) {
        err = `${errorData}`.replaceAll(
          `File "C:\\Users\\shiya\\Documents\\s5IT\\WAD\\CodeEditor\\server\\${fname}"`,
          "main.py"
        );
        console.log(err);
        reject(err);
      } else {
        resolve(outputData);
      }
    });
  });
};

module.exports = pyRun;

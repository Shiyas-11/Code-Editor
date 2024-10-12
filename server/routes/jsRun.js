const { spawn } = require("child_process");
const fs = require("fs");

const jsRun = async (fname) => {
  return new Promise((resolve, reject) => {
    const JsProcess = spawn("node", [`./server/${fname}`]);

    let outputData = "";
    let errorData = "";

    JsProcess.stdout.on("data", (data) => {
      outputData += data.toString();
    });

    JsProcess.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    JsProcess.on("close", (code) => {
      fs.unlink(`./server/${fname}`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        }
      });

      if (code !== 0) {
        err = `${errorData}`.replaceAll(
          `C:\\Users\\shiya\\Documents\\s5IT\\WAD\\CodeEditor\\server\\${fname}`,
          "main.js"
        );
        console.log(err);
        reject(err);
      } else {
        resolve(outputData);
      }
    });
  });
};

module.exports = jsRun;

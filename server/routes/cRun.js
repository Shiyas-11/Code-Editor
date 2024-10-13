const { spawn } = require("child_process");
const fs = require("fs");

async function cCompile(fname) {
  return new Promise((resolve, reject) => {
    const cCompile = spawn("gcc", [
      `./server/${fname}.c`,
      "-o",
      `./server/${fname}`,
    ]);

    let errorData = "";

    cCompile.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    cCompile.stdout.on("data", (data) => {});

    cCompile.on("close", (code) => {
      if (code !== 0) {
        console.error(`Compilation error with code ${code}`);
        reject(`Error compiling: ${errorData}`);
        fs.unlink(`./server/${fname}.c`, (err) => {
          if (err) {
            console.error(`Error deleting file: ${err}`);
          }
        });
      } else {
        console.log(
          `Compilation successful: C script exited with code ${code}`
        );
        resolve();
      }
    });
  });
}

const cRun = async (fname) => {
  return new Promise((resolve, reject) => {
    const cProcess = spawn(`./server/${fname}.exe`);

    let outputData = "";
    let errorData = "";

    cProcess.stdout.on("data", (data) => {
      outputData += data.toString();
    });

    cProcess.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    cProcess.on("close", (code) => {
      fs.unlink(`./server/${fname}.c`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        }
      });
      fs.unlink(`./server/${fname}.exe`, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        }
      });

      if (code !== 0) {
        console.error(`Execution error with code ${code}`);
        reject(errorData);
      } else {
        resolve(outputData);
      }
    });
  });
};

async function cCompileAndRun(fname) {
  try {
    await cCompile(fname);

    const result = await cRun(fname);
    return result;
  } catch (err) {
    return err.toString();
  }
}

module.exports = cCompileAndRun;

const { spawn } = require("child_process");
const fs = require("fs");

async function cppCompile(fname) {
  return new Promise((resolve, reject) => {
    const CppCompile = spawn("g++", [
      `./server/${fname}.cpp`,
      "-o",
      `./server/${fname}`,
    ]);

    let errorData = "";

    CppCompile.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    CppCompile.stdout.on("data", (data) => {});

    CppCompile.on("close", (code) => {
      if (code !== 0) {
        console.error(`Compilation error with code ${code}`);
        reject(`Error compiling: ${errorData}`);
      } else {
        console.log(
          `Compilation successful: C++ script exited with code ${code}`
        );
        resolve();
      }
    });
  });
}

const cppRun = async (fname) => {
  return new Promise((resolve, reject) => {
    const cppProcess = spawn(`./server/${fname}.exe`);

    let outputData = "";
    let errorData = "";

    cppProcess.stdout.on("data", (data) => {
      outputData += data.toString();
    });

    cppProcess.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    cppProcess.on("close", (code) => {
      fs.unlink(`./server/${fname}.cpp`, (err) => {
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

async function cppCompileAndRun(fname) {
  try {
    await cppCompile(fname);

    const result = await cppRun(fname);
    return result;
  } catch (err) {
    return err.toString();
  }
}

module.exports = cppCompileAndRun;

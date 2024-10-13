const { spawn } = require("child_process");
const process = require("process");
const fs = require("fs");
const path = require("path");
let end = false,
  ran = false;

async function javaCompiler() {
  return new Promise((resolve, reject) => {
    const javaCompile = spawn("javac", ["./server/test.java"]);

    javaCompile.stderr.on("data", (data) => {
      console.error(`Error: ${data.toString()}`);
      reject(new Error("Compilation error"));
      process.exit();
    });

    javaCompile.on("close", (code) => {
      if (code === 0) {
        console.log(`Java Code compiled successfully with exit code ${code}`);
        resolve();
      } else {
        reject(new Error(`Compilation failed with exit code ${code}`));
      }
    });
  });
}

async function javaRun(filename) {
  const javaProcess = spawn("java", ["-cp", "./server", filename]);
  javaProcess.stdout.on("data", (data) => {
    console.log(`Output  : ${data.toString()}`);
    process.stdin.on("data", (input) => {
      javaProcess.stdin.write(input.toString());
    });
  });

  javaProcess.stderr.on("data", (data) => {
    end = true;
    console.log("error ", `${data.toString()}`);
  });

  javaProcess.on("close", async (code) => {
    end = true;
    if (code == 0) process.exit();
    else ran = true;
    return;
  });
}

myfunction = async () => {
  try {
    await javaCompiler();
    fs.readdir(__dirname, async (err, files) => {
      for (const jcode of files) {
        if (path.extname(jcode) === ".class") {
          await javaRun(jcode.slice(0, -6));
        }
      }

      if (ran) {
        await console.log("ERROR: NO MAIN FILE");
      }
    });
  } catch (error) {
    console.error(`Compilation failed: ${error.message}`);
  }
};
myfunction();

const express = require("express");
const router = express.Router();
const fs = require("fs");
const pyRun = require("./pyRun");
const jsRun = require("./jsRun");
const cppCompileAndRun = require("./cppRun");

const idgenerator = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const length = 10;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

router.get("/hello", (req, res) => {
  const newUser = req;
  res.send(`New user created: hello`);
});

router.post("/runPython", async (req, res) => {
  let fname = `${idgenerator()}.py`;
  try {
    await fs.promises.writeFile(`./server/${fname}`, req.body.code);
    console.log(`File written: ${fname}`);

    const result = await pyRun(fname);
    res.json({ output: result, error: false });
  } catch (err) {
    err.replaceAll(
      `C:\\Users\\shiya\\Documents\\s5IT\\WAD\\CodeEditor\\server\\${fname}`,
      "File.py"
    );
    console.log(err);
    res.json({ output: err, error: true });
  }
});

router.post("/runJavaScript", async (req, res) => {
  let fname = `${idgenerator()}.js`;
  try {
    await fs.promises.writeFile(`./server/${fname}`, req.body.code);
    console.log(`File written: ${fname}`);

    const result = await jsRun(fname);
    res.json({ output: result, error: false });
  } catch (err) {
    err.replaceAll(
      `C:\\Users\\shiya\\Documents\\s5IT\\WAD\\CodeEditor\\server\\${fname}`,
      "File.js"
    );
    console.log(err);
    res.json({ output: err, error: false });
  }
});

router.post("/runCpp", async (req, res) => {
  let fname = `${idgenerator()}`;
  try {
    await fs.promises.writeFile(`./server/${fname}.cpp`, req.body.code);
    console.log(`File written: ${fname}`);

    const result = await cppCompileAndRun(fname);
    res.json({ output: result, error: false });
  } catch (err) {
    err.replaceAll(
      `C:\\Users\\shiya\\Documents\\s5IT\\WAD\\CodeEditor\\server\\${fname}`,
      "File.cpp"
    );
    console.log(err);
    res.json({ output: err, error: false });
  }
});

module.exports = router;

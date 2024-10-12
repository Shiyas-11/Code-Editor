const express = require("express");
const router = express.Router();
const fs = require("fs");
const pyRun = require("./pyRun");
const jsRun = require("./jsRun");

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
  try {
    let fname = `${idgenerator()}.py`;
    await fs.promises.writeFile(`./server/${fname}`, req.body.code);
    console.log(`File written: ${fname}`);

    const result = await pyRun(fname);
    res.json({ output: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/runJavaScript", async (req, res) => {
  try {
    let fname = `${idgenerator()}.js`;
    await fs.promises.writeFile(`./server/${fname}`, req.body.code);
    console.log(`File written: ${fname}`);

    const result = await jsRun(fname);
    res.json({ output: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

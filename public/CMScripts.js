// import { execute } from "./execute";

let currentLanguage = "C";
const codeEditor = CodeMirror.fromTextArea(
  document.getElementById("codeEditor"),
  {
    lineNumbers: true,
    mode: "",
    theme: "material",
    tabSize: 4,
    indentWithTabs: true,
    autoCloseBrackets: true,
  }
);

changeLang(currentLanguage);

function changeLang(lang) {
  let newlang = Language[lang];
  codeEditor.setValue(newlang.sampletext);
  codeEditor.setOption("mode", newlang.mode);
  console.log(lang);
  currentLanguage = lang;
}

codeEditor.setSize("100%", "37em");
console.log("activated");
const buttons = document.querySelectorAll(".languageSwitch");
console.log(buttons);
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    changeLang(button.innerHTML);
  });
});

let run = document.getElementById("run");
let outdiv = document.getElementById("Output");
run.addEventListener("click", async (e) => {
  e.preventDefault();
  outdiv.innerHTML = "";
  console.log(codeEditor.getValue());
  setTimeout(async () => {
    const output = await fetch(
      `http://localhost:8080/execute/run${currentLanguage}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "python",
          code: codeEditor.getValue(),
        }),
      }
    );
    let out = await output.json();
    console.log("json", JSON.stringify(out));
    let formattedOut = out.output.replaceAll("\r\n", "<br>");
    console.log("formatte", formattedOut);
    outdiv.innerHTML = formattedOut;
  }, 1200);
});


const codeEditor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
	lineNumbers: true,  
	mode: "", 
	theme: 'material',    
	tabSize: 4,     
	indentWithTabs: true ,
	autoCloseBrackets:true,
  });

changeLang("C")

function changeLang(lang){
	let newlang=Language[lang]
	codeEditor.setValue(newlang.sampletext)
	codeEditor.setOption("mode",newlang.mode)
	console.log(lang)
  }


codeEditor.setSize("100%","75vh")
console.log("activated")
const buttons = document.querySelectorAll('.languageSwitch');
console.log(buttons)
buttons.forEach((button, index) => {
	button.addEventListener('click',()=>{
		changeLang(button.innerHTML)
	})
})

let run=document.getElementById('run')
run.addEventListener('click',(e)=>{
	e.preventDefault()
	console.log(codeEditor.getValue())
})
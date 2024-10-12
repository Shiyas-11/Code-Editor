let Language = {
  JavaScript: {
    mode: "javascript",
    extension: "js",
    sampletext: "console.log('hello world')",
  },
  Python: {
    mode: "text/x-python",
    extension: "js",
    sampletext: `class Solution:\n\tdef solution(self):\n\t\tprint("Hello World !")\n\n\nif __name__=="__main__":\n\tSolution().solution()`,
  },
  C: {
    mode: "text/x-csrc",
    extension: "c",
    sampletext: '#include<stdio.h>\nint main(){\n\tprintf("Hello World");\n}',
  },
  Java: {
    mode: "text/x-java",
    extension: "c",
    sampletext: 'print("hello world")',
  },
  Cpp: {
    mode: "text/x-c++src",
    extension: "cpp",
    sampletext:
      '#include<iostream>\nint main(){\n\tstd::cout<<"hello world"<<std::endl;\nreturn 0;\n}',
  },
};

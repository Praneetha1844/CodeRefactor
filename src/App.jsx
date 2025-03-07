import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const getLanguageId = (lang) => {
    const languageMap = {
      javascript: 63,
      python: 71,
      cpp: 54,
      java: 62,
    };
    return languageMap[lang] || 63;
  };

  const runCode = async () => {
    if (language === "javascript") {
      try {
        console.clear();
        console.log(eval(code));
        setOutput("Check console for output.");
      } catch (error) {
        console.error("Error:", error);
        setOutput(`Error: ${error.message}`);
      }
    } else {
      const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: { base64_encoded: "false", wait: "true" },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": "f70cc246e7mshbabd0daf0bd24f2p1459e9jsn573379f90684",
        },
        data: {
          source_code: code,
          language_id: getLanguageId(language),
          stdin: "",
        },
      };

      try {
        const response = await axios.request(options);
        setOutput(response.data.stdout || response.data.stderr || "No output.");
      } catch (error) {
        setOutput("Error: Unable to compile the code.");
      }
    }
  };

  return (
    <div className="bg-[#080715] min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full text-white p-4 flex justify-center gap-8 z-10 
     bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
        <a href="#section1" className="hover:text-gray-400">About</a>
        <a href="#section2" className="hover:text-gray-400">Steps</a>
        <a href="#editor" className="hover:text-gray-400">Code Editor</a>
      </nav>

      {/* Sections */}
      <div className="flex flex-col items-center p-4 pt-20">
        {/* Section 1 */}
        <div id="section1" className="p-4 mt-[100px]">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#fc0060] to-[#7500e7] bg-clip-text text-transparent">
            About Code Refactor
          </h1>
          <p className="text-white mt-4 min-w-[1000px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis est sit amet leo ullamcorper, id bibendum nisi dignissim. Phasellus ligula dolor, cursus vitae pretium id, feugiat et magna. Praesent id vulputate ipsum. Curabitur vitae justo non turpis finibus hendrerit et sed nisl. Duis efficitur leo quis neque finibus feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis a est eget interdum. Vestibulum mattis, enim in facilisis sodales, risus ante fermentum lacus, eget facilisis nisl sem quis nunc. In sollicitudin, est non elementum euismod, felis arcu imperdiet tellus, vitae volutpat ante nisi quis tellus. Duis ultricies eleifend volutpat. Etiam gravida metus semper posuere pulvinar. Nullam scelerisque enim ac finibus interdum. Sed sit amet ipsum dictum, condimentum nunc in, iaculis purus. Nullam vitae tempus sem. Praesent elit neque, vulputate vitae feugiat in, molestie maximus nibh. Etiam dapibus lectus justo, quis tincidunt dui tincidunt vitae.
          </p>
          <p className="text-white mt-4 min-w-[1000px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis est sit amet leo ullamcorper, id bibendum nisi dignissim. Phasellus ligula dolor, cursus vitae pretium id, feugiat et magna. Praesent id vulputate ipsum. Curabitur vitae justo non turpis finibus hendrerit et sed nisl. Duis efficitur leo quis neque finibus feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis a est eget interdum. Vestibulum mattis, enim in facilisis sodales, risus ante fermentum lacus, eget facilisis nisl sem quis nunc. In sollicitudin, est non elementum euismod, felis arcu imperdiet tellus, vitae volutpat ante nisi quis tellus. Duis ultricies eleifend volutpat. Etiam gravida metus semper posuere pulvinar. Nullam scelerisque enim ac finibus interdum. Sed sit amet ipsum dictum, condimentum nunc in, iaculis purus. Nullam vitae tempus sem. Praesent elit neque, vulputate vitae feugiat in, molestie maximus nibh. Etiam dapibus lectus justo, quis tincidunt dui tincidunt vitae.
          </p>
        </div>

        {/* Section 2 (Steps) */}
        <div id="section2" className="flex flex-col gap-6 mt-[200px] self-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#fc0060] to-[#7500e7] bg-clip-text text-transparent text-center">
            Steps to Use
          </h1>
          {[
            { step: "1", title: "Understand", desc: "Gather requirements." },
            { step: "2", title: "Plan", desc: "Design the structure." },
            { step: "3", title: "Implement", desc: "Write clean code." },
            { step: "4", title: "Test", desc: "Refine before deployment." },
          ].map((item) => (
            <div key={item.step} className="border border-gray-500 p-4 rounded-lg text-white max-w-xs text-center shadow-md">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#fc0060] to-[#7500e7] bg-clip-text text-transparent">
                {item.step}
              </div>
              <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
              <p className="text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Code Editor Section */}
        <div id="editor" className="bg-[#080715] min-h-screen flex flex-col p-4 mt-[200px] self-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#fc0060] to-[#7500e7] bg-clip-text text-transparent self-center mb-[100px]">
            Code Editor
          </h1>

          <div className="flex justify-center ">
            <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4">
              {/* Language Selector */}
              <div className="mb-4 flex justify-between items-center">
                <label className="text-white text-lg">Select Language:</label>
                <select
                  className="p-2 bg-gray-700 text-white border rounded"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>

              {/* Monaco Editor */}
              <Editor
                height="400px"
                width="1500px"
                theme="vs-dark"
                language={language}
                defaultValue={code}
                onChange={(value) => setCode(value || "")}
              />

              {/* Run Button */}
              <button
                className="mt-4 px-6 py-2 bg-blue-500 rounded hover:bg-blue-700 text-white font-semibold w-full"
                onClick={runCode}
              >
                Compile & Run
              </button>

              {/* Output Section */}
              <div className="mt-4 bg-black text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold">Output:</h2>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          </div>
          <button
                className="mt-[70px] px-6 py-2 bg-blue-500 rounded hover:bg-blue-700 text-white font-semibold "
                
              >
                Optmize
              </button>
        </div>
      </div>
    </div>
  );
}

export default App;

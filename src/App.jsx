import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [optimizedCode, setOptimizedCode] = useState("");

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

  const optimizeCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "codellama",
          prompt: `Optimize the following ${language} code for readability, efficiency, and best practices:\n\n${code}`,
          stream: false,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setOptimizedCode(response.data.response.trim());
    } catch (error) {
      console.error("Error:", error);
      setOptimizedCode("Error: Unable to optimize the code.");
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
        {/* Code Editor Section */}
        <div id="editor" className="bg-[#080715] min-h-screen flex flex-col p-4 mt-[200px] self-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#fc0060] to-[#7500e7] bg-clip-text text-transparent self-center mb-[100px]">
            Code Editor
          </h1>

          <div className="flex justify-center">
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

              {/* Run & Optimize Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-700 text-white font-semibold w-1/2"
                  onClick={runCode}
                >
                  Compile & Run
                </button>

                <button
                  className="px-6 py-2 bg-green-500 rounded hover:bg-green-700 text-white font-semibold w-1/2"
                  onClick={optimizeCode}
                >
                  Optimize Code
                </button>
              </div>

              {/* Output Section */}
              <div className="mt-4 bg-black text-white p-4 rounded-lg">
                <h2 className="text-lg font-semibold">Output:</h2>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>

              {/* Optimized Code Section */}
              {optimizedCode && (
                <div className="mt-4 bg-gray-900 text-white p-4 rounded-lg">
                  <h2 className="text-lg font-semibold">Optimized Code:</h2>
                  <pre className="whitespace-pre-wrap">{optimizedCode}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[#3c3b3b] min-h-screen flex  p-4">
      <div className="flex flex-col gap-8">
        {/* Section 1 */}
        <div className=" p-4 max-w-lg mt-[100px]" >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#fc0060] to-[#7500e7] bg-clip-text text-transparent">
            Code Refactor
          </h1>
          <p className="text-white mt-4 text-balance">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
        </div>

        {/* Section 2 */}
        <div className=" p-4 max-w-lg">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#fc0060] to-[#7500e7] bg-clip-text text-transparent">
            Code Refactor
          </h1>
          <p className="text-white mt-4 text-balance">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
        </div>

        {/* Step Cards */}
      <div className="flex flex-col gap-6 mt-10">
        {[
          { step: "1", title: "Step One", desc: "Understand the problem and gather requirements." },
          { step: "2", title: "Step Two", desc: "Plan the solution and design the structure." },
          { step: "3", title: "Step Three", desc: "Implement the solution using clean code." },
          { step: "4", title: "Step Four", desc: "Test and refine before deployment." },
        ].map((item) => (
          <div key={item.step} className="border border-gray-500 p-4 rounded-lg text-white max-w-xs text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#fc0060] to-[#7500e7] bg-clip-text text-transparent">
              {item.step}
            </div>
            <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
            <p className="text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default App


import { useEffect, useState } from "react";
import Header from "./components/Header";


import {useMachinesStore} from './store/useMachinesStore'

import Home from "./pages/Home";
import Setting from "./pages/Setting";


export default function App() {
  

  const fetchMachines = useMachinesStore(state=>state.loadFromDB)

  const machines = useMachinesStore(state=>state.machines);
  
  const totalMachines = machines.length;
  const runningCount = machines.filter((m) => m.status === "running").length;
  const alarmCount = machines.filter((m) => m.status === "alarm").length;
  
  const avgEfficiency = Math.round(
    machines.reduce((acc, m) => acc + m.efficiency, 0) / (totalMachines || 1)
  );
  const [openSetting,setOpenSetting] = useState(false)

  useEffect(()=>{fetchMachines()},[fetchMachines])



  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
       
        <Header machines={machines} toggleSetting={()=>setOpenSetting(prev=>!prev)} />
          <main className="relative">
            <Home  machines={machines} totalMachines={totalMachines} runningCount={runningCount} 
            alarmCount={alarmCount} avgEfficiency={avgEfficiency} />

            {openSetting && 
              <div className="absolute top-0 z-100 bg-slate-950 text-slate-100 w-full h-full">
                <Setting />
                </div>
            }

          </main>

          

      </div>
      
    </div>
  );
}
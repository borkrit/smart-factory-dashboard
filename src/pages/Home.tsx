import { useTranslation } from "react-i18next";
import MachineCard from "../components/MachineCard";
import type { Machine } from "../mock/machine";
import { useState } from "react";
import { MOCK_ZONE } from "../mock/zone";
import type { Zone } from "../types/database";




const Home = ({totalMachines,alarmCount,runningCount,avgEfficiency,machines}:any)=>{
    const {t} = useTranslation()
    const [currentZone, setCurrentZone] = useState<Zone|null>(null)


    const handleSetCurrentZone = (zone:Zone)=>{
        setCurrentZone(zone)
    }

    return (
      <>
      
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-mono uppercase">Всего станков</span>
            <p className="text-2xl font-bold font-mono mt-1 text-slate-100">{totalMachines}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-mono uppercase">В работе</span>
            <p className="text-2xl font-bold font-mono mt-1 text-emerald-400">{runningCount}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-mono uppercase">В аварии</span>
            <p className={`text-2xl font-bold font-mono mt-1 ${alarmCount > 0 ? "text-rose-400" : "text-slate-400"}`}>
              {alarmCount}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-mono uppercase">Средний OEE</span>
            <p className="text-2xl font-bold font-mono mt-1 text-indigo-400">{avgEfficiency}%</p>
          </div>
        </div>
        <div className="flex gap-2 ">
            {
                MOCK_ZONE.map(zone=>(
                    <button className={`${zone.id === currentZone?.id ? 'text-amber-300' : 'text-gray-400' }`} onClick={()=>handleSetCurrentZone(zone)}  >{zone.title}</button>
                ))
            }
        </div>

        <main>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-200">{t('common.map_industrial')} {currentZone?.title} </h2>
            <span className="text-xs font-mono text-slate-500">{t('common.count_module',{count:6})}</span>
          </div>

          {
            currentZone && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {machines.map((machine: Machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
          }

          
        </main>
      </>
    )
}

export default Home;
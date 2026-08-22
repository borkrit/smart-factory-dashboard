
import Header from "./components/Header";
import MachineCard from "./components/MachineCard";

import AddMachine from "./components/AddMachine";

import {useMachinesStore} from './store/useMachinesStore'
import { useTranslation } from "react-i18next";
import AsideBar from "./components/AsideBar";

export default function App() {
  const {t} = useTranslation()
  const machines = useMachinesStore(state=>state.machines);

  
  const totalMachines = machines.length;
  const runningCount = machines.filter((m) => m.status === "running").length;
  const alarmCount = machines.filter((m) => m.status === "alarm").length;
  
  const avgEfficiency = Math.round(
    machines.reduce((acc, m) => acc + m.efficiency, 0) / (totalMachines || 1)
  );

  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
       
        <Header machines={machines} />
        <AddMachine />

      
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

        <main>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-200">{t('common.map_industrial')}</h2>
            <span className="text-xs font-mono text-slate-500">{t('common.count_module',{count:6})}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {machines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        </main>
      </div>
      <AsideBar/>
    </div>
  );
}
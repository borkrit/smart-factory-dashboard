import type { JSX } from "react";
import type { Machine } from "../mock/machine";

const STATUS_CONFIG = {
  running: {
    label: "В РАБОТЕ",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  warning: {
    label: "ОБСЛУЖИВАНИЕ",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },
  alarm: {
    label: "АВАРИЯ",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse",
    dot: "bg-rose-500",
  },
  offline: {
    label: "ВЫКЛЮЧЕН",
    badge: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    dot: "bg-slate-500",
  },
};

const MachineCard = ({ machine }: { machine: Machine }): JSX.Element => {
  const status = STATUS_CONFIG[machine.status];
  const isHighTemp = machine.temperature > 80;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 transition-all duration-200 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-950/50">
        
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-semibold text-slate-100 text-base leading-tight">
            {machine.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {machine.id} • {machine.type}
          </p>
        </div>

       
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium font-mono border ${status.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

     
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80">
        
        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-medium">
            Темп.
          </span>
          <span
            className={`font-mono text-sm font-bold ${
              isHighTemp ? "text-rose-400 animate-pulse" : "text-slate-200"
            }`}
          >
            {machine.temperature}°C
          </span>
        </div>

       
        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-medium">
            Скорость
          </span>
          <span className="font-mono text-sm font-bold text-slate-200">
            {machine.speed} <span className="text-[10px] font-normal text-slate-400">RPM</span>
          </span>
        </div>

       
        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-medium">
            OEE
          </span>
          <span className="font-mono text-sm font-bold text-slate-200">
            {machine.efficiency}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default MachineCard;
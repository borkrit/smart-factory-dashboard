import { useTranslation } from "react-i18next"
import type { Machine } from "../mock/machine"
import { useEffect, useRef, useState, type JSX } from "react"

import { IoSettingsOutline } from "react-icons/io5";
import AsideBar from "./AsideBar";


const Header = ({machines}:{machines:Machine[]}):JSX.Element=>{
  const {t} = useTranslation()
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null)


    const hasAlarm = machines.some((item)=>{
      return  item.status === 'alarm' || item.temperature > 80
    })

    const hasWarning = machines.some(item=>{
       return  item.status === 'warning' || item.status === 'offline'
    })

    const getSystemStatus = () => {
    if (hasAlarm) {
      return {
        label: 'system_status.alarm_label',
        badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
        dot: "bg-rose-500 animate-ping",
      };
    }
    if (hasWarning) {
      return {
        label: "system_status.warning_label",
        badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        dot: "bg-amber-400",
      };
    }
    return {
      label: 'system_status.common_label',
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      dot: "bg-emerald-400",
    };
  };

    const status = getSystemStatus()

    const handleToggleMenu = ()=>{
        setToggleMenu(true)
    }

    useEffect(()=>{

      const eventClick = (e:MouseEvent)=>{
        if(ref.current && !ref.current.contains(e.target as Node)){
            setToggleMenu(false)
        }
        
      }
      if(toggleMenu){
      document.addEventListener('click',eventClick)

      }


      return ()=>{
        document.removeEventListener('click',eventClick)
        
      }

    },[toggleMenu])


    return(
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🏭</span> SmartFactory IIoT
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Мониторинг Цеха #1 • Смена А
        </p>
      </div>

      
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 `}
      >
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium border ${status.badge}`}>
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${status.dot}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${status.dot.replace('animate-ping', '')}`} />
          </span>
        {t(status.label)}

        </div>
       
        
        <div ref={ref}>
          <IoSettingsOutline size={24} onClick={handleToggleMenu} />
          <AsideBar open={toggleMenu}  />
        </div>
        

      </div>

    </header>)
}

export default Header
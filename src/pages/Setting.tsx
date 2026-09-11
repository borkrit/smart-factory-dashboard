import { useState } from "react";
import AddMachine from "../components/AddMachine";
import type { FC, JSX } from "react";
import AddShifts from "../components/AddShifts";

interface SettingItem {
    settingName:string,
    settingComponent: FC|null
}

type SettingTabKey = 'add_machine' |'add_zone'|'add_worker'| 'add_instruction'| 'add_shift'

const settingsMenu: Record<SettingTabKey,SettingItem> = {
   'add_machine' : {   
        settingName:'Add machine',
        settingComponent: AddMachine
    },
    'add_shift':{
        settingName:'Add Shift',
        settingComponent: AddShifts
    },
    'add_zone': {
        settingName:'Add zone',
        settingComponent: null
    },
    'add_worker':{
        settingName:'Add worker',
        settingComponent: null
    },
    'add_instruction':{
        settingName:'Add insturction for machine',
        settingComponent: null
    }

}

const Setting = ()=>{

    const [currentTab,setCurrentTab] = useState<SettingTabKey|null>(null)

    const ActiveComponent = currentTab && settingsMenu[currentTab]?.settingComponent 

    const handleSetCurrentTab = (setting:SettingTabKey)=>{
                setCurrentTab(setting)
    }

    return(
        <>
            Setting page
            <div className="flex gap-2.5">
{
                (Object.keys(settingsMenu) as SettingTabKey[]).map(settingKey => <button key={settingKey} className={`${settingKey === currentTab && 'text-amber-300'}`} 
                    onClick={()=>handleSetCurrentTab(settingKey)}> {settingsMenu[settingKey].settingName} </button> )
            }

            </div>
            
            
            {
                ActiveComponent ? <ActiveComponent /> : <p>component soon be create </p>
            }

            

            
        </>
    )
}

export default Setting;
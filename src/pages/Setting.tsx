import { useState } from "react";
import AddMachine from "../components/AddMachine";
import type { FC, JSX } from "react";
import AddShifts from "../components/AddShifts";

interface SettingItem {
    settingName:string,
    settingComponent: React.ComponentType|null
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
        settingName:'Add instruction for machine',
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
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Setting page</h1>
            <div className="flex gap-2.5">
{
                (Object.keys(settingsMenu) as SettingTabKey[]).map(settingKey => 
                <button key={settingKey} className={`px-3 py-1.5 rounded transition-colors ${settingKey === currentTab
                  ? "text-amber-300 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
                    onClick={()=>handleSetCurrentTab(settingKey)}> {settingsMenu[settingKey].settingName} </button> )
            }

            </div>
            
            <div className="tab-content border-t pt-4">
                {!currentTab && (
                <p className="text-gray-500">Select a tab to configure settings</p>
                )}

                {currentTab && ActiveComponent && <ActiveComponent />}

                {currentTab && !ActiveComponent && (
                <p className="text-amber-600 italic">
                    Component will be created ASAP
                </p>
                )}
            </div>
            

            
        </div>
    )
}

export default Setting;
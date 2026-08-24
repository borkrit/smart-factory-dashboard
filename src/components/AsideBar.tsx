import type { JSX } from "react";
import { useTranslation } from "react-i18next"
import AddMachine from "./AddMachine";

const AsideBar = ({open}:{open:boolean}):JSX.Element=>{
    
    const {t, i18n} = useTranslation(undefined,{ keyPrefix: 'setting' })
    const currentLanguage = i18n.language
    
    const listLanguages = Object.keys(i18n.services.resourceStore.data || {})

    const handleToggleLang  = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        i18n.changeLanguage(event.target.value);
    }


    return(
        <div className={`absolute h-full bg-slate-900 w-1/4 p-2.5 top-0 right-0 ${open ? '':'hidden'}`} >
            {t('title')}

            <AddMachine/>

            <p>{t('current_language')} {currentLanguage}</p>
            <select onChange={handleToggleLang} value={currentLanguage}>
                {
                listLanguages && listLanguages.map((language) =>{
                    return (
                        <option  key={language} value={language}>
                            {language}
                        </option>
                    )
                })
            }
            </select>
            
        </div>
    )
}

export default AsideBar
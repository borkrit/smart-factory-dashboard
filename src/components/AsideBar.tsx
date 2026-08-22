import { useTranslation } from "react-i18next"

const AsideBar = ()=>{
    
    const {t, i18n} = useTranslation(undefined,{ keyPrefix: 'setting' })
    const currentLanguage = i18n.language
    
    const listLanguages = Object.keys(i18n.services.resourceStore.data || {})

    const handleToggleLang  = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        i18n.changeLanguage(event.target.value);
    }


    return(
        <div className="absolute h-full w-[200px]" >
            {t('title')}
            <p>{t('current_language')} {currentLanguage}</p>
            <select onChange={handleToggleLang} value={currentLanguage}>
                {
                listLanguages && listLanguages.map((language,index) =>{
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
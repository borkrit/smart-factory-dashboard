import { useRef, useState } from "react"
import { useMachinesStore } from "../store/useMachinesStore"
import { useTranslation } from "react-i18next"
import type { JSX,SubmitEvent } from "react"
import { supabase } from "../utils/supabase"
import Blueprints from "./Blueprints"



const initState = {
        name:'',
        type:'',
        components:'',
        blueprint: null
    }

   

const AddMachine = ():JSX.Element=>{

    const {t} = useTranslation()

    const [ form ,setForm ] = useState(initState)
    
    const addMachine = useMachinesStore(state=>state.addMachine)
   


    const handleChange = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => { 
            setForm(prev=>({...prev,[event.target.name]:event.target.value}))
       }

    const handleSelectImage = (e)=>{

        setForm(prev=>({...prev,blueprint:e.target.files[0]}))
    }

    const handleSubmit = (e:SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault(); 

        const payload ={...form,
            components : form.components.split('\n'),
            blueprint_img:sendBluePrintsToDB(form?.blueprint)
        };


        console.log(payload)
        addMachine(form);
        setForm(initState)}


    const sendBluePrintsToDB = async (file:File)=>{
       

        const path = `machine/${Date.now()}-${file.name}`
        const {data, error} = await supabase.storage.from('blueprints').upload(path,file)

        if(error){
            throw new Error(error.message)
        }

        const {data: urlData } =  supabase.storage.from('blueprints').getPublicUrl(data.path)

        console.log(urlData)
        return urlData
        
    }

    const handleSetComponentsWithPoint = (title,points)=>{
        console.log('test')
    }
    

    return (<>
        <div>
            <form className="grid gap-3 " onSubmit={handleSubmit}>
                <label htmlFor="name" className="border-amber-300 grid">
                    Name machine
                    <input name='name' value={form.name} type="text"
                    className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                    onChange={handleChange} />
                </label>

                <label htmlFor="type" className="grid">
                    type
                    <input name='type' value={form.type} 
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                    type="text" onChange={handleChange} />
                </label>

                <label htmlFor="components" className="grid">
                    Main component which will be set on the img 
                    <textarea name="components"  value={form.components}  
                    onChange={handleChange}
                    rows={10}
                    className=" bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100" />

                </label>

                <label htmlFor="blueprint">
                    <input type="file" onChange={handleSelectImage}  />

                   {form.blueprint && <Blueprints blueprintImg={form?.blueprint} handleSetComponentsWithPoint={handleSetComponentsWithPoint} />  } 
                </label>

                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded text-sm">
                    {t('new_machine.add_new_machine')}
                </button>
            </form>
            

        </div>
    </>)
}

export default AddMachine
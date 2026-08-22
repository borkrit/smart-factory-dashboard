import { useState } from "react"
import { useMachinesStore } from "../store/useMachinesStore"
import { useTranslation } from "react-i18next"

const AddMachine = ()=>{

    const {t} = useTranslation()

    const [ form ,setForm ] = useState({
        name:'',
        type:''
    })
    const addMachine = useMachinesStore(state=>state.addMachine)

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => { 
            setForm(prev=>({...prev,[event.target.name]:event.target.value}))

       }

    return (<>
        <div>
            <form className="" onSubmit={(e)=>{e.preventDefault(); addMachine(form);setForm({name:'',type:''})}}>
                <label htmlFor="name" className="border-amber-300">
                    <input name='name' value={form.name} type="text"
                    className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                    onChange={handleChange} />
                </label>

                <label htmlFor="type">
                    <input name='type' value={form.type} 
                        className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                    type="text" onChange={handleChange} />
                </label>

                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded text-sm">
                   
                    {t('new_machine.add_new_machine')}
                </button>
            </form>

        </div>
    </>)
}

export default AddMachine
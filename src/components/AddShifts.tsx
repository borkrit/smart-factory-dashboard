import { useState, type SubmitEvent} from "react";
import { supabase } from "../utils/supabase";
import type { Shift } from "../types/database";



const initState = {
        name:'',
        code:'',
        startTime:'',
        endTime:''
    }

const AddShifts = ()=>{

    const [shift,setShift] = useState<Shift>(initState)
    const [loading,setLoading] = useState<boolean>(false)


    const handleChangeForm = (e:React.ChangeEvent<HTMLInputElement>)=> setShift(prev=>({...prev,[e.target.name]:e.target.value}))
    
    const handleSubmit = async(e:SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)

        const { data, error } =  await supabase.from('shifts')
        .insert({
            name:shift.name,
            code:shift.code,
            start_time:shift.startTime,
            end_time:shift.endTime
        })
        .select()

        if (error) {
        console.error('Error creating shift:', error.message);
        alert(`Error: ${error.message}`);
        return;
        }


        setLoading(false)

        console.log(data)

        setShift(initState)
    

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md p-4 bg-slate-800 rounded-xl text-white">
      <label className="flex flex-col gap-1 text-sm font-medium">
        Name Shift
        <input 
          name="name" 
          type="text" 
          required
          value={shift.name} 
          onChange={handleChangeForm} 
          placeholder="e.g. Morning Shift"
          className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Code Shift
        <input 
          name="code" 
          type="text" 
          required
          value={shift.code} 
          onChange={handleChangeForm} 
          placeholder="e.g. SHIFT_1"
          className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400"
        />
      </label>

      <div className="flex gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium flex-1">
          Start time Shift
          <input 
            name="startTime" 
            type="time" 
            required
            value={shift.startTime} 
            onChange={handleChangeForm} 
            className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium flex-1">
          End time Shift
          <input 
            name="endTime" 
            type="time" 
            required
            value={shift.endTime} 
            onChange={handleChangeForm} 
            className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400"
          />
        </label>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="mt-2 py-2 px-4 bg-amber-500 hover:bg-amber-600 font-bold text-slate-900 rounded-lg transition-colors disabled:opacity-50"
      > 
        {loading ? 'Submitting...' : 'Submit'} 
      </button>
    </form>
    )
}

export default AddShifts;
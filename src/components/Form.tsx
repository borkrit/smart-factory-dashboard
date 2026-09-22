import React, { useState } from "react"

const mock_data = [
    {
        target:'name',
        labelName:'name',
        placeholder:'',
        type:"text",
        required:true,
    },
    {
        target:'code',
        labelName:'code',
        placeholder:'',
        type:"text",
        required:true,
    },
    {
         target:'startTime',
        labelName:'start time',
        placeholder:'',
        type:"time",
        required:true,
    },
{
        target:'endTime',
        labelName:'end time',
        placeholder:'',
        type:"time",
        required:true, 
    }

]


const Form = ({submitForm='',titleForm='testform'})=>{

    const [submitedFormv,setSubmitedForm] = useState<boolean>(false)
    const [formData,setFromData]= useState<Record<string,any>>({})


    const handleChangeForm = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement |HTMLTextAreaElement >)=>{
        setFromData(prevForm => ({...prevForm,[e.target.name]:e.target.value}))
       
    }

    const handleSubmitForm = (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setSubmitedForm(true)
        // submitForm
        console.log(formData)
    }

    return(

           <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-4 w-full max-w-md p-5 bg-slate-800 rounded-xl text-white shadow-lg shrink-0"
      >
        <h2 className="text-lg font-bold border-b border-slate-700 pb-2">
          {titleForm}
        </h2>

        {
            mock_data.map((item)=>{
                return(
                    <>
                       <label className="flex flex-col gap-1 text-sm font-medium">
                            {item.labelName}
                            <input
                                name={item.target}
                                type={item.type}
                                required={item.required}
                                value={formData[item.target]||''}
                                onChange={handleChangeForm}
                                placeholder={
                                    item.placeholder
                                }
                                className="p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                            />
                            </label>
                    </>
                )
            })
        }


        <button
          type="submit"
          disabled={submitedFormv}
          className="mt-2 py-2 px-4 bg-amber-500 hover:bg-amber-600 font-bold text-slate-900 rounded-lg transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitedFormv ? "Submitting..." : "Submit"}
        </button>
      </form>
    )
}

export default Form
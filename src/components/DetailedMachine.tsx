
import { useEffect, useState, type JSX } from "react"
import {  type MachineDetail } from "../mock/machine"
import { supabase } from "../utils/supabase"


interface DetailedMachine {
    machineId:string
    close:()=>void,

}
   const  getMachineDetail = async (id:string):Promise<MachineDetail>=>{
    const [detailRes, machineRes] = await Promise.all([
        await supabase.from('machine_details').select('*').eq('machine_id',id).single(),
        await supabase.from('machines').select('*').eq('id',id).single()
    ])  

    if(detailRes.error || machineRes.error){
        throw new Error('Ooops')
    }
    
    const detail = detailRes.data
    const machine = machineRes.data

    return {
    id: detail.machine_id,
    name:machine.name,
    serialNumber: detail.serial_number,
    manufacturer: detail.manufacturer,
    model: detail.model,
    installationDate: detail.installation_date,
    location: {
      workshop: detail.workshop,
      zone: detail.zone,
    },
    operator: {
      name: detail.operator_name,
      shift: detail.operator_shift,
    },
    specifications: {
      maxSpeed: detail.max_speed,
      maxTemperature: detail.max_temperature,
      powerRating: detail.power_rating,
    },
    telemetryHistory: detail.telemetry_history || [],
    maintenanceLogs: detail.maintenance_logs || [],
  };

}




const DetailedMachine = ({machineId,close}:DetailedMachine):JSX.Element=>{

   const [data,setData]=useState<MachineDetail | null>(null);
   const [isLoading,setIsLoading] = useState<boolean>(true)
   const [error,setError] = useState<string|null>(null)


   useEffect(()=>{
    let isCancelled = false

    const fetchData = async () =>{
        setIsLoading(true);
        setError(null);

        try{
            const data = await getMachineDetail(machineId)
            
            if(!isCancelled) setData(data)

        }catch(err){
           if(!isCancelled) setError(err instanceof Error ? err.message:'Uops')
        } finally {
           if(!isCancelled) setIsLoading(false)
        }
    }

    fetchData()

    return () => {
      isCancelled = true;
    };

   },[machineId])





    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <h2 className="text-lg font-bold">Детальная информация</h2>
          <button
            onClick={close}
            className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer text-sm font-medium"
          >
            ✕ Close
          </button>
        </div>

        {isLoading && (
          <div className="py-8 text-center text-slate-400 font-mono text-sm">
            Loading...
          </div>
        )}

        {error && (
          <div className="py-8 text-center text-rose-400 font-mono text-sm">
            {error}
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-slate-800/50">
              <span className="text-slate-400">Name:</span>
              <span className="font-semibold">{data.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/50">
              <span className="text-slate-400">Model:</span>
              <span className="font-semibold">{data.manufacturer} {data.model}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/50">
              <span className="text-slate-400">Serial Number:</span>
              <span className="font-mono">{data.serialNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/50">
              <span className="text-slate-400">Location:</span>
              <span>{data.location.workshop} ({data.location.zone})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/50">
              <span className="text-slate-400">Operator:</span>
              <span>{data.operator.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Power:</span>
              <span className="font-mono">{data.specifications.powerRating}</span> 
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailedMachine
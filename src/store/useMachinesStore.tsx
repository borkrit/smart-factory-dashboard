
import { create } from 'zustand'
import { supabase } from '../utils/supabase';


interface Machine {
    id: string;
    name: string;
    type: string;
    status: 'running' | 'warning' | 'alarm' | 'offline';
    temperature: number;
    speed: number;
    efficiency: number
}

interface MachinesState {
    machines: Machine[]
    addMachine: (info: Pick<Machine, 'name' | 'type'>) => void
    loadFromDB:()=>void
}


export const useMachinesStore = create<MachinesState>((set) => ({
    machines: [],
    
    addMachine: (info) => set((state) => ({
        machines: [
            ...state.machines, 
            {
                id: Date.now().toString(),
                name: info.name,
                type: info.type,
                status: 'offline',
                temperature: 0,
                speed: 0,
                efficiency: 0,
            }
        ]
    })),

    loadFromDB: async()=>{
        try{
           const {data,error} = await supabase.from('machines').select('*')

           if(error){
            throw new Error ('ooops')
           }
           set({machines: data as Machine[]})

        }catch(err){}
        finally{

        }


    }

}));
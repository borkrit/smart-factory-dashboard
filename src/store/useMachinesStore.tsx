
import { create } from 'zustand'
import { MOCK_MACHINES } from "../mock/machine";

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
}


export const useMachinesStore = create<MachinesState>((set) => ({
    machines: MOCK_MACHINES,
    
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
    }))
}));
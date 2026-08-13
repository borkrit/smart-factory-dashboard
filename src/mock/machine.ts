export interface Machine {
    id:string;
    name:string;
    type:string;
    status:'running'|'warning'|'alarm'|'offline';
    temperature:number;
    speed:number;
    efficiency:number
}

export const MOCK_MACHINES: Machine[] = [
  { id: 'M-01', name: 'ЧПУ Фрезер #1', type: 'Фрезеровка', status: 'running', temperature: 42, speed: 1200, efficiency: 94 },
  { id: 'M-02', name: 'Пресс Гидравлический', type: 'Штамповка', status: 'alarm', temperature: 88, speed: 0, efficiency: 12 },
  { id: 'M-03', name: 'Токарный станок A2', type: 'Токарная', status: 'warning', temperature: 65, speed: 800, efficiency: 78 },
  { id: 'M-04', name: 'Упаковочный робот', type: 'Упаковка', status: 'running', temperature: 38, speed: 1500, efficiency: 98 },
  { id: 'M-05', name: 'Лазерная резка', type: 'Резка', status: 'offline', temperature: 20, speed: 0, efficiency: 0 },
  { id: 'M-06', name: 'ЧПУ Фрезер #2', type: 'Фрезеровка', status: 'running', temperature: 45, speed: 1180, efficiency: 91 },
];
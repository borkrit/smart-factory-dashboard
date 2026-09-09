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


export type Operator ={
  name:string,
  shift:string;
}
export interface SensorTelemetry {
  timestamp: string;
  temperature: number;
  vibration: number; 
  powerConsumption: number;
}
export interface MaintenanceLog {
  id: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection';
  description: string;
  technician: string;
}

export interface MachineDetail {
  id:string;
  name:string;
  serialNumber:string;
  manufacturer:string;
  model:string;
  installationDate:string;
  location:{
    workshop:string;
    zone:string;
  }
  operator:Operator,
  specifications:{
    maxSpeed:number,
    maxTemperature:number,
    powerRating:string
  }
  telemetryHistory:SensorTelemetry[],
  maintenanceLogs:MaintenanceLog[]

  
}

// export const MOCK_MACHINE_DETAILS: MachineDetail[] = [
//   {
//     id: 'M-01',
//     serialNumber: 'CNC-2023-8891',
//     manufacturer: 'Haas Automation',
//     model: 'VF-2SS',
//     installationDate: '2023-03-15',
//     location: { workshop: 'Цех #1', zone: 'Зона А' },
//     operator: { name: 'Алексей Ковалев', shift: 'Смена А' },
//     specifications: { maxSpeed: 12000, maxTemperature: 75, powerRating: '22 kW' },
//     telemetryHistory: [
//       { timestamp: '10:00', temperature: 40, vibration: 1.2, powerConsumption: 14.2 },
//       { timestamp: '10:15', temperature: 41, vibration: 1.3, powerConsumption: 14.5 },
//       { timestamp: '10:30', temperature: 42, vibration: 1.2, powerConsumption: 14.1 },
//     ],
//     maintenanceLogs: [
//       { id: 'LOG-101', date: '2026-08-10', type: 'routine', description: 'Замена смазки шпинделя и чистка фильтров', technician: 'Игорь Сидоров' },
//     ],
//   },
//   {
//     id: 'M-02',
//     serialNumber: 'HYD-2021-0042',
//     manufacturer: 'Schuler Pressen',
//     model: 'HP-500T',
//     installationDate: '2021-11-01',
//     location: { workshop: 'Цех #1', zone: 'Зона Б' },
//     operator: { name: 'Михаил Петров', shift: 'Смена А' },
//     specifications: { maxSpeed: 50, maxTemperature: 80, powerRating: '45 kW' },
//     telemetryHistory: [
//       { timestamp: '10:00', temperature: 72, vibration: 4.8, powerConsumption: 38.0 },
//       { timestamp: '10:15', temperature: 81, vibration: 7.2, powerConsumption: 42.1 },
//       { timestamp: '10:30', temperature: 88, vibration: 9.1, powerConsumption: 5.0 },
//     ],
//     maintenanceLogs: [
//       { id: 'LOG-089', date: '2026-09-01', type: 'repair', description: 'Перегрев масляного контура, требуется замена клапана', technician: 'Дмитрий Волков' },
//     ],
//   },
//   {
//     id: 'M-03',
//     serialNumber: 'LAT-2022-4410',
//     manufacturer: 'DMG Mori',
//     model: 'NLX 2500',
//     installationDate: '2022-06-20',
//     location: { workshop: 'Цех #1', zone: 'Зона А' },
//     operator: { name: 'Сергей Борисов', shift: 'Смена А' },
//     specifications: { maxSpeed: 4000, maxTemperature: 70, powerRating: '18.5 kW' },
//     telemetryHistory: [
//       { timestamp: '10:00', temperature: 58, vibration: 2.1, powerConsumption: 11.0 },
//       { timestamp: '10:15', temperature: 62, vibration: 3.4, powerConsumption: 12.8 },
//       { timestamp: '10:30', temperature: 65, vibration: 3.8, powerConsumption: 13.0 },
//     ],
//     maintenanceLogs: [
//       { id: 'LOG-095', date: '2026-07-15', type: 'inspection', description: 'Проверка соосности патрона и замена резцедержателя', technician: 'Игорь Сидоров' },
//     ],
//   },
//   {
//     id: 'M-04',
//     serialNumber: 'ROB-2024-9001',
//     manufacturer: 'KUKA Robotics',
//     model: 'KR 210 R2700',
//     installationDate: '2024-01-10',
//     location: { workshop: 'Цех #1', zone: 'Зона В (Упаковка)' },
//     operator: { name: 'Елена Морозова', shift: 'Смена А' },
//     specifications: { maxSpeed: 3000, maxTemperature: 60, powerRating: '12 kW' },
//     telemetryHistory: [
//       { timestamp: '10:00', temperature: 36, vibration: 0.5, powerConsumption: 7.8 },
//       { timestamp: '10:15', temperature: 37, vibration: 0.6, powerConsumption: 8.0 },
//       { timestamp: '10:30', temperature: 38, vibration: 0.5, powerConsumption: 7.9 },
//     ],
//     maintenanceLogs: [
//       { id: 'LOG-112', date: '2026-08-25', type: 'routine', description: 'Плановая калибровка манипулятора', technician: 'Андрей Васильев' },
//     ],
//   },
//   {
//     id: 'M-05',
//     serialNumber: 'LAS-2020-1105',
//     manufacturer: 'Trumpf',
//     model: 'TruLaser 3030',
//     installationDate: '2020-09-05',
//     location: { workshop: 'Цех #1', zone: 'Зона Б' },
//     operator: { name: 'Нет оператора', shift: '-' },
//     specifications: { maxSpeed: 6000, maxTemperature: 65, powerRating: '30 kW' },
//     telemetryHistory: [
//       { timestamp: '10:00', temperature: 20, vibration: 0.0, powerConsumption: 0.2 },
//       { timestamp: '10:15', temperature: 20, vibration: 0.0, powerConsumption: 0.2 },
//       { timestamp: '10:30', temperature: 20, vibration: 0.0, powerConsumption: 0.2 },
//     ],
//     maintenanceLogs: [
//       { id: 'LOG-077', date: '2026-08-30', type: 'repair', description: 'Остановлен на плановый ремонт оптической головки', technician: 'Дмитрий Волков' },
//     ],
//   },
//   {
//     id: 'M-06',
//     serialNumber: 'CNC-2023-8892',
//     manufacturer: 'Haas Automation',
//     model: 'VF-2SS',
//     installationDate: '2023-03-15',
//     location: { workshop: 'Цех #1', zone: 'Зона А' },
//     operator: { name: 'Виктор Смирнов', shift: 'Смена А' },
//     specifications: { maxSpeed: 12000, maxTemperature: 75, powerRating: '22 kW' },
//     telemetryHistory: [
//       { timestamp: '10:00', temperature: 43, vibration: 1.4, powerConsumption: 15.0 },
//       { timestamp: '10:15', temperature: 44, vibration: 1.5, powerConsumption: 14.8 },
//       { timestamp: '10:30', temperature: 45, vibration: 1.4, powerConsumption: 15.1 },
//     ],
//     maintenanceLogs: [
//       { id: 'LOG-102', date: '2026-08-11', type: 'routine', description: 'Промывка системы СОЖ и проверка направляющих', technician: 'Игорь Сидоров' },
//     ],
//   },
// ];
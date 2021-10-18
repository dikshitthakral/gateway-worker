
export interface IHorseResult {
    id: number;
    name: string;
}

export interface ISimulatorEvent {
    event: string;
    horse: IHorseResult;
    time: number;
}
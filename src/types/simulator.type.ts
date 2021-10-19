
export interface IHorseResult {
    id: number;
    name: string;
}

export interface IHorseRacingEvent {
    event: string;
    horse: IHorseResult;
    time: number;
}
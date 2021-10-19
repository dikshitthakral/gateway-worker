import simulatorExternalRepository from '../repositories/simulatorExternal.repository';
import databaseRepository from '../repositories/database.repository';
import { IHorseRacingEvent } from '../types/simulator.type';
import logger from '../logger';

const fetchResults = async (): Promise<IHorseRacingEvent> => {
    let simulatorEvent: IHorseRacingEvent | null;
    try {
        simulatorEvent = await simulatorExternalRepository.getResultFromSimulator();
        if (!simulatorEvent) {
            logger.info(`fetchResults: simulator event value is Empty fetching again.`);
            await new Promise(resolve => setTimeout(resolve, 3000));
            simulatorEvent = await fetchResults();
        }
        return simulatorEvent;
    } catch (err) {
        logger.error(`Error while fetching result ${JSON.stringify(err)}`);
        throw err;
    }
}

const subscribe = async (): Promise<void> => {
    const horseRacingEvent: IHorseRacingEvent = await fetchResults();
    await databaseRepository.save(horseRacingEvent);
    await subscribe();
}

const simulatorService = {
    subscribe
};

export default simulatorService;
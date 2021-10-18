import simulatorExternalRepository from '../repositories/simulatorExternal.repository';
import simulatorWorkerRepository from '../repositories/simulatorWorker.repository';
import { ISimulatorEvent } from '../types/simulator.type';
import logger from '../logger';
import { AppError } from '../utility/appError';
import { ErrorCode } from '../utility/error';
import { getCache, setCache, deleteCache } from '../cache';


const fetchResults = async (accessToken): Promise<ISimulatorEvent> => {
    let simulatorEvent: ISimulatorEvent | null;
    try {
        simulatorEvent = await simulatorExternalRepository.getResultFromSimulator(accessToken);
        if (!simulatorEvent) {
            logger.info(`fetchResults: simulator event value is Empty fetching again.`);
            await new Promise(resolve => setTimeout(resolve, 3000));
            simulatorEvent = await fetchResults(accessToken);
        }
        return simulatorEvent;
    } catch (err) {
        logger.error(`fetchResults: Error while fetching results`);
        throw err;
    }
}

const subscribeEvents = async (): Promise<void> => {
    try {
        let accessToken = getCache('accessToken');
        if (!accessToken) {
            accessToken = await simulatorExternalRepository.fetchAccessToken();
            setCache('accessToken', accessToken);
        }
        const simulatorEvent: ISimulatorEvent = await fetchResults(accessToken);
        await simulatorWorkerRepository.createSimulatorEvent(simulatorEvent);
        await subscribeEvents();
    }
    catch (err) {
        if (err.response.status === 401 && err.response.data.error === 'Invalid credentials') {
            throw new AppError(ErrorCode.INVALID_CREDENTIALS);
        }
        deleteCache('accessToken');
        await subscribeEvents();
    }
}
const simulatorService = {
    subscribeEvents
};

export default simulatorService;
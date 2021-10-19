import { simulatorHttpClient } from '../client/simulatorHttpClient';
import config from '../config';
import { get } from 'lodash';
import logger from '../logger';
import { AppError } from '../utility/appError';
import { ErrorCode } from '../utility/error';
import { StatusCode } from '../utility/http.enum';
import { IHorseRacingEvent } from '../types/simulator.type';
import { setCache, deleteCache, getCache } from '../cache';

const fetchAccessToken = async (): Promise<string> => {
    try {
        logger.info(`Fetching Access Token from simulator.`);
        const result = await simulatorHttpClient.post(
            config.SIMULATOR_AUTH_URL, {
            "email": config.EMAIL,
            "password": config.SIMULATOR_PASSWORD
        });
        const accessToken = get(result, ['data', 'token']);
        if (!accessToken) {
            logger.error(`Access Token Not found from Simulator.`);
            throw new AppError(ErrorCode.INVALID_CREDENTIALS);
        }
        logger.info(`Access Token value : ${accessToken}`);
        return accessToken;
    } catch (err) {
        logger.error(`Access Token not found for email ${config.EMAIL}, status: ${err.response.status} 
        and error : ${JSON.stringify(err.response.data)}`);
        if (err.response.status === StatusCode.Service_Unavailable) {
            // wait for 3 seconds before making request
            await new Promise(resolve => setTimeout(resolve, 3000));
            return getAccessToken();
        }
        else if (err.response.data.error === 'Invalid credentials') {
            throw new AppError(ErrorCode.INVALID_CREDENTIALS);
        }
        throw err;
    }
}

const getAccessToken = async (): Promise<string> => {
    try {
        logger.info(`get access token from simulator`);
        let accessToken = getCache('accessToken');
        if (accessToken) {
            return accessToken;
        }
        accessToken = await fetchAccessToken();
        setCache('accessToken', accessToken);
        return accessToken;
    } catch (err) {
        logger.error(`Error while get token ${JSON.stringify(err)}`);
        throw err;
    }
}

const refreshAccessToken = async (): Promise<void> => {
    try {
        logger.info(`refresh access token from simulator`);
        deleteCache('accessToken');
        const accessToken = await fetchAccessToken();
        setCache('accessToken', accessToken);
    } catch (err) {
        logger.error(`Error while refresh token ${JSON.stringify(err)}`);
        throw err;
    }
}

const getResultFromSimulator = async (): Promise<IHorseRacingEvent | null> => {
    try {
        logger.info(`getResultFromSimulator : Making a request to result end point`);
        const accessToken = await getAccessToken();
        const result = await simulatorHttpClient.get(
            config.SIMULATOR_RESULT_URL,
            { headers: { "Authorization": `Bearer ${accessToken}` } }
        );
        logger.info(`getResultFromSimulator : Response status ${result.status}`);
        if (result.status === StatusCode.No_Content)
            return null;

        return result.data as IHorseRacingEvent;
    } catch (err) {
        logger.info(`getResultFromSimulator : Error status : ${err.response && err.response.status} and error : ${JSON.stringify(err)}`);
        if (err instanceof AppError && err.errorCode === ErrorCode.INVALID_CREDENTIALS) {
            throw err;
        }
        await refreshAccessToken();
        await getResultFromSimulator();
        return;
    }
}
const simulatorExternalRepository = {
    getAccessToken,
    getResultFromSimulator
};

export default simulatorExternalRepository;
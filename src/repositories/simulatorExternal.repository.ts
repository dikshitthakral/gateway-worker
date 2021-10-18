import { simulatorHttpClient } from '../client/simulatorHttpClient';
import config from '../config';
import { get } from 'lodash';
import logger from '../logger';
import { AppError } from '../utility/appError';
import { ErrorCode } from '../utility/error';
import { StatusCode } from '../utility/http.enum';
import { ISimulatorEvent } from '../types/simulator.type';

const fetchAccessTokenFromClient = async (): Promise<string> => {
    try {
        const result = await simulatorHttpClient.post(
            config.SIMULATOR_AUTH_URL, {
            "email": config.EMAIL,
            "password": config.SIMULATOR_PASSWORD
        });
        const response = get(result, ['data', 'token']);
        if (!response) {
            throw new AppError(ErrorCode.ACCESS_TOKEN_NOT_FOUND);
        }
        return response;
    } catch (err) {
        logger.error(`Invalid Credentials/access Token Not Found for email ${config.EMAIL}, status: ${err.response.status} 
            and error : ${JSON.stringify(err.response.data)}`);
        if (err.response.status === 503) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return fetchAccessTokenFromClient();
        }
        throw new AppError(ErrorCode.ACCESS_TOKEN_NOT_FOUND);
    }
}

const getResultFromSimulator = async (accessToken: string): Promise<ISimulatorEvent> => {
    try {
        logger.info(`getResultFromSimulator : Making a request to result end point`);
        const result = await simulatorHttpClient.get(
            config.SIMULATOR_RESULT_URL,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
        );
        logger.info(`getResultFromSimulator : Response status ${result.status}`);
        if (result.status === StatusCode.No_Content) {
            return null;
        }
        return result.data as ISimulatorEvent;
    } catch (err) {
        logger.info(`getResultFromSimulator : Error status : ${err.response.status} and error : ${err.response.data}`);
        throw err;
    }
}
const simulatorExternalRepository = {
    fetchAccessTokenFromClient,
    getResultFromSimulator
};

export default simulatorExternalRepository;
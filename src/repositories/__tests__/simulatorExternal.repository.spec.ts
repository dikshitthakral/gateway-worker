import simulatorHttpClient from '../../client/simulatorHttpClient';
import { getCache, setCache, deleteCache } from '../../cache';
import { horseRacingEventData } from '../__mocks__/data';
import simulatorExternalRepository from '../simulatorExternal.repository';
import { StatusCode } from '../../utility/http.enum';
import { AppError } from '../../utility/appError';
import { ErrorCode } from '../../utility/error';
import { setAsyncTimeout } from '../../utility/common.utils';

jest.mock('../../client/simulatorHttpClient');
jest.mock('../../cache');
jest.mock('../../utility/common.utils');
describe('simulatorExternal repository', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should get horse racing event when active accessToken is available', async () => {
        // Given
        (simulatorHttpClient.post as jest.Mock).mockResolvedValueOnce({
            data: {
                token: 'ad466222cdbdcb4a3fa825ce54a858df534acb29b'
            }
        });
        (getCache as jest.Mock).mockReturnValueOnce(null);
        (simulatorHttpClient.get as jest.Mock).mockResolvedValueOnce({
            data: horseRacingEventData()
        });
        // When
        const event = await simulatorExternalRepository.getResultFromSimulator();
        // Then
        expect(event).toBeDefined();
        expect(event).toEqual(horseRacingEventData())
    });

    it('should throw error when we pass invalid credentials', async () => {
        // Given
        (simulatorHttpClient.post as jest.Mock).mockRejectedValueOnce({
            response: {
                status: 401,
                data: {
                    error: 'Invalid credentials'
                }
            }
        });
        (getCache as jest.Mock).mockReturnValueOnce(null);
        (simulatorHttpClient.get as jest.Mock).mockResolvedValueOnce({
            data: horseRacingEventData()
        });
        // When
        try {
            await simulatorExternalRepository.getResultFromSimulator();
        } catch (err) {
            // Then
            expect(err).toBeInstanceOf(AppError);
            expect(err.errorCode).toEqual(ErrorCode.INVALID_CREDENTIALS);
        }
    });

    it('should throw error when token did not come from simulator', async () => {
        // Given
        (simulatorHttpClient.post as jest.Mock).mockResolvedValueOnce({
            data: {
                token: null
            }
        });
        (getCache as jest.Mock).mockReturnValueOnce(null);
        (simulatorHttpClient.get as jest.Mock).mockResolvedValueOnce({
            data: horseRacingEventData()
        });
        // When
        try {
            await simulatorExternalRepository.getResultFromSimulator();
        } catch (err) {
            // Then
            expect(err).toBeInstanceOf(AppError);
            expect(err.errorCode).toEqual(ErrorCode.INVALID_CREDENTIALS);
        }
    });

    it('should throw 503 service unavailable error and after that fetch correct event', async () => {
        // Given
        (simulatorHttpClient.post as jest.Mock).mockRejectedValueOnce({
            response: {
                status: 503,
                data: {
                    error: 'Service Unavailable'
                }
            }
        }).mockResolvedValueOnce({
            data: {
                token: 'ad466222cdbdcb4a3fa825ce54a858df534acb29b'
            }
        });
        (setAsyncTimeout as jest.Mock).mockResolvedValueOnce(null);
        (getCache as jest.Mock).mockReturnValueOnce(null);
        (simulatorHttpClient.get as jest.Mock).mockResolvedValueOnce({
            data: horseRacingEventData()
        });
        // When
        const event = await simulatorExternalRepository.getResultFromSimulator();
        // Then
        expect(event).toBeDefined();
        expect(event).toEqual(horseRacingEventData())
    });

    it('should get horse racing event as null when active accessToken is available', async () => {
        // Given
        (simulatorHttpClient.post as jest.Mock).mockResolvedValueOnce({
            data: {
                token: 'ad466222cdbdcb4a3fa825ce54a858df534acb29b'
            }
        });
        (getCache as jest.Mock).mockReturnValueOnce(null);
        (simulatorHttpClient.get as jest.Mock).mockResolvedValueOnce({
            data: null
        });
        // When
        const event = await simulatorExternalRepository.getResultFromSimulator();
        // Then
        expect(event).toBeNull();
    });

    it('should get valid horse racing event when inactive accessToken is passed after calling refresh token method', async () => {
        // Given
        (simulatorHttpClient.post as jest.Mock).mockResolvedValueOnce({
            data: {
                token: 'ad466222cdbdcb4a3fa825ce54a858df534acb29b'
            }
        });
        (getCache as jest.Mock).mockReturnValueOnce('ad466222cdbdcb4a3fa825ce54a858df534acb29b').mockReturnValueOnce('ad466222cdbdcb4a3fa825ce54a858df534acb29b');
        (deleteCache as jest.Mock).mockReturnValueOnce(null);
        (setCache as jest.Mock).mockReturnValueOnce(null);
        (simulatorHttpClient.get as jest.Mock).mockRejectedValueOnce({
            response: {
                status: 401,
                data: {
                    error: 'Access Denied'
                }
            }
        }).mockResolvedValueOnce({
            data: horseRacingEventData()
        });
        // When
        const event = await simulatorExternalRepository.getResultFromSimulator();
        // Then
        expect(event).toBeDefined();
        expect(event).toEqual(horseRacingEventData());
        expect(getCache).toHaveBeenCalledTimes(2);
        expect(deleteCache).toHaveBeenCalledTimes(1);
        expect(setCache).toHaveBeenCalledTimes(1);
        expect(simulatorHttpClient.post).toHaveBeenCalledTimes(1);
        expect(simulatorHttpClient.get).toHaveBeenCalledTimes(2);
    });
});
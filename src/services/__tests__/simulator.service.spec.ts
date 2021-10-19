import simulatorExternalRepository from '../../repositories/simulatorExternal.repository';
import databaseRepository from '../../repositories/database.repository';
import { setAsyncTimeout } from '../../utility/common.utils';
import { horseRacingEventData } from '../../repositories/__mocks__/data';
import { AppError } from '../../utility/appError';
import { ErrorCode } from '../../utility/error';
import simulatorService from '../simulator.service';

jest.mock('../../repositories/database.repository');
jest.mock('../../repositories/simulatorExternal.repository');
jest.mock('../../utility/common.utils');

describe('simulator service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('subscribe events for first time and got error second time it will stop the process', async () => {
        // Given
        (simulatorExternalRepository.getResultFromSimulator as jest.Mock).mockResolvedValueOnce({
            ...horseRacingEventData()
        }).mockRejectedValueOnce(new AppError(ErrorCode.INVALID_CREDENTIALS));
        (databaseRepository.save as jest.Mock).mockResolvedValueOnce({
            ...horseRacingEventData()
        });
        // When
        try {
            await simulatorService.subscribe();
        } catch (err) {
            // When
            expect(err).toBeInstanceOf(AppError);
            expect(err.errorCode).toEqual(ErrorCode.INVALID_CREDENTIALS);
        }
    });

    it('subscribe events for first time and got error second time it will stop the process', async () => {
        // Given
        (simulatorExternalRepository.getResultFromSimulator as jest.Mock).mockResolvedValueOnce({
            ...horseRacingEventData()
        }).mockRejectedValueOnce(new AppError(ErrorCode.INVALID_CREDENTIALS));
        (databaseRepository.save as jest.Mock).mockResolvedValueOnce({
            ...horseRacingEventData()
        });
        // When
        try {
            await simulatorService.subscribe();
        } catch (err) {
            // When
            expect(err).toBeInstanceOf(AppError);
            expect(err.errorCode).toEqual(ErrorCode.INVALID_CREDENTIALS);
            expect(simulatorExternalRepository.getResultFromSimulator).toHaveBeenCalledTimes(2);
            expect(databaseRepository.save).toHaveBeenCalledTimes(1);
        }
    });

    it('subscribe empty event for first time and got error second time it will stop the process', async () => {
        // Given
        (simulatorExternalRepository.getResultFromSimulator as jest.Mock).mockResolvedValueOnce(null).mockRejectedValueOnce(new AppError(ErrorCode.INVALID_CREDENTIALS));
        (databaseRepository.save as jest.Mock).mockResolvedValueOnce({
            ...horseRacingEventData()
        });
        // When
        try {
            await simulatorService.subscribe();
        } catch (err) {
            // When
            expect(err).toBeInstanceOf(AppError);
            expect(err.errorCode).toEqual(ErrorCode.INVALID_CREDENTIALS);
            expect(simulatorExternalRepository.getResultFromSimulator).toHaveBeenCalledTimes(2);
            expect(databaseRepository.save).toHaveBeenCalledTimes(0);
        }
    });
});
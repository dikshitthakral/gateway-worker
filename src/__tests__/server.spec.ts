import simulatorService from '../services/simulator.service';
import Server from '../server';
import { connectMongo } from '../database';

jest.mock('../services/simulator.service');
jest.mock('../database');
describe('Server file', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should subscribe events', async () => {
        (simulatorService.subscribe as jest.Mock).mockResolvedValueOnce(null);
        (connectMongo as jest.Mock).mockResolvedValueOnce(null);
        const server = await Server.prototype.start();
        expect(server).toBeUndefined();
    });
});
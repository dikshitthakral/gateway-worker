import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectMongo } from '../database';

describe('database', () => {
    describe('connectMongo', () => {
        let mongod: MongoMemoryServer;

        beforeEach(() => {
            mongod = new MongoMemoryServer();
        });

        afterEach(() => {
            mongod.stop();
        });
        it(`should throw error if has any error event in connection`, async () => {
            jest.spyOn(mongoose, 'connect').mockImplementationOnce((): any => {
                mongoose.connection.emit('error', new Error());
                return new Promise(resolve => {
                    resolve();
                });
            });
            const error = await connectMongo().catch(error => error);
            expect(error).toBeDefined();
        });

        it(`should be successful event in connection`, async () => {
            jest.spyOn(mongoose, 'connect').mockImplementationOnce((): any => {
                mongoose.connection.emit('open');
                return new Promise(resolve => {
                    resolve();
                });
            });
            const error = await connectMongo().catch(error => error);
            expect(error).toBeUndefined();
        });
    });
});
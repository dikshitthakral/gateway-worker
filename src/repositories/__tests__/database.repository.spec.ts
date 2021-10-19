import { MongoMemoryServer } from 'mongodb-memory-server';
import { HorseRacingEventModel } from '../../db/simulatorEvent.schema';
import { IHorseRacingEvent } from '../../types/simulator.type';
import mongoose from 'mongoose';
import { horseRacingEventData } from '../__mocks__/data';
import databaseRepository from '../database.repository';

jest.mock('mongoose', () => {
    const mongoose = jest.requireActual('mongoose');
    return new mongoose.Mongoose(); // new mongoose instance and connection for each test
});

describe('database repository', () => {
    let mongod: MongoMemoryServer;
    beforeAll(async () => {
        mongod = new MongoMemoryServer();
        const mongoDbUri = await mongod.getConnectionString();
        await mongoose.connect(mongoDbUri);
    });
    afterEach(async () => {
        expect.hasAssertions();
        await HorseRacingEventModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });

    describe('save method', () => {
        it('should save horse racing event successfully', async () => {
            // Given
            let horseRacingEvent = horseRacingEventData();

            // When
            const createdModel = await databaseRepository.save(
                horseRacingEvent
            );

            // Then
            expect(createdModel).toBeDefined();
            expect(createdModel.event).toEqual(
                horseRacingEvent.event
            );
            expect(createdModel.time).toEqual(
                horseRacingEvent.time
            );
            expect(createdModel.horse.id).toEqual(
                horseRacingEvent.horse.id
            );
            expect(createdModel.horse.name).toEqual(
                horseRacingEvent.horse.name
            );
        });
    });
});
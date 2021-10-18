import mongoose, { Schema, Model, Document } from 'mongoose';
import { ISimulatorEvent } from '../types/simulator.type';

const HorseSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: false, _id: false });

const SimulatorEventsSchema = new Schema({
    event: {
        type: String,
        required: true
    },
    horse: {
        type: HorseSchema,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

export type SimulatorEventDocument = ISimulatorEvent & Document;
export const collectionName = 'simulator_event';
export const SimulatorEventModel: Model<SimulatorEventDocument> = mongoose.model(
    collectionName,
    SimulatorEventsSchema
);
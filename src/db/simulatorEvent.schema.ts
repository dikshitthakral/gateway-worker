import mongoose, { Schema, Model, Document } from 'mongoose';
import { IHorseRacingEvent } from '../types/simulator.type';

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

const HorseRacingEventsSchema = new Schema({
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

export type HorseRacingEventDocument = IHorseRacingEvent & Document;
export const collectionName = 'horse_racing_event';
export const HorseRacingEventModel: Model<HorseRacingEventDocument> = mongoose.model(
    collectionName,
    HorseRacingEventsSchema
);
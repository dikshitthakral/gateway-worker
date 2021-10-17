import config from "./config";
import { connection, connect } from 'mongoose';
import logger from "./logger";

export const connectMongo = () =>
    new Promise<void>((resolve, reject) => {

        const dbUri = config.MONGO_URI;

        connection.once('open', () => resolve());

        connection.on('error', err => {
            logger.error('error while connecting to mongodb', err);
            reject(err);
        });
        connect(dbUri);
    });

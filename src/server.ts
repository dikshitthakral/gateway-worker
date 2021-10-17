import { connectMongo } from "./database";
import logger from "./logger";


class Server {
    constructor() { }
    async start() {
        try {
            await connectMongo();
            logger.info(`Mongodb running , initializing worker.`);
            // initialize worker method.
            return;
        } catch (err) {
            logger.error(`Error in starting server ${err}`);
            throw err;
        }
    }
}

const server = new Server();
server.start();

import { connectMongo } from "./database";
import logger from "./logger";
import simulatorService from "./services/simulator.service";

class Server {
    constructor() { }
    async start() {
        try {
            await connectMongo();
            logger.info(`Mongodb running , initializing worker.`);
            await simulatorService.subscribeEvents();
            return;
        } catch (err) {
            logger.error(`Error in starting server ${err}`);
            throw err;
        }
    }
}

const server = new Server();
server.start();

import axios from 'axios';
import config from '../config';

const simulatorHttpClient = axios.create({
    baseURL: config.SIMULATOR_BASE_URL,
    timeout: 20000, // configurable will wait for response till 20 seconds
    headers: {}
});

export default simulatorHttpClient;

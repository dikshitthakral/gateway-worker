const config = {
    "MONGO_URI": process.env.MONGO_URL || "mongodb://localhost:27017/gateway_db",
    "SIMULATOR_PASSWORD": process.env.SIMULATOR_PASSWORD || "lTgAYaLP9jRs",
    "EMAIL": process.env.EMAIL || "xyz@gmail.com",
    "SIMULATOR_BASE_URL": process.env.SIMULATOR_BASE_URL || "http://35.207.169.147",
    "SIMULATOR_AUTH_URL": process.env.SIMULATOR_AUTH_URL || "/auth",
    "SIMULATOR_RESULT_URL": process.env.SIMULATOR_RESULT_URL || "/results"
};

export default config;
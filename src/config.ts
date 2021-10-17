const config = {
    "MONGO_URI": process.env.MONGO_URL || "mongodb://localhost:27017/local_db",
    "SIMULATOR_PASSWORD": process.env.SIMULATOR_PASSWORD || "lTgAYaLP9jRs",
    "EMAIL": process.env.EMAIL || "xyz@gmail.com"
};

export default config;
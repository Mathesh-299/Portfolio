const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

redisClient.on("connect", () => {
    console.log("Redis is connected");
});

redisClient.on("error", (error) => {
    console.error("Redis connection failed:", error);
});
(async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
})();

module.exports = redisClient;

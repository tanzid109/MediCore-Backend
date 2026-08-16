import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";
import { redisClient } from "./lib/redis";
import { seedSuperAdmin } from "./utils/seed";

const PORT = config.port;

const main = async () => {
	try {
		await prisma.$connect();
		await redisClient.connect()
		console.log("redis connected")
		await seedSuperAdmin()
		console.log("Connected to the database successfully.");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Error starting the server:", error);
		await prisma.$disconnect();
		process.exit(1);
	}
};

main();

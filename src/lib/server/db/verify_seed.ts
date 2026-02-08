import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "./schema/auth.js";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
    process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

async function main() {
    try {
        const users = await db.select().from(user);
        console.log(`Found ${users.length} users:`);
        users.forEach(u => console.log(`- ${u.email} (${u.name})`));
    } catch (error) {
        console.error("Verification failed:", error);
    } finally {
        await client.end();
    }
}

main();

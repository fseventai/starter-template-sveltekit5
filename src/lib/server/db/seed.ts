import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user, account } from "./schema/auth.js";
import { hashPassword } from "../password.js";

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

async function main() {
    console.log("Seeding database...");

    const userId = crypto.randomUUID();
    const email = "admin@example.com";
    const password = "Password123!";
    const hashedPassword = await hashPassword(password);

    try {
        await db.insert(user).values({
            id: userId,
            name: "Admin User",
            email: email,
            emailVerified: true,
        });

        await db.insert(account).values({
            id: crypto.randomUUID(),
            userId: userId,
            accountId: email,
            providerId: "email",
            password: hashedPassword,
        });

        console.log("Seed completed successfully!");
        console.log(`User created: ${email}`);
        console.log(`Password: ${password}`);
    } catch (error) {
        console.error("Seed failed:", error);
    } finally {
        await client.end();
    }
}

main();

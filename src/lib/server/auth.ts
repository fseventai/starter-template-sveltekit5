import { env } from "$env/dynamic/private";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { hashPassword, verifyPassword } from "./password";

export const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        disableSignUp: false,
        requireEmailVerification: true,
        password: {
            hash: hashPassword,
            verify: verifyPassword,
        },
    },
    // Add other providers or configuration as needed
    // user: {
    //   additionalFields: {
    //     role: {
    //       type: "string",
    //       defaultValue: "viewer",
    //       input: false, // Don't allow user to set role during signup
    //     },
    //   },
    // },
});

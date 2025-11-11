import db from "@/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      users: schema.users,
      user_accounts: schema.userAccounts,
      user_sessions: schema.userSessions,
      verifications: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  user: {
    modelName: "users",
    additionalFields: {
      name: {
        type: "string",
        required: false,
      },
      username: {
        type: "string",
        required: true,
        unique: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      birthDate: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
    },
  },
  session: {
    modelName: "user_sessions",
  },
  account: {
    modelName: "user_accounts",
  },
  verification: {
    modelName: "verifications",
  },
});

import { DATABASE_URL } from "@/lib/constants";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle({
  connection: {
    connectionString: DATABASE_URL,
    ssl: true,
  },
  casing: "snake_case",
});

export default db;

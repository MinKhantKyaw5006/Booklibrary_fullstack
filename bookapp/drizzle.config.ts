import {config} from "dotenv";
import {defineConfig} from 'drizzle-kit';

config({path: ".env.local"});

export default defineConfig({
  schema: "./database/schema.ts", // Adjust this if your schema is in a different folder
  out: "./migrations", // Where the generated SQL files will be stored
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

});

import { exec } from "child_process";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const DB_NAME = "employee_tracker";
const DB_USER = process.env.DB_USER || "yourUsername";
const DB_PASSWORD = process.env.DB_PASSWORD || "yourPassword";
const SCHEMA_PATH = path.join(__dirname, "schema.sql");
const SEEDS_PATH = path.join(__dirname, "seeds.sql");

// Function to execute shell commands
const executeCommand = (command: string) => {
  return new Promise<void>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error executing command: ${command}`, stderr);
        reject(error);
      } else {
        console.log(`✅ ${command} executed successfully.`);
        console.log(stdout);
        resolve();
      }
    });
  });
};

// Function to set up the database
const setupDatabase = async () => {
  try {
    console.log("🚀 Starting database setup...");

    // Create the database
    await executeCommand(`psql -U ${DB_USER} -c "DROP DATABASE IF EXISTS ${DB_NAME};"`);
    await executeCommand(`psql -U ${DB_USER} -c "CREATE DATABASE ${DB_NAME};"`);

    // Run schema and seeds files
    await executeCommand(`psql -U ${DB_USER} -d ${DB_NAME} -f "${SCHEMA_PATH}"`);
    await executeCommand(`psql -U ${DB_USER} -d ${DB_NAME} -f "${SEEDS_PATH}"`);

    console.log("🎉 Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Database setup failed!", error);
  }
};

// Run setup
setupDatabase();

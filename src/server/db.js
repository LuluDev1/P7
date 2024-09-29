import postgres from "postgres";

const sql = postgres(
  "postgresql://postgres:LMmKZJeQAWmicVHzIcdVaeAIUFfQgjzD@junction.proxy.rlwy.net:27263/groupomania"
);

async function createTable() {
  try {
    await sql`CREATE TABLE users (
      id SERIAL PRIMARY KEY,             
      email VARCHAR(255) NOT NULL UNIQUE,  
      password VARCHAR(64) NOT NULL  
    );`;

    console.log("Table 'users' created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

export default sql;

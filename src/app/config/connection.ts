import pkg from "pg";
const { Pool } = pkg;

export const connection = new Pool({
  user: "root",
  host: "",
  database: "",
  password: "",
  port: 8001,
});

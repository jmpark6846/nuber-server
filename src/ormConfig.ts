import { ConnectionOptions } from "typeorm";
const connectionOption: ConnectionOptions = {
  type: "postgres",
  database: "postgres",
  logging: true,
  synchronize: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT || "127.0.0.1",
  port: 5432,
  username: process.env.DB_USERNAME || "joonmo",
  password: process.env.DB_PASSWORD || "password"
};

export default connectionOption;

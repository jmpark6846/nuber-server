import { ConnectionOptions } from "typeorm";

const connectionOption: ConnectionOptions = {
  type: "postgres",
  database: "postgres",
  logging: true,
  synchronize: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

export default connectionOption;

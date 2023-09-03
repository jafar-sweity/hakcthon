import { DataSource } from "typeorm";
import { AWS_hackthon } from "./entities/AWS.js";
import { Text_table } from "./entities/text.js";
import { celebrity } from "./entities/celebrity.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: '-',
    port: 3306,
    username: '-',
    password: '-',
    database: '-',
    entities: [
        AWS_hackthon, Text_table, celebrity
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
});

const initialize = () => dataSource.initialize().then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});

export default { initialize, dataSource };
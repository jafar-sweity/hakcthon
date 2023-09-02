import { DataSource } from "typeorm";
import { AWS_hackthon } from "./entities/AWS.js";
import { Text_table } from "./entities/text.js";
import { celebrity } from "./entities/celebrity.js";

const dataSource = new DataSource({
    type: 'mysql',
    host: 'hackathon-jafar.ckxcq2pvrc9s.eu-west-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: '12345678',
    database: 'hackathon',
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
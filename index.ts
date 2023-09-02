import express from 'express'
import fs from 'fs'
import AWS from 'aws-sdk'
import { log } from 'console';
import imgROUTER from './routes/image.js'
import DB from './db/datasource.js'
// const imagePath = 'path/to/your/image.jpg';
// const imageBuffer = fs.readFileSync(imagePath);
// const base64Encoded = imageBuffer.toString('base64');



AWS.config.update({
    accessKeyId: 'AKIA3SQWPZW46M2GQ5O5',
    secretAccessKey: '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',
    region: 'eu-west-2',
});



const app = express();
app.use(express.json());

app.use(imgROUTER)
const PORT = 3000;
app.listen(PORT, () => {
    console.log('hello');
    DB.initialize();

})
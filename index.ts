import express from 'express'
import fs from 'fs'
import AWS from 'aws-sdk'
import { log } from 'console';

// const imagePath = 'path/to/your/image.jpg';
// const imageBuffer = fs.readFileSync(imagePath);
// const base64Encoded = imageBuffer.toString('base64');

// const s3 = new AWS.S3();
// const rekognition = new AWS.Rekognition();
const app = express();
app.use(express.json());
AWS.config.update({
    accessKeyId: 'AKIA3SQWPZW46M2GQ5O5',
    secretAccessKey: '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',
    region: 'london',
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('hello');

})
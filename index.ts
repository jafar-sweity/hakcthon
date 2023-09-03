import express from 'express'
import fs from 'fs'
import AWS from 'aws-sdk'
import { log } from 'console';
import imgROUTER from './routes/image.js'
import DB from './db/datasource.js'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url';
// const imagePath = 'path/to/your/image.jpg';
// const imageBuffer = fs.readFileSync(imagePath);
// const base64Encoded = imageBuffer.toString('base64');
const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static('images'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

app.get('/', (req, res) => {
    res.render('index');
});




app.use(imgROUTER)
const PORT = 3000;
app.listen(PORT, () => {
    console.log('hello');
    DB.initialize();

})


AWS.config.update({
    accessKeyId: 'AKIA3SQWPZW4US4HEGLZ',
    secretAccessKey: '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',
    region: 'eu-west-2',
});





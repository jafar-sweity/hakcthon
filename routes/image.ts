import express from 'express'
import fs from 'fs'
import AWS from 'aws-sdk'
import { log } from 'console';
import multer from 'multer'


const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, './images')

    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)

    },
});
const upload = multer({ storage });

router.post('/image', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }
    else {


        console.log(req.file.filename);
        const rekognition = new AWS.Rekognition();


        const imageBuffer = fs.readFileSync('./images/' + req.file.filename);

        const params = {
            Image: {
                Bytes: imageBuffer,
            },
            MaxLabels: 2,
        };

        rekognition.detectLabels(params, (err, data) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                console.log('Labels detected:', JSON.stringify(data.Labels, null, 2));
                res.json(data);
            }
        });
    }
});

export default router;
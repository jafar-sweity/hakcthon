import express from 'express'
import fs from 'fs'
import AWS from 'aws-sdk'
import { log } from 'console';
import multer from 'multer'
import { AWS_hackthon } from '../db/entities/AWS.js';
import { celebrity } from '../db/entities/celebrity.js';
import { Text_table } from '../db/entities/text.js';


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

router.post('/image', upload.single('file'), async (req, res) => {
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }
    else {


        console.log(req.file.filename);
        const rekognition = new AWS.Rekognition();
        const filename = req.file.filename;

        const imageBuffer = fs.readFileSync('./images/' + req.file.filename);

        const params = {
            Image: {
                Bytes: imageBuffer,
            },
            MaxLabels: 2,
        };
        const newaws = new AWS_hackthon()
        rekognition.detectLabels(params, async (err, data) => {
            if (err) {
                console.error('Error:', err);
                res.status(500).json({ error: 'An error occurred' });
            } else {
                console.log('Labels detected:', JSON.stringify(data.Labels, null, 2));
                const path = './ images /' + filename;
                const result = JSON.stringify(data);
                newaws.path = path;
                newaws.result = result;
                await newaws.save();

                res.json(data);
            }
        });
    }
});


router.post('/celebrity', upload.single('file'), async (req, res) => {
    const rekognition = new AWS.Rekognition();
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }
    const newaws = new celebrity()

    try {
        const filename = req.file.filename;
        const imageBuffer = fs.readFileSync('./images/' + req.file.filename);

        const celebrityDetectionParams = {
            Image: {
                Bytes: imageBuffer,
            },
        };

        const celebrityDetectionResult = await rekognition.recognizeCelebrities(celebrityDetectionParams).promise();
        const path = './ images /' + filename;
        const result = JSON.stringify(celebrityDetectionResult);
        newaws.path = path;
        newaws.result = result;
        await newaws.save();
        res.send(
            celebrityDetectionResult.CelebrityFaces,
        );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('error An error occurred');
    }
});

router.post('/text', upload.single('file'), async (req, res) => {
    const rekognition = new AWS.Rekognition();

    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }
    const newaws = new Text_table()

    try {
        const filename = req.file.filename;

        const imageBuffer = fs.readFileSync('./images/' + req.file.filename);

        const textDetectionParams = {
            Image: {
                Bytes: imageBuffer,
            },
        };

        const textDetectionResult = await rekognition.detectText(textDetectionParams).promise();
        const path = '/ images /' + filename;
        const result = JSON.stringify(textDetectionResult);
        newaws.path = path;
        newaws.result = result;
        await newaws.save();
        res.json({
            detectedText: textDetectionResult.TextDetections,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
export default router;
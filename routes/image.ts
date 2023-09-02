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


router.post('/celebrity', upload.single('file'), async (req, res) => {
    const rekognition = new AWS.Rekognition();
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
    }

    try {
        const imageBuffer = fs.readFileSync('./images/' + req.file.filename);

        const celebrityDetectionParams = {
            Image: {
                Bytes: imageBuffer,
            },
        };

        const celebrityDetectionResult = await rekognition.recognizeCelebrities(celebrityDetectionParams).promise();

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

    try {
        const imageBuffer = fs.readFileSync('./images/' + req.file.filename);

        const textDetectionParams = {
            Image: {
                Bytes: imageBuffer,
            },
        };

        const textDetectionResult = await rekognition.detectText(textDetectionParams).promise();

        res.json({
            detectedText: textDetectionResult.TextDetections,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
export default router;
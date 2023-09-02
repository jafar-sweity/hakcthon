import express from 'express'

import * as AWS from 'aws-sdk';
import * as fs from 'fs';

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: 'AKIA3SQWPZW44JN3JSWL',
  secretAccessKey: 'R5ZxQKGpQoci6CB0funaQWIUobljo8CDLwjGsSNT',
  region: 'eu-west-2', // Replace with your desired AWS region
});

// Create a new instance of the Rekognition service
const rekognition = new AWS.Rekognition();

// Load the image from a local file (change the path to your image)
const imageBuffer = fs.readFileSync('images/image1.jpg');

// Define the parameters for the DetectLabels operation
const params: AWS.Rekognition.DetectLabelsRequest = {
  Image: {
    Bytes: imageBuffer,
  },
  MaxLabels: 10, // Adjust as needed
};

// Call the DetectLabels operation
rekognition.detectLabels(params, (err, data) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Labels detected:', JSON.stringify(data.Labels, null, 2));
  }
});
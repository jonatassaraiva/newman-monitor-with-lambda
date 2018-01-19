'use strict';

//
// envirements
require('dotenv').config();

// const dynamodb = require('dynamodb')
// dynamodb.AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });

//
// requere handler
const handler = require('../src/handler');

const _callback = (err, data) => {
  if (err) {
    console.error(err);
  }

  console.log(data);
}

handler.runner({}, {}, _callback);
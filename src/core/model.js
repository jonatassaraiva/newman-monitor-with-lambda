'use strict';

var dynamoose = require('dynamoose');

const NewmanMonitorSchema = new dynamoose.Schema({
  name: {
    type: String,
    hashKey: true
  },
  executionTime: {
    type: Date,
    rangeKey: true,
    index: true
  },
  method: String,
  url: String,
  statusCode: Number,
  responseTimeInMilliseconds: Number,
  sizeInBytes: Number,
}, {
  useDocumentTypes: true,
  useNativeBooleans: true
});

const NewmanMonitorModel = dynamoose.model('newman-monitor', NewmanMonitorSchema, { update: true });


module.exports = NewmanMonitorModel;
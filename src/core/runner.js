'use strict';

const newman = require('newman');
const Promise = require('bluebird');

const runner = {
  run() {
    return new Promise((resolve, reject) => {
      const dataRequests = [];
      newman.run({
        collection: require('../data/collection.json'),
        reporters: 'cli'
      }, function (err, summary) {
        if (err) {
          return reject(err);
        }

        const dataResult = {
          stats: summary.run.stats,
          requests: dataRequests
        }
        return resolve(dataResult);
      })
      .on('request', (err, request) => {
        if (err) { 
          return; 
        }

        const data = {
          name: request.item.name,
          method: request.request.method,
          url: request.request.url.toString(),
          statusCode: request.response.code,
          responseTimeInMilliseconds: request.response.responseTime,
          sizeInBytes: request.response.size().total,
          executionTime: new Date()
        };

        dataRequests.push(data);
      });
    })
  }
};

module.exports = runner;
'use strict';

const newman = require('newman');
const Promise = require('bluebird');

const repository = require('./repository');

const runner = {
  run() {
    return new Promise((resolve, reject) => {
      const dataRequests = [];
      newman.run({
        collection: require('../data/collection.json'),
        reporters: 'cli'
      }, function (err) {
        if (err) {
          return reject(err);
        }

        repository.batchCreate(dataRequests)
          .then(results => {
            return resolve(results);
          })
          .catch(err => {
            return reject(err);
          });
      })
        .on('request', (err, request) => {
          if (err) {
            return;
          }

          const data = {
            name: request.item.name,
            executionTime: new Date(),
            method: request.request.method,
            url: request.request.url.toString(),
            statusCode: request.response.code,
            responseTimeInMilliseconds: request.response.responseTime,
            sizeInBytes: request.response.size().total
          };

          dataRequests.push(data);
        });
    })
  }
};

module.exports = runner;
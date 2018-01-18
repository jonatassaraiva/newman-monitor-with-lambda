'use strict';

const newman = require('newman');
const Promise = require('bluebird');

const runner = {
  run() {
    return new Promise((resolve, reject) => {
      newman.run({
        collection: require('../data/collection.json'),
        reporters: 'cli'
      }, function (err, summary) {
        if (err) {
          return reject(err);
        }

        return resolve(summary);
      });
    })
  }
};

module.exports = runner;
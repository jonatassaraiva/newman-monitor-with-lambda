'use strict';

//
// handler runner
const runner = require('./core/runner');
module.exports.runner = (event, context, callback) => {
  runner.run()
    .then(summary => {
      callback(null, summary);
    })
    .catch(err => {
      callback(err, null);
    })
};
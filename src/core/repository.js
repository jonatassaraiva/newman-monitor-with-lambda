'use strict';

const moment = require('moment');

const NewmanMonitorModel = require('./model');

const newmanMonitorRepository = {
  batchCreate(items) {
    return new Promise((resolve, reject) => {
      //const newmanMonitorModel = new  NewmanMonitorModel();
      NewmanMonitorModel.batchPut(items, (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      });
    });
  },
  getRequestInTheLastHour() {
    const currentDateInTheLastHour = moment().add(-1, 'hour')

    return new Promise((resolve, reject) => {
      NewmanMonitorModel.scan()
        .where('executionTime')
        .ge(currentDateInTheLastHour.toDate().getTime())
        .exec((err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        });
    });

  }
};

module.exports = newmanMonitorRepository;

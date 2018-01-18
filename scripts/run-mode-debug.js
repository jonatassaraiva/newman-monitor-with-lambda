'use strict';

//
// requere handler
const handler = require('../src/handler');

const _callback = (err, data) => {
  if (err) {
    console.error(err);
  }

  console.log(data);
}

handler.runner({ }, { }, _callback);
'use strict';

const app = require('APP');
//creates env so the database forces true
function setUp(){
  return app.env.IS_TESTING = true;
}

function tearDown(){
  return app.env.IS_TESTING = false;
}

module.exports = {setUp, tearDown};

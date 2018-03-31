'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const { setUp }= require('APP/db/models/tests/setupFunctions');

function makeApp(url, handler) {
	const app = express();
	app.use(bodyParser.json());
	app.post(url, handler);
	return app;
}

module.exports = { makeApp, setUp };

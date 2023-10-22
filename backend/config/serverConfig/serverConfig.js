const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ssr = require('../../middleware/ssr');
const sessionConfig = require('../sessionConfig/sessionConfig');



const serverConfig = (app) => {
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..','..', 'public')));
app.use(ssr);
app.use(cookieParser());
app.use(session(sessionConfig));
}

module.exports = serverConfig
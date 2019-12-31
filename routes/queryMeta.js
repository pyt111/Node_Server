const express = require('express');
const router = express.Router();
const multer = require('multer');//引入multer

const upload = multer({dest:'uploads/'}).array("file");
// const ConfigurationJson = require('../json/Configuration.json')


const MONGODB_BASE_URL = require('../config').MONGODB_BASE_URL;
console.log('MONGODB_BASE_URL', MONGODB_BASE_URL);

router.get('/', async (request, response, next) => {
    console.log('/', request, response);
    response.json({})
    // next();
});

router.use('/uploadFile', (request, response, next) => {
    console.log('/', request, response);
    debugger
    let ret = {};
    ret['code'] = 20000;
    response.send(ret)
    // next();
});
module.exports = router;

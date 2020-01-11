const express = require('express');
const router = express.Router();
const path = require('path');
const nginxUrl = require('config').NGINX_URL;

const getStaticPath = require('../util/index').getStaticPath();


function vue_static_path() {
  return path.join(__dirname, getStaticPath, 'vue-webapp')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {
    status:0,
    errno:100,
    data:'111111111'
  };

  res.sendFile(nginxUrl);
  // res.json(data)
  // res.render('index', { title: 'Express' });
});

module.exports = router;

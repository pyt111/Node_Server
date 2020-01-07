const express = require('express');
const router = express.Router();

const getStaticPath = require('../util/index').getStaticPath();


/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {
    status:0,
    errno:100,
    data:'111111111'
  };

  res.sendFile(`${getStaticPath}/vue-webapp/index.html`);
  // res.json(data)
  // res.render('index', { title: 'Express' });
});

module.exports = router;

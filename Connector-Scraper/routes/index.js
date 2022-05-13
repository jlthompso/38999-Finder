var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

const browser = puppeteer.launch();

/* GET home page. */
router.get('/:partNum', function(req, res, next) {
  let partNum = req.params.partNum;

  res.send(partNum);
});

module.exports = router;

var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

let browser = null;

/* GET home page. */
router.get('/:partNum', async function(req, res, next) {
  let partNum = req.params.partNum;

  if (!browser) browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();
  await page.goto('https://www.digikey.com/en/products/filter/circular-connectors/436');
  const searchBox = 'text[data-testid="search-input"]';
  await page.waitForSelector('.jss278', {visible: true});
  await page.$('.jss278', (el, value) => el.value = value, partNum);
  //await page.$eval('input[name=search]', (el, value) => el.value = value, myLocalValue);
  //await page.waitForSelector(searchBox);
  //await page.$(searchBox, (el, value) => el.value = value, partNum);
  //const searchButton = 'button[data-testid="search-input-submit"]';
  //page.click(searchButton);

  //await page.close();

  res.send(partNum);
});

module.exports = router;

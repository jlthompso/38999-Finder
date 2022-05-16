var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

let browser = null;
let context = null;
const headless = true;  // set false to view browser during search

/* GET home page. */
router.get('/:partNum', async function(req, res, next) {
  const partNum = req.params.partNum;

  if (!browser) {
    browser = await puppeteer.launch({headless: headless});
    context = await browser.createIncognitoBrowserContext();
  }

  const page = await context.newPage();

  // digi-key part search
  await page.goto('https://www.digikey.com/en/products/filter/circular-connectors/436');
  const searchInputSel = 'input[data-testid="search-input"]';
  await page.waitForSelector(searchInputSel, {visible: true});
  await page.type(searchInputSel, partNum);
  const searchButtonSel = 'button[data-testid="search-input-submit"]';
  await page.click(searchButtonSel);
  await page.waitForNavigation();

  // scrape search results
  const numResultsSel = 'span[data-testid="product-count"]';
  const element = await page.waitForSelector(numResultsSel, {visible: true});
  const value = await element.evaluate(el => el.textContent);

  await page.close();

  res.send(value);
});

module.exports = router;

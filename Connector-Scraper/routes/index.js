var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

let browser = null;
let context = null;
const headless = true;  // set false to view browser during search

/* GET home page. */
router.get('/:partNum', async function(req, res, next) {
  const partNum = req.params.partNum;
  let results = null;

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
  const numResults = await element.evaluate(el => el.textContent);

  if (numResults) {
    results = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('tr[data-testid="data-table-0-row"]'))
      return tds.map(td => {
        const qtyAvailable = Number(td.querySelector('[data-atag="tr-qtyAvailable"] div').innerHTML.split(/\s*(?:-|$)\s*/)[0]);
        const unitPrice = Number(td.querySelector('[data-atag="tr-unitPrice"] div').innerHTML.slice(1));
        const vendorPartNum = td.querySelector('[data-atag="tr-dkProducts"] div').innerHTML;
        const mfgPartNum = td.querySelector('a[data-testid="data-table-0-product-number"]').innerHTML;
        const partLink = td.querySelector('a[data-testid="data-table-0-product-number"]').href;

        return qtyAvailable ? {qtyAvailable, unitPrice, vendorPartNum, mfgPartNum, partLink} : null;
      })
    });
  }

  await page.close();

  res.send(JSON.stringify(results.filter(Boolean)));
});

module.exports = router;

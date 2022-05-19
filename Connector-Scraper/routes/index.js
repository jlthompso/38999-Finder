var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

let browser = null;
let context = null;
const headless = true;  // set false to view browser during search

/* GET home page. */
router.get('/:partNum', async function(req, res, next) {
  let cancelRequest = false;
  req.on('abort', function (err) {
    cancelRequest = true;
  })

  const partNum = req.params.partNum;
  let results = null;

  if (!browser) {
    browser = await puppeteer.launch({headless: headless});
    context = await browser.createIncognitoBrowserContext();
  }

  const page = await context.newPage(); 

  // digi-key part search
  await page.goto('https://www.digikey.com/en/products/filter/circular-connectors/436', {waitUntil: 'load', timeout: 120000});
  const searchInputSel = 'input[data-testid="search-input"]';
  await page.type(searchInputSel, partNum);
  const searchButtonSel = 'button[data-testid="search-input-submit"]';
  await page.click(searchButtonSel);
  await page.waitForNavigation();

  // scrape search results
  const numResults = await page.evaluate(() => {
    const numResultsSel = 'span[data-testid="product-count"]';
    return document.querySelector(numResultsSel) ? Number(document.querySelector(numResultsSel).innerHTML) : null;
  });
  

  if (numResults) {
    results = await page.evaluate(partNum => {
      const tds = Array.from(document.querySelectorAll('tr[data-testid="data-table-0-row"]'))
      return tds.map(td => {
        const vendor = "Digi-Key";
        const qty = Number(td.querySelector('[data-atag="tr-qtyAvailable"] div').innerHTML.split(/\s*(?:-|$)\s*/)[0]);
        const price = Number(td.querySelector('[data-atag="tr-unitPrice"] div').innerHTML.slice(1));
        const id = td.querySelector('[data-atag="tr-dkProducts"] div').innerHTML;
        const mfgPartNum = td.querySelector('a[data-testid="data-table-0-product-number"]').innerHTML;
        const link = td.querySelector('a[data-testid="data-table-0-product-number"]').href;
        const mfgr = td.querySelector('[data-atag="tr-manufacturer"]').innerHTML;

        return (qty && partNum.toUpperCase() == mfgPartNum.toUpperCase()) ? {qty, price, id, partNum: mfgPartNum, link, vendor, mfgr} : null;
      })
    }, partNum);
  }

  await page.close();

  res.send((!cancelRequest && results) ? JSON.stringify(results.filter(Boolean)) : "[]");
});

module.exports = router;

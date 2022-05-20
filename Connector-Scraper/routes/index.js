var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

let browser = null;
let context = null;
const headless = false;  // set false to view browser during search

/* Search PEI-Genesis for parts. */
router.get('/peigenesis/:partNum', async function(req, res, next) {
  const partNum = req.params.partNum;
  let results = null;

  if (!browser) {
    browser = await puppeteer.launch({headless: headless});
    context = await browser.createIncognitoBrowserContext();
  }

  const page = await context.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36');
  await page.goto(`https://www.peigenesis.com/en/shop/f/${partNum.replace('/', '')}.html`, {waitUntil: 'load', timeout: 120000});


  const numResults = await page.evaluate(() => {  
    const numResultsSel = '#pagination_header';
    return document.querySelector(numResultsSel) ? Number(document.querySelector(numResultsSel).innerHTML.split('(')[1].split(' ')[0]) : null;
  });

  if (numResults) {
    results = await page.evaluate(partNum => {
      const divs = Array.from(document.querySelectorAll('.shop-listing-wrapper'))
      return divs.map(div => {
        const vendor = "PEI-Genesis";
        const qty = Number(div.querySelector('.fieldvalue_available').innerHTML);
        const price = Number(div.querySelector('div.price').textContent.split('$')[1]);
        const id = div.querySelector('.part-number p a').id.split('-')[1];
        const mfgPartNum = div.querySelector('.part-number p a').innerHTML;
        const link = div.querySelector('.part-number p a').href;
        const mfgr = div.querySelector('.part-number p').innerHTML.split('<br>')[1];

        return (qty && partNum.toUpperCase() == mfgPartNum.toUpperCase()) ? {qty, price, id, partNum: mfgPartNum, link, vendor, mfgr} : null;
      })
    }, partNum);
  }

  await page.close();

  res.send(results ? JSON.stringify(results.filter(Boolean)) : "[]");
});

/* Search Digi-Key for parts. */
router.get('/digikey/:partNum', async function(req, res, next) {
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

import fetchJsonp from 'fetch-jsonp';

export async function search(partNum) {
  const results = [];

  const url = `https://api.element14.com/catalog/products?` +
              `versionNumber=1.2` +
              `&term=manuPartNum%3A${encodeURIComponent(partNum)}` +
              `&storeInfo.id=www.newark.com` +
              `&resultsSettings.refinements.filters=inStock` +
              `&resultsSettings.responseGroup=medium` +
              `&callInfo.callback=getSearchResults` +
              `&callInfo.responseDataFormat=json` +
              `&callinfo.apiKey=${process.env.REACT_APP_NEWARK_API_KEY}`;


  fetchJsonp(url, {jsonpCallbackFunction: 'getSearchResults'})
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    if (json.hasOwnProperty('manufacturerPartNumberSearchReturn')
      && json.hasOwnProperty('prices')
      && json.manufacturerPartNumberSearchReturn.numberOfResults) {
      json.manufacturerPartNumberSearchReturn.products.forEach(product => {
        const vendor = "Newark";
        const qty = product.stock.level;
        const price = `$${product.prices[0].cost}`;
        const id = product.id;
        const mfgPartNum = product.translatedManufacturerPartNumber;
        const link = `https://www.newark.com/${product.sku}`;
        const mfgr = product.vendorName;
  
        if (mfgPartNum === partNum && qty > 0) results.push({vendor, qty, price, id, partNum: mfgPartNum, link, mfgr});
      });
    }
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });

  return results;
}
export default async function search(partNum) {
  const results = [];

  const version = "v1";
  const url = `https://api.mouser.com/api/${version}/search/keyword?apiKey=${process.env.REACT_APP_MOUSER_API_KEY}`;
  const body = {
    "SearchByKeywordRequest": {
      "keyword": partNum,
      "records": 50,
      "startingRecord": 0,
      "searchOptions": "InStock",
      "searchWithYourSignUpLanguage": "true"
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  json.SearchResults.Parts.forEach(product => {
    const vendor = "Mouser";
    const qty = Number(product.Availability.split(' ')[0]);
    const price = product.PriceBreaks[0].Price;
    const id = product.MouserPartNumber;
    const mfgPartNum = product.ManufacturerPartNumber;
    const link = product.ProductDetailUrl;
    const mfgr = product.Manufacturer;

    if (mfgPartNum === partNum && qty > 0) results.push({vendor, qty, price, id, partNum: mfgPartNum, link, mfgr});
  });

  return results;
}
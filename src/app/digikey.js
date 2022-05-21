export function getAuthCode() {
  const authEndpoint = 'https://api.digikey.com/v1/oauth2/authorize';
  const response_type = 'code';
  const client_id = process.env.REACT_APP_DK_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_OAUTH_REDIRECT;
  const authUrl = `${authEndpoint}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  window.location = authUrl;
}

export async function getAccessToken(code) {
  const tokenEndpoint = 'https://api.digikey.com/v1/oauth2/token';
  const client_id = process.env.REACT_APP_DK_CLIENT_ID;
  const client_secret = process.env.REACT_APP_DK_CLIENT_SECRET;
  const redirect_uri = process.env.REACT_APP_OAUTH_REDIRECT;
  const grant_type = 'authorization_code';
  const data = {code, client_id, client_secret, redirect_uri, grant_type};
  const body = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  });

  const json = await response.json();

  return json;
}

export async function search(token, partNum) {
  const results = [];

  const url = 'https://api.digikey.com/Search/v3/Products/Keyword';
  const client_id = process.env.REACT_APP_DK_CLIENT_ID;
  const body = {
    "Keywords": partNum,
    "RecordCount": 50,
    "RecordStartPosition": 0,
    "Filters": {
      "TaxonomyIds": [],
      "ManufacturerIds": [],
      "ParametricFilters": []
    },
    "Sort": {
      "SortOption": "SortByQuantityAvailable",
      "Direction": "Descending",
      "SortParameterId": 0
    },
    "RequestedQuantity": 1,
    "SearchOptions": [
      "ManufacturerPartSearch",
      "InStock"
    ],
    "ExcludeMarketPlaceProducts": false
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-DIGIKEY-Client-Id': client_id
    },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  json.Products.forEach(product => {
    const vendor = "Digi-Key";
    const qty = product.QuantityAvailable;
    const price = product.UnitPrice;
    const id = product.DigiKeyPartNumber;
    const mfgPartNum = product.ManufacturerPartNumber;
    const link = product.ProductUrl;
    const mfgr = product.Manufacturer.Value;

    if (mfgPartNum === partNum) results.push({vendor, qty, price, id, partNum: mfgPartNum, link, mfgr});
  });

  return results;
}
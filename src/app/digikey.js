export function getAuthCode() {
  const authEndpoint = process.env.REACT_APP_DK_AUTH_ENDPOINT;
  const response_type = 'code';
  const client_id = process.env.REACT_APP_DK_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_OAUTH_REDIRECT;
  const authUrl = `${authEndpoint}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  window.location = authUrl;
}

export async function getAccessToken(code) {
  const tokenEndpoint = process.env.REACT_APP_DK_TOKEN_ENDPOINT;
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

  const url = process.env.REACT_APP_DK_SEARCH;
  const client_id = process.env.REACT_APP_DK_CLIENT_ID;
  const body = {
    "Keywords": partNum,
    "RecordCount": 10,
    "RecordStartPosition": 0,
    "Filters": {
      "TaxonomyIds": [
        0
      ],
      "ManufacturerIds": [
        0
      ],
      "ParametricFilters": [
        {
          "ParameterId": 1989,
          "ValueId": "0"
        }
      ]
    },
    "Sort": {
      "SortOption": "SortByDigiKeyPartNumber",
      "Direction": "Ascending",
      "SortParameterId": 0
    },
    "RequestedQuantity": 0,
    "SearchOptions": [
      "ManufacturerPartSearch"
    ],
    "ExcludeMarketPlaceProducts": true
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
  console.log(json);
  json.Products.forEach(product => {
    const vendor = "Digi-Key";
    const qty = product.QuantityAvailable;
    const price = product.UnitPrice;
    const id = product.DigiKeyPartNumber;
    const mfgPartNum = product.ManufacturerPartNumber;
    const link = `https://www.digikey.com${product.ProductUrl}`;
    const mfgr = product.Manufacturer.Value;

    results.push({vendor, qty, price, id, partNum: mfgPartNum, link, mfgr});
  });

  return results;
}
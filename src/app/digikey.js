export async function getAuthCode() {
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

  return response.json();
}
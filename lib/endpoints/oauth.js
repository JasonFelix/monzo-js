const Endpoint = require('./endpoint');

module.exports = class OAuth {

  static createLink(clientId, redirectURI, _token) {
    const crypto = require('crypto');
    const token = (_token || crypto.randomBytes(32)).toString('hex');
    const encodedURI = encodeURIComponent(redirectURI);
    const url = `https://auth.getmondo.co.uk/?client_id=${clientId}&redirect_uri=${encodedURI}&response_type=code&state=${token}`
    return { url, token };
  }

  static async usingAuthCode(clientId, clientSecret, redirectURI, authCode) {
    const endpoint = new Endpoint(null, 'oauth2');

    const data = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectURI,
      code: authCode
    };
    return (await endpoint.post('token', data)).data;
  }

  static async usingPassword(clientId, username, password) {
    const endpoint = new Endpoint(null, 'oauth2');

    const data = {
      grant_type: 'password',
      client_id: clientId,
      username: username,
      password: password,
    };
    return (await endpoint.post('token', data)).data;
  }

  static async usingClientCredentials(clientId, clientSecret) {
    const endpoint = new Endpoint(null, 'oauth2');

    const data = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    };
    return (await endpoint.post('token', data)).data;
  }

  static async refreshToken(clientId, clientSecret, refreshToken) {
    const endpoint = new Endpoint(null, 'oauth2');

    const data = {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refreshToken: refreshToken,
    };
    return (await endpoint.post('token', data)).data;
  }

}

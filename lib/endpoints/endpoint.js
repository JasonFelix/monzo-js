const { HOST, BASE, PING, OAUTH2, ACCOUNTS, POTS, BALANCE, TRANSACTIONS, FEED, WEBHOOKS, ATTACHMENT } = require('./endpoints');
const axios = require('axios');
const querystring = require('querystring');

module.exports = class Endpoint {

  constructor(client, endpointName) {
    this.endpointName = endpointName.toUpperCase();

    if (!['base', 'oauth'].includes(endpointName) && client === undefined) {
      throw new Error(`[${endpointName.toUpperCase()}] Client must be defined.`);
    }

    this._client = client;
  }

  async get(query = '') {
    try {
      return await axios.get(this.endpoint + query, this._headers);
    } catch (err) {
      // console.log(err);
      throw new Error(`${err.response.status} error: GET ${this.endpoint + query} -> ${this._statuses[err.response.status]}`);
    }
  }

  async post(query = '', data = {}) {
    try {
      return await axios.post(this.endpoint + query,  querystring.stringify(data), this._headers);
    } catch (err) {
      throw new Error(`${err.response.status} error: POST ${this.endpoint + query} -> ${this._statuses[err.response.status]}`);
    }
  }

  async patch(query = '', data = {}) {
    try {
      return await axios.patch(this.endpoint + query, querystring.stringify(data), this._headers);
    } catch (err) {
      throw new Error(`${err.response.status} error: PATCH ${this.endpoint + query} -> ${this._statuses[err.response.status]}`);
    }
  }

  async delete(query = '') {
    try {
      return await axios.patch(this.endpoint + query, this._headers);
    } catch (err) {
      throw new Error(`${err.response.status} error: DELETE ${this.endpoint + query} -> ${this._statuses[err.response.status]}`);
    }
  }

  get endpoint() {
    const endpoint = this.endpointName;
    const endpoints = { BASE, PING, OAUTH2, ACCOUNTS, POTS, BALANCE, TRANSACTIONS, FEED, WEBHOOKS, ATTACHMENT };
    if (endpoints[endpoint] !== undefined) {
      return HOST + (endpoints[endpoint]);
    } else {
      throw new Error(`'${this.endpointName}' is an invalid endpoint.`);
    }
  }

  get _headers() {
    if (this._client) {
      return this._client.headers;
    }
    return {};
  }

  /**
   * @see https://monzo.com/docs/#errors
   * @private
   */
  get _statuses() {
    return {
      200: 'All is well.',
      400: 'Your request has missing arguments or is malformed.',
      401: 'Your request is not authenticated.',
      403: 'Your request is authenticated but has insufficient permissions.',
      404: 'The endpoint requested does not exist.',
      405: 'You are using an incorrect HTTP verb. Double check whether it should be POST/GET/DELETE/etc.',
      406: 'Your application does not accept the content format returned according to the Accept headers sent in the request.',
      429: 'Your application is exceeding its rate limit. Back off, buddy. :p',
      500: 'Something is wrong on our end. Whoopsie.',
      504: 'Something has timed out on our end. Whoopsie.',
    }
  }

}

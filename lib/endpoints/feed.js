const Endpoint = require('./endpoint');

module.exports = class Feed extends Endpoint {

  constructor(client) {
    super(client, 'feed');
  }

  async createItem(accountId, title, imageUrl, url, optionalParams) {
    if (!accountId) {
      throw new Error('Must provide a accountId to create a Feed Item.');
    }
    if (!title) {
      throw new Error('Must provide a title to create a Feed Item.');
    }
    if (!imageUrl) {
      throw new Error('Must provide a imageUrl to create a Feed Item.');
    }

    const params = {};

    const item = {
      account_id: accountId,
      type: 'basic',
      'params[title]': title,
      'params[image_url]': imageUrl,
      ...params,
    }

    if (url) {
      item.url = url;
    }

    return await this.post('', item);
  }

  async query(accountId, startTime) {
    const querystring = require('querystring');
    const query = { account_id: accountId };
    if (startTime) {
      query.start_time = startTime;
    }
    return await this.get(`?${querystring.stringify(query)}`);
  }

}

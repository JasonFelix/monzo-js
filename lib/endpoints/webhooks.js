const Endpoint = require('./endpoint');
const Webhook = require('../models/webhook');

/**
* A Wrapper for the Webhooks endpoint.
* @see https://monzo.com/docs#webhooks
*/
module.exports = class Webhooks extends Endpoint {

  /**
   * Creates an instance of Webhooks.
   * @param {Monzo} client - An instance of the Monzo client.
   */
  constructor(client, accountId) {
    super(client, 'webhooks');

    /**
     * An instance of the Monzo client.
     * @type {Monzo}
     * @private
     */
    this.client = client;

    /**
     * An account Id.
     * @type {string}
     * @private
     */
    this._accountId = accountId;
  }

  /**
   * Get all of the user's Webhooks.
   * @return {Map<Webhook>}
   */
  async all() {
    try {
      const res = await this.get(`?account_id=${this._accountId}`);
      const webhooks = new Map();
      for (const webhook of res.data.webhooks) {
        webhooks.set(webhook.id, new Webhook(webhook));
      }
      return webhooks;
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * Find webhook with a specific Id.
   * @param {string} webhookId The Id of the webhook to find.
   * @return {Webhook}
   */
  async find(webhookId) {
    try {
      const webhooks = await this.all();
      for (const [id, webhook] of webhooks) {
        if (id === webhookId) {
          return webhook;
        }
      }
      return null;
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * Register a webhook.
   * @param {string} url The url to register the webhook to.
   * @return {Webhook}
   */
  async register(url) {
    try {
      data = { account_id: this._accountId, url: url };
      return new Webhook(await this.post('', data));
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  /**
   * Delete a webhook.
   * @param {string} webhookId The id of the webhook to be deleted.
   * @return {boolean}
   */
  async delete(webhookId) {
    try {
      return (await this.delete(`${webhookId}`)).status === 200;
    } catch (err) {
      console.log(err);
    }
    return false;
  }

}

/**
 * The Webhook wrapper class.
 * @see https://monzo.com/docs/#webhooks
 */
module.exports = class Webhook {

  /**
   * Creates an instance of Webhook.
   * @param {JSON} webhook - The unwrapped webhook.
   */
  constructor(webhook) {
    /**
     * The unwrapped webhook json.
     * @type {string}
     * @private
     */
    this._webhook = webhook;
  }

  /**
   * @return {string} The pot's Id.
   */
  get id() {
    return this._webhook.id;
  }

  /**
   * @return {string} The webhooks's Id.
   */
  get accountId() {
    return this._webhook.account_id;
  }

  /**
   * @return {string} The webhooks's URL.
   */
  get url() {
    return this._webhook.url;
  }
}

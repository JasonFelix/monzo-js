/**
 * The MetaData wrapper class.
 * @see https://monzo.com/docs/#annotate-transaction
 */
module.exports = class Metadata {

  constructor(client, transaction) {
    /**
     * An instance of the Monzo client.
     * @type {Monzo}
     * @private
     */
    this._client = client;

    /**
     * The transaction's Id.
     * @type {Transaction}
     * @private
     */
    this._transaction = transaction;

    /**
     * Set the meta data
     * @type {JSON}
     * @private
     */
    this._transaction = transaction;
  }

  async annotate(data) {
    try {
      const Endpoint = require('../endpoints/endpoint');
      const endpoint = new Endpoint(this._client, 'transactions');

      const querystring = require('querystring');
      return (await endpoint.patch('${this._transaction.id}', querystring.stringify(data))).data;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  async add(data) {
    return await this.annotate(data);
  }

  async remove(...keys) {
    data = {};
    for (const k in keys) {
      data[k] = '';
    }
    return await this.annotate(data);
  }

  async delete(keys) {
    await this.remove(keys);
  }

  async removeAll() {
    const keys = {};
    for (const [k, _] of this._metadata) {
      keys[k] = '';
    }
    return await this.remove(keys);
  }

  get(key) {
    if (key) {
      return this._metadata[key];
    }
    return this._metadata;
  }

}

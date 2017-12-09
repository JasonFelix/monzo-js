const Endpoint = require('./endpoint');
const Transaction = require('../models/transaction');

/**
 * The Transactions class is used to find transactions.
 * @see https://monzo.com/docs/#transactions
 */
module.exports = class Transactions extends Endpoint {

  /**
   * Creates an instance of Accounts.
   * @param {Monzo} client - An instance of the Monzo client.
   * @param {string} accountId - An account Id.
   */
  constructor(client, accountId) {
    super(client, 'transactions');
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

    /**
     * Validate the account Id.
     */
    this._accountIdValidation();
  }

  /**
   * Find a specific transaction.
   * @param {string} transactionId - An instance of the Monzo client.
   * @return {Transaction} The transaction if found.
   */
  async find(transactionId) {
    try {
      return new Transaction(this._client, (await this.get(`${transactionId}?account_id=${this._accountId}`)).data.transaction);
    } catch (err) {
      console.log(err.message);
    }
    return null;
  }

  /**
   * Query the transactions endpoint.
   * @param {JSON} config - example: {since: '2016-01-01T01:45:29.54Z', before: '2017-10-01T01:45:29.54Z', limit: 100}.
   * Dates must be RFC 3339
   * @return {Map<Transaction>} The transactions found.
   */
  async query(config = undefined) {
    try {
      const res = (await this.get(`?account_id=${this._accountId}&${this._buildConfig(config)}`)).data.transactions;
      const transactions = new Map();
      for (const t of res) {
        transactions.set(t.id, new Transaction(this._client, t));
      }
      return transactions;
    } catch (err) {
      console.log(err.message);
    }
    return null;
  }

  /**
   * Get all transactions.
   * @return {Map<Transaction>} All transactions.
   */
  async all() {
    return await this.query();
  }

  /**
   * Find transactions since date or transaction.
   * @param {string} since - Can be a date (RFC 3339) ex: 2009-11-10T23:00:00Z or transaction id ex: 'tx_00008zhJ3kE6c8kmsGUKgn.
   * @return {Map<Transaction>} The transactions found.
   */
  async since(since) {
    return await this.query({since: since});
  }

  /**
   * Find transactions after date or transaction.
   * An alias for @link this.since
   * @param {string} after - Can be a date (RFC 3339) ex: 2009-11-10T23:00:00Z or transaction id ex: 'tx_00008zhJ3kE6c8kmsGUKgn.
   * @return {Map<Transaction>} The transactions found.
   */
  async after(after) {
    return await this.since(after);
  }

  /**
   * Find transactions before date.
   * @param {string} before - Must be an RFC 3339 date ex: 2009-11-10T23:00:00Z.
   * @return {Map<Transaction>} The transactions found.
   */
  async before(before) {
    return await this.query({before: before});
  }

  /**
   * Find transactions between dates.
   * @param {string} since - Must be an RFC 3339 date ex: 2009-11-10T23:00:00Z.
   * @param {string} before - Must be an RFC 3339 date ex: 2009-11-10T23:00:00Z.
   * @return {Map<Transaction>} The transactions found.
   */
  async between(since, before) {
    return await this.query({since: since, before: before});
  }

  /**
   * Transforms JSON into a query string.
   * @param {JSON} config - JSON to transform.
   * @return {string} A query string.
   */
  _buildConfig(config) {
    const querystring = require('querystring');
    return querystring.stringify(config);
  }

  /**
   * Validates the account Id.
   * @private
   */
  _accountIdValidation() {
    if (!this._accountId) throw new Error('The Account ID cannot be null');
    if (typeof this._accountId !== 'string') throw new Error('The Account ID has to be a String');
    if (!typeof this._accountId.startsWith('acc_')) throw new Error('The Account ID must start with acc_');
  }

}

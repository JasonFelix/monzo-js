/** @ignore */
const Endpoint = require('./endpoint');
const Account = require('../models/account');
const Balance = require('../models/balance');

/**
 * The Accounts class is used to find accounts.
 * @see https://monzo.com/docs/#accounts
 */
module.exports = class Accounts extends Endpoint {

  /**
   * Creates an instance of Accounts.
   * @param {Monzo} client - An instance of the Monzo client.
   */
  constructor(client) {
    super(client, 'accounts');
    /**
     * An instance of the Monzo client.
     * @type {Monzo}
     * @private
     */
    this.client = client;
  }

  /**
   * Get all of user's accounts.
   * @type {Map<Account>}
   */
  async all(withBalance = true) {
    const res = (await this.get()).data;

    const accounts = new Map();
    for (const acc of res.accounts) {
      if (withBalance) {
        const balance = await Balance.fetch(this.client, acc.id);
        accounts.set(acc.id, new Account(this.client, acc, balance));
      } else {
        accounts.set(acc.id, new Account(this.client, acc));
      }
    }
    return accounts;
  }

  /**
   * Get a specific Account.
   * @param {string} accountId - The Id of the account to find.
   * @param {boolean} withBalance - fetch the balance with the account.
   * @type {Account}
   */
  async find(accountId, withBalance = true) {
    const accounts = await this.all(withBalance);
    return accounts.get(accountId);
  }

}

/**
 * The Balance wrapper class.
 * @see https://monzo.com/docs/#balance
 */
module.exports = class Balance {

  /**
   * Creates an instance of Balance.
   * @param {JSON} balance - The unwrapped balance.
   */
  constructor(balance) {
    /**
     * The unwrapped balance.
     * @type {JSON}
     * @private
     */
    this._balance = balance;
  }

  /**
   * Fetch the balance.
   * @param {Monzo} client - An instance of the Monzo client.
   * @param {string} accountId - The id of the account.
   * @return {Balance} The balance fetched.
   */
  static async fetch(client, accountId) {
    const Endpoint = require('../endpoints/endpoint');
    const endpoint = new Endpoint(client, 'balance');

    if (!accountId) throw new Error('The account ID cannot be null');
    if (typeof accountId !== 'string') throw new Error('The account ID has to be a String');
    if (!accountId.startsWith('acc_')) throw new Error('The transaction id must start with acc_');

    try {
      return new Balance((await endpoint.get(`?account_id=${accountId}`)).data);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @return {number} The balance in the account.
   */
  get amount() {
    return this._balance.balance;
  }

  /**
   * @link this.amount()
   * @return {number} The balance in the account.
   */
  get balance() {
    return this.balance();
  }

  /**
   * @return {number} The total amount in the account.
   */
  get totalAmount() {
    return this._balance.total_balance;
  }

  /**
   * @link this.totalAmount()
   * @return {number} The total balance in the account.
   */
  get totalBalance() {
    return this.totalAmount();
  }

  /**
   * @return {number} The currency of the account.
   */
  get currency() {
    return this._balance.currency;
  }

  /**
   * @return {number} The amount spent today.
   */
  get spendToday() {
    return this._balance.spend_today;
  }

  /**
   * @link this.spendToday()
   * @return {number} The amount spent today.
   */
  get spentToday() {
    return this.spentToday();
  }

  /**
   * @return {number} The local currency.
   */
  get localCurrency() {
    return this._balance.local_currency;
  }

  /**
   * @return {number} The local exchange rate.
   */
  get localExchangeRate() {
    return this._balance.local_exchange_rate;
  }

  /**
   * @return {number} The amount spent locally.
   */
  get localSpend() {
    return this._balance.local_spend;
  }

}

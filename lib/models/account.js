const Transactions = require('../endpoints/transactions');
const Webhooks = require('../endpoints/webhooks');
const Balance = require('./balance');

/**
 * The Account class is a wrapper for monzo accounts.
 * @see https://monzo.com/docs/#accounts
 */
module.exports = class Account {

  /**
   * Creates an instance of Account.
   * @param {Monzo} client - An instance of the Monzo client.
   * @param {JSON} account - The unwrapped data of the account.
   * @param {Balance} balance - The account's balance.
   */
  constructor(client, account, balance) {
    /**
     * An instance of the Monzo client.
     * @type {Monzo}
     * @private
     */
    this._client = client;

    /**
     * The unwrapped data of the account.
     * @type {JSON}
     * @private
     */
    this._account = account;

    /**
     * Balance - the account's balance.
     * @type {Balance}
     * @private
     */
    this._balance = balance;

    /**
     * An instance of the accounts transactions.
     * @type {Transactions}
     * @private
     */
    this._transactions = new Transactions(this._client, this._account.id);

    /**
    * Webhooks instance for access to accounts functions.
    * @type {Webhooks}
    * @public
    */
    this.webhooks = new Webhooks(this._client, this._account.id);
  }

  async createFeedItem(title, imageUrl, url, optionalParams) {
    return await this._client.feed.createItem(this.id, title, imageUrl, url, optionalParams);
  }

  /**
   * @return {JSON} the unwrapped transactions JSON.
   */
  get transactions() {
    return this._transactions;
  }

  /**
   * @return {string} The account's Id.
   */
  get id() {
    return this._account.id;
  }

  /**
   * @return {date} The date that the account was created.
   */
  get createdAt() {
    return this._account.created;
  }

  /**
   * @return {string} The names on the account.
   */
  get description() {
    return this._account.description;
  }

  /**
   * @return {number} The account's number.
   */
  get accountNumber() {
    return this._account.account_number;
  }

  /**
   * @link this.accountNumber()
   * @return {number} The account's number.
   */
  get number() {
    return this._account.accountNumber();
  }

  /**
   * @return {string} The account's sort code.
   */
  get sortCode() {
    return this._account.sort_code;
  }

  /**
   * @return {string} Whether or not the account is retail or prepaid.
   */
  get type() {
    return this._account.type;
  }

  /**
   * @return {boolean} True if the account is a retail account.
   */
  get isRetail() {
    return this.type.endsWith('retail');
  }

  /**
   * @return {boolean} True if the account is a prepaid account.
   */
  get isPrepaid() {
    return this.type.endsWith('prepaid');
  }

  /**
   * @return {number} The balance in the account.
   */
  get amount() {
    this._validateBalance();
    return this._balance.amount;
  }

  /**
   * @link this.amount()
   * @return {number} The balance in the account.
   */
  get balance() {
    this._validateBalance();
    return this.amount;
  }

  /**
   * @return {number} The total amount in the account.
   */
  get totalAmount() {
    this._validateBalance();
    return this._balance.totalAmount;
  }

  /**
   * @link this.totalAmount()
   * @return {number} The total balance in the account.
   */
  get totalBalance() {
    this._validateBalance();
    return this.totalAmount;
  }

  /**
   * @return {number} The currency of the account.
   */
  get currency() {
    this._validateBalance();
    return this._balance.currency;
  }

  /**
   * @return {number} The amount spent today.
   */
  get spendToday() {
    this._validateBalance();
    return this._balance.spendToday;
  }

  /**
   * @link this.spendToday()
   * @return {number} The amount spent today.
   */
  get spentToday() {
    this._validateBalance();
    return this.spentToday;
  }

  /**
   * @return {number} The local currency.
   */
  get localCurrency() {
    this._validateBalance();
    return this._balance.localCurrency;
  }

  /**
   * @return {number} The local exchange rate.
   */
  get localExchangeRate() {
    this._validateBalance();
    return this._balance.localExchangeRate;
  }

  /**
   * @return {number} The amount spent locally.
   */
  get localSpend() {
    this._validateBalance();
    return this._balance.local_spend;
  }

  /**
   * @return {void} This synchronously updates the balance.
   */
  async updateBalance() {
    return this._balance = await Balance.fetch(this._client, this.id);
  }

  /**
   * @return {void} This checks to see if the balance is available.
   */
  _validateBalance() {
    if (!this._balance) {
      throw new Error(`Balance not available for Account ${this.id}, run updateBalance().`);
    }
  }
}

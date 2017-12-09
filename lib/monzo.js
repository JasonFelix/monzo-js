const Endpoint = require('./endpoints/endpoint');
const Accounts = require('./endpoints/accounts');
const OAuth = require('./endpoints/oauth');
const Pots = require('./endpoints/pots');
const Attachments = require('./endpoints/attachments');
const Feed = require('./endpoints/feed');
const Balance = require('./models/balance');

/**
 * The Monzo Client class.
 */
module.exports = class Monzo extends Endpoint {

  /**
   * Creates an instance of the Monzo Client.
   * @param {string} accessToken - The user's access token.
   */
  constructor(accessToken) {
    // Cannot call super with this, so null must be passed 😕.
    super(null, 'base');
    this._client = this;

    /**
    * The user's access token.
    * @type {string}
    * @private
    */
    this._accessToken = accessToken;

    /**
    * Accounts instance for access to accounts functions.
    * @type {Accounts}
    * @public
    */
    this.accounts = new Accounts(this);

    /**
    * Pots instance for access to pots functions.
    * @type {Pots}
    * @public
    */
    this.pots = new Pots(this);

    /**
    * Attachments instance for access to attachments functions.
    * @type {Attachments}
    * @public
    */
    this.attachments = new Attachments(this);

    /**
    * Feed instance for access to feed functions.
    * @type {Feed}
    * @public
    */
    this.feed = new Feed(this);
  }

  /**
  * Provide convenient access to OAuth functions.
  * @type {OAuth}
  */
  static get OAuth() {
    return OAuth;
  }

  /**
   * Get client information.
   * @return {Promise<string>} Should return 'pong' if successful.
   */
  async ping() {
    return (await this.get('ping')).data.ping;
  }

  /**
   * Get client information.
   * @return {JSON} The client information
   */
  async clientInformation() {
    return (await this.get('ping/whoami/')).data;
  }

  /**
   * Get client information.
   * @link this.clientInformation()
   * @return {JSON} The client information
   */
  async whoAmI() {
    return await this.clientInformation();
  }

  /**
   * Client headers for requests.
   * @return {string} client headers.
   */
  get headers() {
    return { headers: { 'Authorization': "Bearer " + this.accessToken } };
  }

  /**
   * Client's access token.
   * @return {string} access token.
   */
  get accessToken() {
    return this._accessToken;
  }

  /**
   * Fetch balance of an account.
   * @param {string} accountId The Id of the Account to fetch the Balance from.
   * @return {Balance} Balance of the account
   */
  async fetchBalance(accountId) {
    return await Balance.fetch(this, accountId);
  }
}

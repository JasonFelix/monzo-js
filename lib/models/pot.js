/**
 * The Pot wrapper class.
 * @see https://monzo.com/docs/#pots
 */
module.exports = class Pot {

  /**
   * Creates an instance of Pot.
   * @param {JSON} pot - The unwrapped pot.
   */
  constructor(pot) {
    /**
     * The unwrapped pot json.
     * @type {string}
     * @private
     */
    this._pot = pot;
  }

  /**
   * @return {string} The pot's Id.
   */
  get id() {
    return this._pot.id;
  }

  /**
   * @return {date} The pot's creation date.
   */
  get createdAt() {
    return this._pot.created;
  }

  /**
   * @return {date} The date the pot was last updated.
   */
  get updatedAt() {
    return this._pot.updated;
  }

  /**
   * @return {string} The name of the pot.
   */
  get name() {
    return this._pot.name;
  }

  /**
   * @return {string} The style of the pot.
   */
  get style() {
    return this._pot.style;
  }

  /**
   * @return {number} The balance in the pot.
   */
  get balance() {
    return this._pot.balance;
  }

  /**
   * @return {string} The currency in the pot.
   */
  get currency() {
    return this._pot.currency;
  }

  /**
   * @return {boolean} Whether the pot is deleted.
   */
  get deleted() {
    return this._pot.deleted;
  }
}

const Endpoint = require('./endpoint');
const Pot = require('../models/pot');

/**
* A Wrapper for the Pots endpoint.
* @see https://monzo.com/docs#pots
*/
module.exports = class Pots extends Endpoint {

  /**
   * Creates an instance of Pots.
   * @param {Monzo} client - An instance of the Monzo client.
   */
  constructor(client) {
    super(client, 'pots');
    /**
     * An instance of the Monzo client.
     * @type {Monzo}
     * @private
     */
    this._client = client;
  }

  /**
   * Get all of the user's Pots.
   * @type {Map<Pot>}
   */
  async all() {
    try {
      const res = await this.get();
      const pots = new Map();
      for (const pot of res.data.pots) {
        pots.set(pot.id, new Pot(pot));
      }
      return pots;
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * Find pot with a specific Id.
   * @param {string} potId The Id of the pot to find.
   * @type {Pot}
   */
  async find(potId) {
    try {
      const pots = await this.all();
      for (const [id, pot] of pots) {
        if (id === potId) {
          return pot;
        }
      }
      return null;
    } catch (err) {
      console.log(err.message);
    }
  }
}

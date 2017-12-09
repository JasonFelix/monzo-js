const Address = require('./address');

module.exports = class Merchant {

  constuctor(merchant) {
    this._merchant = merchant;

    this._address = new Address(this._merchant.address);
  }

  get id() {
    return this._merchant.id;
  }

  get groupId() {
    return this._merchant.group_id;
  }

  get created() {
    return this._merchant.created;
  }

  get createdAt() {
    return this.created;
  }

  get name() {
    return this._merchant.name;
  }

  get logo() {
    return this._merchant.logo;
  }

  get emoji() {
    return this._merchant.emoji;
  }

  get category() {
    return this._merchant.category;
  }

  get online() {
    return this._merchant.online;
  }

  get atm() {
    return this._merchant.atm;
  }

  get address() {
    return this._address;
  }

  get updated() {
    return this._merchant.updated;
  }

  get metadata() {
    return this._merchant.metadata;
  }

  get updatedAt() {
    return this.updated;
  }

  get feedbackDisabled() {
    return this._merchant.disable_feedback;
  }
}

module.exports = class Address {

  constructor(address) {
    this._address = address;
  }

  get shortFormat() {
    return this._address.short_formatted;
  }

  get format() {
    return this._address.formatted;
  }

  get street() {
    return this._address.street;
  }

  get address() {
    return this.street;
  }

  get city() {
    return this._address.city;
  }

  get region() {
    return this._address.region;
  }

  get country() {
    return this._address.country;
  }

  get postcode() {
    return this._address.postcode;
  }

  get latitude() {
    return this._address.latitude;
  }

  get longitude() {
    return this._address.longitude;
  }

  get coordinates() {
    return { latitude: this.latitude, longitude: this.longitude };
  }

  get zoomLevel() {
    return this._address.zoomLevel;
  }

  get approximate() {
    return this._address.approximate;
  }

}

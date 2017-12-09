/**
 * The Attachment wrapper class.
 * @see https://monzo.com/docs/#attachments
 */
module.exports = class Attachment {

  /**
   * Creates an instance of Attachment.
   * @param {JSON} attachment - The unwrapped attachment.
   */
  constructor(attachment) {
    /**
     * The unwrapped attachment json.
     * @type {string}
     * @private
     */
    this._attachment = attachment;
  }

  /**
   * @return {string} The attachment's Id.
   */
  get id() {
    return this._attachment.created;
  }

  /**
   * @return {string} The date and time the attachment was created.
   */
  get externalId() {
    return this._attachment.external_id;
  }

  /**
   * @return {string} The date and time the attachment was created.
   */
  get userId() {
    return this._attachment.user_id;
  }

  /**
   * @return {string} The date and time the attachment was created.
   */
  get url() {
    return this._attachment.url;
  }

  /**
   * @return {string} The date and time the attachment was created.
   */
  get fileUrl() {
    return this._attachment.file_url;
  }

  /**
   * @return {string} The date and time the attachment was created.
   */
  get fileType() {
    return this._attachment.file_type;
  }

  /**
   * @return {string} The date and time the attachment was created.
   */
  get type() {
    return this._attachment.type;
  }

  /**
   * @return {string} The date and time the attachment was created.
   */
  get created() {
    return this._attachment.created;
  }

  /**
   * @return {string} The date and time the attachment was created.
   */
  get createdAt() {
    return this.created;
  }
}

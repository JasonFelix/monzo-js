const Attachment = require('./attachment');
const Metadata = require('./metadata');

/**
 * The Transaction wrapper class.
 * @see https://monzo.com/docs/#transactions
 */
module.exports = class Transaction {

  /**
   * Creates an instance of Transaction.
   * @param {JSON} transaction - The unwrapped transaction.
   */
  constructor(client, transaction) {
    /**
     * The unwrapped transaction json.
     * @type {string}
     * @private
     */
    this._transaction = transaction;

    /**
     * Metadata instance for access to metadata functions.
     * @type {Metadata}
     * @public
     */
     this.metadata = new Metadata(client, this);

     // Wrap all of the attachments
     const attachments = this._transaction.attachments;
     if (attachments && attachments.length) {
       this._attachments = attachments.map((a) => new Attachment(a));
     }
  }

  /**
   * @return {string[]} A list of all valid categories.
   */
  static get CATEGORIES() {
    return ['mondo', 'general', 'eating_out', 'expenses', 'transport', 'cash', 'bills', 'entertainment', 'shopping', 'holidays', 'groceries'];
  }

  /**
   * Register an attachment to this transaction.
   * @return {Attachment} The added attachment.
   */
  registerAttachment(fileUrl, fileType) {
    this._client.attachments.register(this.id, fileUrl, fileType);
  }

  /**
   * @return {string} The transaction's Id.
   */
  get id() {
    return this._transaction.id;
  }

  /**
   * @return {string} The transaction's creation date.
   */
  get createdAt() {
    return this._transaction.created;
  }

  /**
   * @return {string} The transaction's description.
   */
  get description() {
    return this._transaction.description;
  }

  /**
   * The amount of the transaction in minor units of currency.
   * For example pennies in the case of GBP.
   * A negative amount indicates a debit (most card transactions will have a negative amount)
   * @return {number} The transaction's amount.
   */
  get amount() {
    return this._transaction.amount;
  }

  /**
   * This is only present on declined transactions!
   * Valid values are INSUFFICIENT_FUNDS, CARD_INACTIVE, CARD_BLOCKED or OTHER.
   * @return {number} The transaction's amount.
   */
  get declineReason() {
    return this._transaction.decline_reason;
  }

  /**
   * @return {JSON} The transaction's fees.
   */
  get fees() {
    return this._transaction.fees;
  }

  /**
   * @return {string} The currency of the transaction.
   */
  get currency() {
    return this._transaction.currency;
  }

  /**
   * This contains the merchant_id of the merchant that this transaction was made at.
   * @return {JSON} The merchant of the transaction.
   */
  get merchant() {
    return this._transaction.merchant;
  }

  /**
   * @return {string} The note of the transaction.
   */
  get note() {
    return this._transaction.note;
  }

  /**
   * @return {string} The labels on the transactions.
   */
  get labels() {
    return this._transaction.labels;
  }

  /**
   * @return {string} The balance of the account when the transaction was made.
   */
  get accountBalance() {
    return this._transaction.account_balance;
  }

  get attachments() {
    return this._attachments;
  }

  /**
   * The category can be set for each transaction by the user.
   * Over time we learn which merchant goes in which category and auto-assign the category of a transaction.
   * If the user hasn’t set a category, we’ll return the default category of the merchant on this transactions.
   * Top-ups have category mondo.
   * Valid values are general, eating_out, expenses, transport, cash, bills, entertainment, shopping, holidays, groceries.
   * @return {string} The category of the transaction.
   */
  get category() {
    return this._transaction.category;
  }

  /**
   * Top-ups to an account are represented as transactions with a positive amount and is_load = true.
   * Other transactions such as refunds, reversals or chargebacks may have a positive amount but is_load = false
   * @return {boolean} Whether the transaction is a load.
   */
  get isLoad() {
    return this._transaction.is_load;
  }

  /**
   * @return {boolean} Whether the transaction is a top up.
   */
  get isTopUp() {
    return this.amount() && this.isLoad() && this.category() === 'mondo';
  }

  /**
   * The timestamp at which the transaction settled.
   * In most cases, this happens 24-48 hours after created.
   * If this field is not present, the transaction is authorised but not yet “complete.”
   * @return {boolean} Whether the transaction has been settled.
   */
  get settled() {
    return this._transaction.settled;
  }

  /**
   * @return {boolean} Whether the transaction has not settled.
   */
  get unsettled() {
    return !this.settled();
  }

  /**
   * @return {boolean} Whether the transaction has settled.
   */
  get hasSettled() {
    return !!this.settled();
  }

  /**
   * @return {string} The local currency where the transaction was made.
   */
  get localCurrency() {
    return this._transaction.local_currency;
  }

  /**
   * @return {string} The amount in the local currency where the transaction was made.
   */
  get localAmount() {
    return this._transaction.local_amount;
  }

  /**
   * @return {string} The date the transaction was last updated at.
   */
  get updatedAt() {
    return this._transaction.updated;
  }

  /**
   * @return {string} The account Id the transaction was made on.
   */
  get accountId() {
    return this._transaction.account_id;
  }

  /**
   * @return {string} The transactions scheme.
   */
  get scheme() {
    return this._transaction.scheme;
  }

  /**
   * @return {string} The dedupe Id this is a unique Id from MasterCard which prevents duplicates.
   */
  get dedupeId() {
    return this._transaction.dedupe_id;
  }

  /**
   * @return {string} The transactions originator.
   */
  get originator() {
    return this._transaction.originator;
  }

  /**
   * @return {boolean} Whether this is included in local spending.
   */
  get includeInSpending() {
    return this._transaction.include_in_spending;
  }
}

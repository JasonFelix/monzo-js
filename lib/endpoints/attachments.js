const Endpoint = require('./endpoint');

module.exports = class Attachments extends Endpoint {

  constructor(client) {
    super(client, 'attachment');
  }

  async upload(fileName, fileType, filePath, uploadProgressCallback) {
    return (await this.post('upload', {file_name: fileName, file_type: fileType})).data;
  }

  async register(transactionId, fileUrl, fileType) {
    const attachment = (await this.post('register', {external_id: transactionId, file_url: fileUrl, file_type: fileType})).data.attachment;
    return new Attachment(attachment);
  }

  async deregister(attachmentId) {
    return await this.post('deregister', { id: attachmentId }).data;
  }

}

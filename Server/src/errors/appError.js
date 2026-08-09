export class error extends Error {
  statusCode;

  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

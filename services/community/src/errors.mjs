export class HttpError extends Error {
  constructor(status, code, options) { super(code, options); this.status = status; this.code = code; }
}

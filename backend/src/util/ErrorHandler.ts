class ErrorHandler extends Error {
  constructor(message: string, statuscode: number) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;

const ApplicationError = require("./ApplicationError");
class ValidationError extends ApplicationError {
  constructor(message) {
    super(message || "Validation Error", 400);
  }
}
module.exports = ValidationError;

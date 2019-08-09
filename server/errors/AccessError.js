const ApplicationError = require("./ApplicationError");
class AccessError extends ApplicationError {
  constructor(message) {
    super(message || "You do not have access to the requested resource", 403);
  }
}
module.exports = AccessError;

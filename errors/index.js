const CustomAPIError = require('./custom-api')
const UnauthorizedError = require('./Unauthorized')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')

module.exports = {
  CustomAPIError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
}

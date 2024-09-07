/**
 * Send a successful response.
 *
 * @param {Object} res - The Express response object.
 * @param {string} message - A success message.
 * @param {Object} data - The data to send in the response.
 */

const sendSuccess = (res, message, data = {}) => {
  res.status(200).send({
    message,
    data
  });
};

/**
 * Send an error response.
 *
 * @param {Object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code for the error.
 * @param {string} message - An error message.
 * @param {string} [errorDetails] - Optional details about the error.
 */

const sendError = (res, statusCode, message, errorDetails = "") => {
  res.status(statusCode).send({
    message,
    error: errorDetails
  });
};

module.exports = {
  sendSuccess,
  sendError
};

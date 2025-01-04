/**
 * Checks if the response contains an error based on the presence of data and data.errors.
 * @param {Object} response - The response object to check.
 * @returns {boolean} - Returns true if the response contains an error, otherwise false.
 */
function isErrorResponse(response) {
  return response?.data?.errors !== undefined;
}

module.exports = {
  isErrorResponse
};

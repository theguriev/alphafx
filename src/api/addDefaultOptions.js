/**
 * Add default predefined options to request.
 * @param {object} options Reqeust options.
 */
export default function (options) {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  }
}

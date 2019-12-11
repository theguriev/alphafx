import request from './request'

/**
 * Make a POST request.
 *
 * @param {string} url Route path.
 * @param {object} options Request options.
 *
 * @returns {Promise}
 */
export default function (url, options = Object.create(null)) {
  return request(
    url,
    {
      ...options,
      method: 'POST'
    }
  )
}

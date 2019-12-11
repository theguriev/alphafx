/**
 * Add base URL to route.
 * @param {string} url Route.
 */
export default function (url, baseURL = process.env.VUE_APP_API_URL) {
  return baseURL + url
}

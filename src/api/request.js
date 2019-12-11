import addBaseURL from './addBaseURL'
import addDefaultOptions from './addDefaultOptions'

/**
 * Make a request.
 * @param {string} url Route path.
 * @param {object} options Request options.
 */
export default async function (url, options) {
  const resp = await fetch(addBaseURL(url), addDefaultOptions(options))
  if (resp.status === 200) {
    return (await resp.json()).data
  }
  throw new Error(resp)
}

export default function (str, highlight) {
  return String(str).replace(
    new RegExp(highlight, 'ig'),
    function (matchedText, a, b) {
      return '<b>' + matchedText + '</b>'
    }
  )
}

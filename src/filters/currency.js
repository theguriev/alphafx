export default function (value) {
  // eslint-disable-next-line quotes
  return '£ ' + parseFloat(value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
}

export default function (data) {
  this.name = 'RequestError'
  this.data = data
  this.stack = (new Error()).stack
}

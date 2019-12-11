import moment from 'moment'

export default function (value, format = 'DD/MM/YY') {
  return moment(String(value)).format(format)
}

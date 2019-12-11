export default function (items, column) {
  return items.reduce((acc, cur) => acc + cur[column], 0)
}

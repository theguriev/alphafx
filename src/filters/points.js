export default function (items, columnOne = 'team_one_goals', columnTwo = 'team_two_goals') {
  const POINTS_FOR_WIN = 3
  const victory = items.filter(el => el[columnOne] > el[columnTwo]).length * POINTS_FOR_WIN
  const tie = items.filter(el => el[columnOne] === el[columnTwo]).length
  return victory + tie
}

import post from './post'

/**
 * Simply post ONLY for test task in real life it will be more and more complex.
 */
export default {
  teams: {
    all: (options) => post('teams', options),
    players: (options) => post('teams/players', options),
    games: {
      all: (options) => post('teams/games', options),
      new: (options) => post('teams/games/new', options)
    }
  }
}

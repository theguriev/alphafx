<template>
  <div class="team pt4">
    <div class="team-block flex">
      <div
        class="image mr1"
        :style="{ backgroundImage: 'url(\'' + team.logo_url + '\')' }"></div>
      <div class="flex flex-column">
        <div class="flex">
          <div class="left mr1">
            <div class="oval" :style="{ background: color }"></div>
          </div>
          <div class="right flex flex-column">
            <h2>{{ team.name }}</h2>
            <span class="city" title="City">{{ team.city }}</span>
          </div>
        </div>
        <div class="flex flex-column flex-auto mt2 ml2 team-stat">
          <span title="Budget"><b>Budget:</b> {{ team.budget | currency }}</span>
          <span title="Goals"><b>Goals:</b> {{ games | sumByColumn('team_one_goals') }}</span>
          <span title="Points"><b>Points:</b> {{ games | points }}</span>
        </div>
      </div>
    </div>
    <div class="pt4">
      <div class="flex">
        <h1 class="mt0 mb0 ml0 mr2">Players</h1>
        <el-input
          prefix-icon="el-icon-search"
          placeholder="Enter keyword"
          clearable
          v-model="playersKeyword"></el-input>
      </div>
      <el-table
        :data="filteredPlayers"
        style="width: 100%">
        <el-table-column
          sortable
          prop="name"
          label="Name">
          <template slot-scope="scope">
            <router-link :to="`/team/${scope.row.team_id}/${scope.row.id}`" :title="scope.row.id" class="name el-link el-link--default">
              <span class="el-link--inner" v-html="scope.row.name"></span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="flag_url"
          label="Flag">
          <template slot-scope="scope">
            <img width="20" :src="scope.row.flag_url" :alt="scope.row.name">
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="nationality"
          label="Nationality">
          <template slot-scope="scope">
            <div v-html="scope.row.nationality"></div>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="position"
          label="Position">
          <template slot-scope="scope">
            <div v-html="scope.row.position"></div>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="age"
          label="Age">
          <template slot-scope="scope">
            <div v-html="scope.row.age"></div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pt4">
      <div class="flex justify-between">
        <h1 class="mt0 mb0 ml0 mr2">Games</h1>
        <div class="button">
          <el-button
            @click="goToAddGame"
            size="small">Add game</el-button>
        </div>
      </div>
      <el-table
        :data="games"
        style="width: 100%">
        <el-table-column
          sortable
          prop="date"
          label="Date">
          <template slot-scope="scope">
            {{ scope.row.date | date }}
          </template>
        </el-table-column>
        <el-table-column
          label="Team one/two goals">
          <template slot-scope="scope">
            {{ scope.row.team_one_goals }}/{{ scope.row.team_two_goals }}
          </template>
        </el-table-column>
        <el-table-column
          label="Status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.team_one_goals > scope.row.team_two_goals">Win</el-tag>
            <el-tag type="info" v-if="scope.row.team_one_goals === scope.row.team_two_goals">Tie</el-tag>
            <el-tag type="danger" v-if="scope.row.team_one_goals < scope.row.team_two_goals">Loose</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import api from '@/api/api'
import currency from '@/filters/currency'
import normalizeColor from '@/filters/normalizeColor'
import sumByColumn from '@/filters/sumByColumn'
import points from '@/filters/points'
import highlight from '@/filters/highlight'
import date from '@/filters/date'

export default {
  name: 'home',
  filters: {
    currency,
    sumByColumn,
    points,
    date
  },
  async beforeRouteEnter ({ params }, from, next) {
    try {
      const team = await api.teams.all({
        body: JSON.stringify({ id: params.id })
      })
      const players = await api.teams.players({
        body: JSON.stringify({ team_id: params.id })
      })
      const games = await api.teams.games.all({
        body: JSON.stringify({ team_one_id: params.id })
      })
      return next(vm => {
        vm.team = team[0]
        vm.players = players
        vm.games = games
      })
    } catch (e) {
      return next(vm => {
        vm.$notify.error({
          title: 'Error',
          message: e.stack
        })
      })
    }
  },
  setup (props, { root }) {
    const team = ref({})
    const players = ref([])
    const games = ref([])
    const playersKeyword = ref('')

    const color = computed(
      () => {
        return normalizeColor(team.value.colour)
      }
    )

    const filteredPlayers = computed(
      () => {
        const findIn = [
          'name',
          'nationality',
          'position',
          'age'
        ]

        return players.value.filter(
          el => findIn.some(
            key => String(el[key]).toLowerCase().indexOf(playersKeyword.value.toLowerCase()) > -1
          )
        ).map(
          el => findIn.reduce(
            (acc, cur) => ({
              ...acc,
              [cur]: highlight(acc[cur], playersKeyword.value)
            }),
            { ...el }
          )
        )
      }
    )

    function goToAddGame () {
      root.$router.push(`/team/${root.$route.params.id}/add-game`)
    }

    return {
      team,
      players,
      games,
      color,
      playersKeyword,
      filteredPlayers,
      goToAddGame
    }
  }
}
</script>
<style scoped lang="scss">
.image{
  width: 200px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  border: 1px solid var(--title-header-bg);
  border-radius: var(--radius);
}

.team-block{
  h2{
    line-height: 22px;
    margin: 0;
  }

  .team-stat{
    padding-left: 4px;
  }
}

.oval{
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background: red;
  margin-top: 4px;
  border: 1px solid var(--border-light);
}
</style>

<template>
  <div class="team pt4">
    <div class="info-block flex">
      <div
        class="image mr2"
        :style="{ backgroundImage: 'url(\'' + player.flag_url + '\')' }"></div>
      <div class="flex flex-auto justify-between">
        <div class="flex flex-column mt2">
          <h2>{{ player.name }}</h2>
          <span class="nationality" title="Nationality">{{ player.nationality }}</span>
        </div>
        <div class="pt2 pb2">
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="flex flex-column flex-auto mt2">
          <span title="Budget"><b>Age:</b> {{ player.age }}</span>
          <span title="Goals"><b>Position:</b> {{ player.position }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-column">
      <h1>History</h1>
      <el-table
        :data="player.history"
        style="width: 100%">
        <el-table-column
          sortable
          prop="goals"
          label="Goals">
        </el-table-column>
        <el-table-column
          sortable
          prop="apps"
          label="Apps">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import api from '@/api/api'
import date from '@/filters/date'

export default {
  name: 'home',
  filters: {
    date
  },
  async beforeRouteEnter ({ params }, from, next) {
    try {
      const players = await api.teams.players({
        body: JSON.stringify({ team_id: params.teamID })
      })
      const player = players.find(el => el.id === params.playerID)
      return next(vm => {
        vm.player = player
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
    const player = ref({})

    return {
      player
    }
  }
}
</script>
<style scoped lang="scss">
.image{
  width: 100px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.info-block{
  h2{
    line-height: 22px;
    margin: 0;
  }
}

.el-divider{
  height: 100%;
  margin: 0 16px;
}
</style>

<template>
  <div class="home">
    <div class="teams pt4">
      <h1>Teams</h1>
      <div class="cards flex flex-wrap">
        <team-card
          v-for="team in teams"
          :key="team.id"
          :team="team" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import api from '@/api/api'
import TeamCard from '@/components/TeamCard'

export default {
  name: 'home',
  components: {
    TeamCard
  },
  async beforeRouteEnter (to, from, next) {
    try {
      const teams = await api.teams.all()
      return next(vm => {
        vm.teams = teams
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
  setup () {
    const teams = ref([])
    return { teams }
  }
}
</script>
<style scoped lang="scss">

</style>

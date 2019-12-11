<template>
  <el-card
    :body-style="{ padding: '0px' }"
    class="mr2 mb2"
    shadow="hover">
    <div
      class="image"
      @click="goToTeam(team.id)"
      :style="{ backgroundImage: 'url(\'' + team.logo_url + '\')' }"></div>
    <el-divider><b>{{ team.founded }}</b></el-divider>
    <div class="card-content pb2 pl2 pr2">
      <div class="top flex">
        <div class="left mr1">
          <div class="oval" :style="{ background: color }"></div>
        </div>
        <div class="right flex flex-column">
          <router-link :to="`/team/${team.id}`" class="name el-link el-link--default">
            <span class="el-link--inner">{{ team.name }}</span>
          </router-link>
          <span class="city" title="City">{{ team.city }}</span>
          <span class="budget" title="Budget">{{ team.budget | currency }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import normalizeColor from '@/filters/normalizeColor'
import currency from '@/filters/currency'
import { computed } from '@vue/composition-api'

export default {
  name: 'TeamCard',
  props: {
    team: {
      type: Object
    }
  },
  filters: {
    currency
  },
  setup (props, { root }) {
    const color = computed(() => normalizeColor(props.team.colour))

    function goToTeam (id) {
      root.$router.push(`/team/${id}`)
    }

    return {
      color,
      goToTeam
    }
  }
}
</script>

<style scoped lang="scss">
.name{
  display: block;
}

.image{
  width: 100%;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

div.el-card{
  width: 200px;
}

.city{
  font-size: 12px;
  color: var(--text-secondary);
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

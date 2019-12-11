<template>
  <div class="team pt4">
    <div class="flex">
      <h1>Add game</h1>
    </div>
    <el-form
      ref="form"
      :model="{
        date: date,
        one: one,
        two: two
      }"
      :rules="rules"
      label-position="left"
      label-width="200px">
      <el-form-item label="Date and time" prop="date">
        <el-date-picker
          v-model="date"
          type="datetime"
          placeholder="Select date and time">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Team one goals" prop="one">
        <el-input-number v-model="one" :min="0" :max="20"></el-input-number>
      </el-form-item>
      <el-form-item label="Team two goals" prop="two">
        <el-input-number v-model="two" :min="0" :max="20"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">Add</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import moment from 'moment'
import api from '@/api/api'

export default {
  name: 'AddGame',
  setup (props, { refs, root }) {
    const date = ref('')
    const one = ref(0)
    const two = ref(0)

    function validateDate (rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input date!'))
      } else if (moment().add(1, 'days').startOf('day').diff(moment(String(value))) <= 0) {
        callback(new Error('The date cannot be in future!'))
      } else {
        callback()
      }
    }

    function validateGoals (rule, value, callback) {
      if (value < 0) {
        callback(new Error('Goals should be more than 0!'))
      } else if (value > 20) {
        callback(new Error('Goals should be less than 20!'))
      } else {
        callback()
      }
    }

    const rules = {
      date: [
        { validator: validateDate, trigger: 'blur' }
      ],
      one: [
        { validator: validateGoals, trigger: 'blur' }
      ],
      two: [
        { validator: validateGoals, trigger: 'blur' }
      ]
    }

    function submit () {
      refs['form'].validate(
        async valid => {
          if (valid) {
            try {
              await api.teams.games.new({
                body: JSON.stringify({
                  date: date.value,
                  team_one_id: root.$route.params.id,
                  team_one_goals: one.value,
                  team_two_goals: two.value
                })
              })
              root.$router.push(`/team/${root.$route.params.id}`)
            } catch (e) {
              root.$notify.error({
                title: 'Error',
                message: e.stack
              })
            }
          }
        }
      )
    }

    return {
      date,
      one,
      two,
      rules,
      submit
    }
  }
}
</script>
<style scoped lang="scss">
</style>

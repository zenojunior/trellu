<template>
  <article class="panel is-info">
    <p v-if="title" class="panel-heading">{{ title }}</p>
    <div class="panel-block-light">
      <chart width="100%" type="bar" :options="options" :series="series" />
    </div>
  </article>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    chart: VueApexCharts
  },
  props: ['title'],
  data () {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['Ago', 'Set', 'Out', `Nov`]
        }
      },
      series: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const {login, logout} = await this.$api.post('/api/admin/dashboard/logins-logouts', {months: [8, 9, 10, 11]}).then(res => res.data)
      this.series = [
        {
          name: 'Logins',
          data: login.map((value) => parseInt(value))
        },
        {
          name: 'Logouts',
          data: logout.map((value) => parseInt(value))
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-block-light {
  border-bottom: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  padding-top: 5px;
}
</style>
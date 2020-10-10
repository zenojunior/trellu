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
          categories: ['Jul', 'Ago', 'Set', 'Out']
        }
      },
      series: [
        {
          name: 'Logins',
          data: [70, 91, 20, 3]
        },
        {
          name: 'Logouts',
          data: [5, 12, 2, 0]
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
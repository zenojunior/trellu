<template>
  <article class="panel is-info">
    <div class="panel-heading">
      <p class="panel-title" v-if="title">{{ title }}</p>
      <b-numberinput size="is-small" v-model="limit" :min="3" :max="8" @input="getData()" controls-position="compact" controls-rounded></b-numberinput>
    </div>
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
          categories: []
        }
      },
      series: [],
      months: [],
      limit: 4
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.months = this.getLastMonths(this.limit)
      this.options = {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [...this.getMonthName(this.months)]
        }
      }
      const {login, logout} = await this.$api.post('/api/admin/dashboard/logins-logouts', {months: this.months}).then(res => res.data)
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
    },
    getMonthName (months) {
      let names = {
        1: 'Jan',
        2: 'Fev',
        3: 'Mar',
        4: 'Abr',
        5: 'Mai',
        6: 'Jun',
        7: 'Jul',
        8: 'Ago',
        9: 'Set',
        10: 'Out',
        11: 'Nov',
        12: 'Dez'
      }
      return months.map(mm => names[mm]).reverse()
    },
    getLastMonths (total) {
      let months = []
      const getMonth = () => new Date().getMonth() + 1
      months.push(getMonth())
      for (let i = 1; i < total; i++) {
        months.push(getMonth() - i)
      }
      return months
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
.panel-heading {
  display: flex;
  .panel-title {
    flex: 1;
  }
  .panel-field {
    margin-left: auto;
    flex: 1;
  }
}
</style>
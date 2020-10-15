<template>
  <article class="panel">
    <p v-if="title" class="panel-heading">{{ title }}</p>
    <div class="panel-body">
      <chart height="200px" type="area" :options="optionsArea" :series="[{data}]" />
      <chart height="120px" type="bar" :options="optionsBar" :series="[{data}]" />
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
      data: [],
      optionsArea: {
        chart: {
          id: 'chart2',
          type: 'area',
          height: 230,
          foreColor: '#ccc',
          toolbar: {
            autoSelected: 'pan',
            show: false
          }
        },
        colors: ['#7957d5'],
        stroke: {
          width: 3
        },
        grid: {
          borderColor: '#555',
          clipMarkers: false,
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.55,
            opacityTo: 0
          }
        },
        markers: {
          size: 5,
          colors: ['#000524'],
          strokeColor: '#7957d5',
          strokeWidth: 3
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          min: 0,
          tickAmount: 4
        }
      },
      optionsBar: {
        chart: {
          id: 'chart1',
          height: 130,
          type: 'bar',
          foreColor: '#ccc',
          brush: {
            target: 'chart2',
            enabled: true
          },
          selection: {
            enabled: true,
            fill: {
              color: '#fff',
              opacity: 0.4
            },
            xaxis: {
              min: new Date('27 Jul 2017 10:00:00').getTime(),
              max: new Date('14 Aug 2017 10:00:00').getTime()
            }
          }
        },
        colors: ['#FF0080'],
        stroke: {
          width: 2
        },
        grid: {
          borderColor: '#444'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          tickAmount: 2
        }
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const end = this.$moment().format('YYYY-MM-DD')
      const begin = this.$moment().subtract('7', 'days').format('YYYY-MM-DD')
      const { ordinations } = await this.$api.post(`/api/admin/dashboard/boards-ordinations`, { begin, end }).then(res => res.data)
      this.data = ordinations
    }
  }
}
</script>

<style lang="scss" scoped>

body {
  background: #000524;
}

#wrapper {
  position: relative;
  background: #000524;
  border: 1px solid #000;
  box-shadow: 0 22px 35px -16px rgba(0, 0, 0, 0.71);
  max-width: 850px;
  margin: 0 auto;
}

#chart-bar {
  position: relative;
  margin-top: -38px;
}

.link {
  position: absolute;
  bottom: 7px;
  right: 13px;
  z-index: 10;
  color: #ccc;
  font-size: 12px;
  text-decoration: none;
  font-family: Helvetica, Arial;
}

.panel-heading {
  background: #363144;
  color: #fff;
  border-color: #363144;
}
.panel-body {
  background-color: #58506b;
  border-bottom: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  padding-top: 5px;
}
</style>
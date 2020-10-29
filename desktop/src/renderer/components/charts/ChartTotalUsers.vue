<template>
  <nav class="level is-mobile">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Usuários {{ selected.suffix }}</p>
        <p class="title">{{ selected.value }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <b-select v-model="select" @input="getData" placeholder="Select a name">
          <option
            v-for="option in options"
            :value="option.id"
            :key="option.id">
            {{ option.name }}
          </option>
        </b-select>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      select: 1,
      options: [
        {
          id: 1,
          value: null,
          name: 'Total',
          suffix: 'totais'
        },
        {
          id: 2,
          value: null,
          name: 'Últimos 30 dias',
          suffix: 'no mês',
          subract: {
            value: 30,
            type: 'days'
          }
        },
        {
          id: 3,
          value: null,
          name: 'Últimos 7 dias',
          suffix: 'na semana',
          subract: {
            value: 7,
            type: 'days'
          }
        },
        {
          id: 4,
          value: null,
          name: 'Últimas 24 horas',
          suffix: 'hoje',
          subract: {
            value: 24,
            type: 'hours'
          }
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const option = this.options[this.select - 1]
      let date = ''
      if (option.subract) date = this.$moment().subtract(option.subract.value, option.subract.type).format('YYYY-MM-DD')
      const { total } = await this.$api.post(`/api/admin/dashboard/accounts-creation?date=${date}`).then(res => res.data)
      option.value = total
    }
  },
  computed: {
    selected () {
      return this.options[this.select - 1]
    }
  }
}
</script>

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
        <b-select v-model="select" placeholder="Select a name">
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
          value: 123,
          name: 'Total',
          suffix: 'totais'
        },
        {
          id: 2,
          value: 20,
          name: 'Últimos 30 dias',
          suffix: 'no mês'
        },
        {
          id: 3,
          value: 2,
          name: 'Últimos 7 dias',
          suffix: 'na semana'
        },
        {
          id: 4,
          value: 0,
          name: 'Últimas 24 horas',
          suffix: 'hoje'
        }
      ]
    }
  },
  computed: {
    selected () {
      return this.options.find(option => option.id === this.select)
    }
  }
}
</script>

<style>

</style>
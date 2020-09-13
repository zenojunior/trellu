<template>
  <form action>
    <div class="modal-card" style="max-width: 300px">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <template v-if="!group.name">
            <b-icon icon="tag-plus"></b-icon>
            <span>Novo grupo</span>
          </template>
          <template v-else>
            <b-icon icon="tag"></b-icon>
            <span>Editando grupo</span>
          </template>
        </p>
      </header>
      <section class="modal-card-body">
        <b-field label="Nome">
          <b-input v-if="group && group.name" type="text" v-model="group.name" required></b-input>
          <b-input v-else type="text" v-model="data.name" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="close()">Cancelar</button>
        <button class="button is-primary" @click="save()" :disabled="loading">
          {{ group.name ? 'Atualizar' : 'Criar' }}
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ['group'],
  data () {
    return {
      data: {
        name: ''
      },
      newGroup: false,
      loading: false
    }
  },
  created () {
    if (!this.group.name) this.newGroup = true
    else this.newGroup = false
  },
  methods: {
    close () {
      this.$parent.close()
    },
    save: async function () {
      let message = ''
      if (this.newGroup) {
        await this.$api.post(`api/admin/groups`, {name: this.data.name})
        message = 'Grupo criado'
      } else {
        message = 'Grupo atualizado'
        await this.$api.put(`api/admin/groups/${this.group.id}`, this.group)
      }
      this.close()
      this.$buefy.toast.open({
        message,
        position: 'is-bottom-right'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message-body {
  padding: .5em 1.5em;
}
</style>
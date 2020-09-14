<template>
  <form action>
    <div class="modal-card" style="max-width: 650px">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <template v-if="!user.name">
            <b-icon icon="account-plus"></b-icon>
            <span>Novo usuário</span>
          </template>
          <template v-else>
            <b-icon icon="account-edit"></b-icon>
            <span>Editando usuário</span>
          </template>
        </p>
      </header>
      <section class="modal-card-body">
        <b-field grouped>
          <b-field label="Id" v-if="user && user.id">
            <b-input type="text" v-model="user.id" disabled></b-input>
          </b-field>
          <b-field label="Username" expanded>
            <b-input v-if="user && user.username" type="text" v-model="user.username" disabled></b-input>
            <b-input v-else type="text" v-model="data.username"></b-input>
          </b-field>
          <b-field label="Senha" v-if="user && !user.name" expanded>
            <b-input type="password" v-model="data.password" password-reveal required></b-input>
          </b-field>
        </b-field>
        <b-field grouped>
          <b-field label="Nome" expanded>
            <b-input v-if="user && user.name" type="text" v-model="user.name" required></b-input>
            <b-input v-else type="text" v-model="data.name" required></b-input>
          </b-field>
          <b-field label="Email" expanded>
            <b-input v-if="user && user.email" type="email" v-model="user.email" required></b-input>
            <b-input v-else type="email" v-model="data.email" required></b-input>
          </b-field>
          <b-field label="Grupo" expanded>
            <b-select v-if="user && user.group_id" v-model="user.group_id">
              <option v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</option>
            </b-select>
            <b-select v-else v-model="data.group_id">
              <option v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</option>
            </b-select>
          </b-field>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="close()">Cancelar</button>
        <button class="button is-primary" @click="save()" :disabled="loading">
          {{ user.name ? 'Atualizar' : 'Criar' }}
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ['user', 'groups'],
  data () {
    return {
      data: {
        name: '',
        email: '',
        username: '',
        password: '',
        group_id: 2
      },
      newUser: false,
      loading: false
    }
  },
  created () {
    if (!this.user.name) this.newUser = true
    else this.newUser = false
  },
  methods: {
    close () {
      this.$emit('close')
      this.$parent.close()
    },
    save: async function () {
      console.log(this.user)
      let message = ''
      if (this.newUser) {
        await this.$api.post(`api/admin/users`, this.data)
        message = 'Usuário criado'
      } else {
        message = 'Usuário atualizado'
        await this.$api.put(`api/admin/users/${this.user.id}`, this.user)
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
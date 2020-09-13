<template>
  <form action>
    <div class="modal-card" style="max-width: 300px">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ account ? 'Entre com sua conta' : 'Crie sua conta' }}</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Usuário" v-if="!account">
          <b-input type="text" v-model="username" required></b-input>
        </b-field>
        <b-field label="E-mail">
          <b-input type="email" v-model="email" placeholder="exemplo@gmail.com" required></b-input>
        </b-field>
        <b-field label="Nome" v-if="!account">
          <b-input type="text" v-model="name" required></b-input>
        </b-field>
        <b-field label="Senha">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            required
          ></b-input>
        </b-field>
        <b-message type="is-danger" v-if="errors.length" size="is-small" auto-close :duration="errorsDuration">
          <div v-html="errors.join('<br>')"></div>
        </b-message>
        <b-checkbox v-model="account">Já possuo conta</b-checkbox>
        <b-checkbox>Lembrar deste computador</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="close()">Cancelar</button>
        <button class="button is-primary" @click="check()" :disabled="loading">Entrar</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ['hasAccount'],
  data () {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      account: this.hasAccount,
      loading: false,
      errors: [],
      errorsDuration: 12000
    }
  },
  methods: {
    close () {
      this.$parent.close()
    },
    check () {
      this.loading = true
      let { name, username, email, password } = this
      this.$api.post(`/api/auth/${this.account ? 'login' : 'register'}`, { name, username, email, password }).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        this.$router.push('/dashboard')
        this.close()
      }).catch(error => {
        this.errors = error.errors ? [error.errors[0].message] : [error.message]
        setTimeout(() => { this.errors = [] }, this.errorsDuration)
      }).then(() => {
        this.loading = false
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
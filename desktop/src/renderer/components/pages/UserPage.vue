<template>
  <app-layout>
    <section class="user-header">
      <div class="user-avatar">
      <img src="~@/assets/user.svg" alt="User picture">
      </div>
      <h2 class="user-name">{{user.name}}</h2>
    </section>
    <div class="container">
      <b-tabs  position="is-centered" type="is-boxed">
          <b-tab-item label="Perfil">
            <div class="form-user-content">
              <b-field label="Nome">
                <b-input type="text" v-model="user.name" required></b-input>
              </b-field>
              <b-field label="Usuário">
                <b-input type="text" v-model="user.username" disabled></b-input>
              </b-field>
              <b-field label="E-mail">
                <b-input type="email" v-model="user.email" disabled placeholder="exemplo@gmail.com" required></b-input>
              </b-field>
              <button class="button is-primary" @click="update()" :disabled="loading">Atualizar dados</button>
            </div>
          </b-tab-item>
          <b-tab-item label="Senha">
            <div class="form-user-content">
              <b-field label="Senha atual">
                <b-input type="password" v-model="password" password-reveal required ></b-input>
              </b-field>
              <b-field label="Nova senha">
                <b-input type="password" v-model="newPassword" password-reveal required></b-input>
              </b-field>
              <button class="button is-primary" @click="updatePassword()" :disabled="(!newPassword.length || !password.length)">Alterar senha</button>
            </div>
          </b-tab-item>
      </b-tabs>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from '../layout/AppLayout'
export default {
  data () {
    return {
      user: {},
      loading: false,
      loadingPassword: false,
      password: '',
      newPassword: ''
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    update () {
      this.loading = true
      this.$api.put('/api/user', this.user).then(res => res.data).then(data => {
        localStorage.setItem('user', JSON.stringify(this.user))
        this.$buefy.toast.open({
          message: 'Dados do usuário foram atualizados.',
          position: 'is-bottom-right'
        })
        this.loading = false
      })
    },
    updatePassword () {
      this.loadingPassword = true
      this.$api.put('/api/user/password', {'password': this.password, 'newPassword': this.newPassword}).then(res => res.data).then(data => {
        this.user.password = this.newPassword
        localStorage.setItem('user', JSON.stringify(this.user))
        this.$buefy.toast.open({
          message: 'Senha atualizada.',
          position: 'is-bottom-right'
        })
        this.loadingPassword = false
      })
    }
  },
  components: {
    AppLayout
  }
}
</script>

<style lang="scss" scoped>
.user-header{
    margin-top: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 3rem 0 1rem 0;
    .user-avatar {
      background-color: #a0a0a0;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;

      img {
        width: 80%;
      }
    }
}
.user-name{
    font-size: 2em;
    text-transform: capitalize;
}
.form-user-content{
    max-width: 25em;
    margin: 2em auto 0 auto;
}
.button.is-primary{
    margin-top: 1em;
}
</style>
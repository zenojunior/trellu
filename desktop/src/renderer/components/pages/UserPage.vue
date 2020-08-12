<template>
  <div>
    <navbar></navbar>
      <section class="user-header">
          <div class="user-avatar">
          <img src="~@/assets/user.svg" alt="User picture">
          </div>
          <h2 class="user-name">{{user.name}}</h2>
      </section>
    <div class="container">
      <section>
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
                <button class="button is-primary" @click="update()" :disabled="loading">Salvar</button>
                </div>
            </b-tab-item>
            <b-tab-item label="Senhas">
                <div class="form-user-content">
                <b-field label="Nova senha">
                    <b-input  type="newPassword" password-reveal required></b-input>
                </b-field>
                    <b-field label="Senha atual">
                        <b-input type="password" password-reveal required ></b-input>
                    </b-field>
                    <button class="button is-primary" @click="updatePassword()" :disabled="loading">Salvar</button>
                </div>
            </b-tab-item>
            <b-tab-item label="Atividades"></b-tab-item>
            <b-tab-item label="Configurações"></b-tab-item>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from '../Navbar'
export default {
  data () {
    return {
      user: {},
      loading: false
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  components: {
    Navbar
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
      this.loading = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 1rem;
}
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
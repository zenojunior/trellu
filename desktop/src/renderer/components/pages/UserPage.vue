<template>
  <div>
    <navbar></navbar>
      <section class="user-header">
          <img src="~@/assets/user.png" class="user-pick" alt="User picture">
            <h2 class="user-name">{{user.name}}</h2>
      </section>
    <div class="container ">
        <section>
        <b-tabs  position="is-centered" type="is-boxed">
            <b-tab-item label="Perfil">
                <div class="form-user-content">
                <b-field label="Nome">
                    <b-input type="text" v-model="user.name" required></b-input>
                </b-field>
                <b-field label="Usuário">
                    <b-input type="text" v-model="user.username" required></b-input>
                </b-field>
                <b-field label="E-mail">
                    <b-input type="email" v-model="user.email" placeholder="exemplo@gmail.com" required></b-input>
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
.user-pick{
    max-height: 8em;
    margin-right: 2em;
}
.user-header{
    margin-top: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3em;
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
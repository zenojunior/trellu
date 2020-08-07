<template>
  <form action>
    <div class="modal-card" style="max-width: 300px">
      <header class="modal-card-head">
        <p class="modal-card-title">Entre com sua conta</p>
      </header>
      <section class="modal-card-body">
        <b-field label="E-mail">
          <b-input type="email" :value="email" placeholder="exemplo@gmail.com" required></b-input>
        </b-field>

        <b-field label="Senha">
          <b-input
            type="password"
            :value="password"
            password-reveal
            required
          ></b-input>
        </b-field>

        <b-checkbox>Lembrar-me</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="close()">Cancelar</button>
        <button class="button is-primary">Entrar</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: ['email', 'password'],
  methods: {
    close () {
      this.$parent.close()
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-background {
    background-color: red;
  }
</style>
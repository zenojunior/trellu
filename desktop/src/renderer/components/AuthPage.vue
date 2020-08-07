<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <main class="has-text-centered">
          <logo class="logo" />
          <div class="card box-auth">
            <p>Identifique-se para continuar.</p>
            <div class="card-content">
              <button class="button is-medium" @click="cardModal()">
                Entrar
              </button>
              <button class="button is-primary is-medium" @click="cardModal()">
                Primeiro acesso
              </button>
            </div>
          </div>
        </main>

      </div>
    </div>
  </section>
</template>

<script>
  import ModalAuth from './AuthPage/ModalAuth'
  import Logo from './Logo'

  export default {
    name: 'landing-page',
    components: { ModalAuth, Logo },
    methods: {
      cardModal () {
        this.$buefy.modal.open({
          parent: this,
          component: ModalAuth,
          hasModalCard: true,
          customClass: 'modal-auth',
          trapFocus: true
        })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    margin-bottom: 2rem;
  }
  .hero {
    background-color: #F9FAFC;
    main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .box-auth {
        max-width: 400px;
        border-radius: 3px;
        padding: 25px 40px;
        box-shadow: rgba(0,0,0,0.1) 0 0 10px;
        margin-bottom: 2rem;
      }
    }
  }
</style>

<style>
  /* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); */
  ::-webkit-scrollbar {
      display: none;
  }
  .modal-close {
    top: 40px
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  /* body { font-family: 'Source Sans Pro', sans-serif; overflow: hidden; } */
</style>

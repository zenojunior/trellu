<template>
  <b-navbar shadow type="is-primary" fixed-top>
        <template slot="start">
            <b-navbar-item to="/dashboard">
                Boards
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <button class="button is-white" outlined @click="() => logout()">
                      Sair
                    </button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import Logo from './Logo'
export default {
  components: {
    Logo
  },
  methods: {
    logout () {
      this.$buefy.dialog.confirm({
        message: 'Tem certeza que deseja sair?',
        cancelText: 'Cancelar',
        confirmText: 'Sim',
        onConfirm: () => {
          localStorage.setItem('user', null)
          this.$global.logout()
          this.$router.push('/')
          this.$buefy.toast.open({
            message: 'Usuário deslogado.',
            position: 'is-bottom-right'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .trellu-navbar {
    background-color: #5E2B97;
  }
</style>
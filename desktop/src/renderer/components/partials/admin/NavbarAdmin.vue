<template>
  <b-navbar class="navbar" shadow type="is-primary">
        <template slot="start">
          <b-tooltip 
            label="Voltar ao app"
            type="is-dark"
            position="is-right"
          >
            <b-navbar-item tag="router-link" class="button is-primary is-outlined is-inverted" :to="{ path: '/dashboard' }" type="is-primary">
              <b-icon icon="arrow-left"></b-icon>
            </b-navbar-item>
          </b-tooltip>
        </template>
    </b-navbar>
</template>

<script>
import Logo from '../../Logo'
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

<style lang="scss">
.navbar-start {
  align-items: center;
  padding-left: 15px;
  > span {
    margin-right: 5px;
  }
}
</style>
<style lang="scss" scoped>
  .trellu-navbar {
    background-color: #5E2B97;
  }
</style>
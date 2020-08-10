<template>
  <b-navbar shadow type="is-primary" fixed-top>
        <template slot="start">
          <b-tooltip 
            label="Quadros"
            type="is-dark"
            position="is-bottom"
          >
            <b-navbar-item tag="router-link" class="button is-primary is-outlined is-inverted" :to="{ path: '/dashboard' }" type="is-primary">
              <b-icon icon="view-grid"></b-icon>
            </b-navbar-item>
          </b-tooltip>
          <b-tooltip 
            label="Minha conta"
            type="is-dark"
            position="is-bottom"
          >
            <b-navbar-item tag="router-link" class="button is-primary is-outlined is-inverted" :to="{ path: '/user' }" type="is-primary">
              <b-icon icon="account"></b-icon>
            </b-navbar-item>
          </b-tooltip>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
              <b-tooltip 
                label="Sair"
                type="is-dark"
                position="is-bottom"
              >
                  <b-button type="is-primary" inverted outlined @click="() => logout()">
                    <b-icon icon="logout-variant"></b-icon>
                  </b-button>
              </b-tooltip>
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
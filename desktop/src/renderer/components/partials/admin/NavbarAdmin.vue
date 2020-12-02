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
    <template slot="end">
      <b-tooltip 
        label="Capturar conteúdo"
        class="btn-options"
        type="is-dark"
        position="is-left"
      >
        <b-button @click="capture()" class="button is-primary is-outlined is-inverted">
          <b-icon icon="monitor-screenshot"></b-icon>
        </b-button>
      </b-tooltip>
    </template>
  </b-navbar>
</template>

<script>
import Logo from '../../Logo'
import electron from 'electron'
import ModalPrintPreview from '../../modals/AdminPrintPreview'
const currentWindow = electron.remote.getCurrentWindow()

export default {
  components: {
    Logo,
    ModalPrintPreview
  },
  methods: {
    capture () {
      const options = {
        x: 320,
        y: 110,
        width: 1000,
        height: 600
      }
      currentWindow.capturePage(options, (image) => {
        const buffer = image.toPNG()
        this.$buefy.modal.open({
          parent: this,
          component: ModalPrintPreview,
          hasModalCard: true,
          customClass: 'modal-print-preview',
          trapFocus: true,
          props: { buffer },
          events: {
            close: () => {
              console.log('close')
            }
          }
        })
      })
    },
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
.admin-layout {
  .navbar {
    &-start {
      align-items: center;
      padding-left: 15px;
      > span {
        margin-right: 5px;
      }
    }
    &-end {
      align-items: center;
      padding-right: 15px;
    }
  }
}
</style>
<style lang="scss" scoped>
  .trellu-navbar {
    background-color: #5E2B97;
  }
  .btn-options {
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
</style>
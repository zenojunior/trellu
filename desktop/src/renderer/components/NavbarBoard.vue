<template>
  <b-navbar shadow type="is-primary" fixed-top>
    <template slot="start">
      <b-tooltip 
        label="Quadros"
        type="is-dark"
        position="is-bottom"
      >
        <b-navbar-item tag="router-link" class="button is-primary is-outlined is-inverted" :to="{ name: 'dashboard-page' }" type="is-primary">
          <b-icon icon="view-grid"></b-icon>
        </b-navbar-item>
      </b-tooltip>
      <input spellcheck="false" dir="auto" @focus="$event.target.select()" @change="updateBoardTitle()" v-model="board.title" class="board-title" type="text">
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <b-dropdown aria-role="list" position="is-bottom-left">
          <button class="button is-primary is-outlined is-inverted" slot="trigger" slot-scope="{ active }">
              <b-icon icon="dots-horizontal"></b-icon>
          </button>
          <b-dropdown-item @click="deleteBoard(board.id)" aria-role="listitem">Excluir</b-dropdown-item>
        </b-dropdown>
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
  props: ['board'],
  methods: {
    updateBoardTitle () {
      this.updateBoard()
      this.$buefy.toast.open({
        message: 'Título do quadro atualizado.',
        position: 'is-bottom-right'
      })
    },
    updateBoard () {
      const {title, color, featured, structure} = this.board
      this.$api.put(`/api/boards/${this.board.id}`, {title, color, featured, structure: JSON.stringify(structure)})
    },
    deleteBoard (id) {
      this.$buefy.dialog.confirm({
        title: 'Apagar quadro',
        message: `Você tem certeza que quer <b>excluir</b> o quadro ${this.board.title}? Não terá como desfazer essa ação.`,
        cancelText: 'Cancelar',
        confirmText: 'Excluir',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$api.delete(`/api/boards/${id}`).then(res => res.data).then((board) => {
            this.$store.dispatch('DELETE_BOARD', id)
            this.$router.push({ name: 'dashboard-page' })
            this.$buefy.toast.open({
              message: 'Quadro excluído.',
              position: 'is-bottom-right'
            })
          })
        }
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
  .board-title {
    font-size: 20px;
    border: 0;
    background: transparent;
    color: #fff;
    padding-left: 1rem;
    line-height: 1.8;
    outline: none;
    border-radius: 3px;
    margin-left: 5px;
    padding-left: 5px;
    padding-right: 5px;
    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.25);
    }
    &:active, &:focus {
      background: #fff;
      cursor: text;
      color: #000;
    }
  }
</style>
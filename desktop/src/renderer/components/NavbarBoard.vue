<template>
  <b-navbar type="is-primary" :style="`background-color: ${board.color}`">
    <template slot="start">
      <input spellcheck="false" dir="auto" @focus="$event.target.select()" @change="updateBoardTitle()" v-model="board.title" class="board-title" type="text">
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <b-button 
          @click="$router.push({ name: 'dashboard-page' })"
          class="button is-primary is-outlined is-inverted"
          icon-left="arrow-left"
        >
            Voltar
        </b-button>
      </b-navbar-item>
      <b-navbar-item tag="div" style="padding-left: 0">
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
          <a
            class="button is-primary is-outlined is-inverted"
            slot="trigger"
            role="button">
            <b-icon icon="format-color-fill"></b-icon>
          </a>
          <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
            <div class="modal-card" style="width:300px;margin-top: auto!important;">
              <section class="modal-card-body">
                <b-button v-for="color in colors" @click="setBackground(color)" color="is-light" rounded :style="`background-color: ${color}`" :key="color" />
              </section>
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
      <b-navbar-item tag="div" style="padding-left: 0">
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
  data () {
    return {
      colors: ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91', '#5E2B97']
    }
  },
  methods: {
    goDashboard () {
      this.$router.push({ name: 'dashboard-page' })
    },
    updateBoardTitle () {
      this.updateBoard()
      this.$buefy.toast.open({
        message: 'Título do quadro atualizado.',
        position: 'is-bottom-right'
      })
    },
    setBackground (color) {
      this.$global.background = this.board.color = color
      this.updateBoard()
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
  .navbar-menu > div {
    z-index: 2;
  }
 .navbar-menu::after {
  content: '';
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
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
  .button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined.is-hovered, .button.is-primary.is-inverted.is-outlined:focus, .button.is-primary.is-inverted.is-outlined.is-focused {
    color: #545454;
  }
</style>
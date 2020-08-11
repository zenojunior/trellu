<template>
  <div>
    <navbar></navbar>
    <div class="container is-fluid pt-6">
      <ul class="columns is-variable is-3 ">
        <li v-for="(board, index) of boards" class="column is-one-quarter">
          <a class="board-tile" @click="openBoard(board.id)">{{ board.title }}</a>
        </li>
        <li class="column is-one-quarter">
          <a class="board-tile add" @click="openModalAddBoard()">Criar novo quadro</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from '../Navbar'
import ModalAddBoard from '../modals/ModalAddBoard'
import { mapState } from 'vuex'

export default {
  created () {
    this.$api.get('/api/boards').then(res => res.data).then((boards) => {
      boards.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
      this.$store.dispatch('SET_BOARDS', boards)
    })
  },
  methods: {
    openBoard (id) {
      this.$router.push({ name: 'board-page', params: {id} })
    },
    openModalAddBoard () {
      this.$buefy.modal.open({
        parent: this,
        component: ModalAddBoard,
        hasModalCard: true,
        customClass: 'modal-add-board',
        trapFocus: true
      })
    }
  },
  computed: {
    ...mapState({
      boards: state => state.Board.boards
    })
  },
  components: {
    Navbar,
    ModalAddBoard
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 2rem;
}
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    transform: translate(0);
    a.board-tile {
      display: flex;
      height: 100px;
      background-color: #97a0af;
      background-size: cover;
      background-position: 50%;
      color: #fff;
      position: relative;
      text-decoration: none;
      border-radius: 3px;
      justify-content: center;
      align-items: center;
      &.add {
        background-color: rgba(9, 30, 66, 0.04);
        color: #172b4d;
        &:hover {
          background-color: rgba(9,30,66,.08);
          box-shadow: none;
          border: none;
          color: #172b4d;
        }
      }
    }
  }
}
</style>
<template>
  <div>
    <navbar-board :board="board" :background="board.color" />
    <pre style="margin-top: 2rem">{{ board }}</pre>
  </div>
</template>

<script>
import NavbarBoard from '../NavbarBoard'
export default {
  data () {
    return {
      id: {},
      board: {
        color: '#7957d5',
        featured: false,
        structure: '{}',
        title: '',
        user_id: null
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    this.$api.get(`/api/boards/${this.id}`).then(res => res.data).then(board => {
      this.board = board
      this.board.color = board.color
    })
  },
  components: {
    NavbarBoard
  }
}
</script>

<style>

</style>
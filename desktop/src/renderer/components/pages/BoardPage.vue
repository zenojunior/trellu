<template>
  <div>
    <navbar-board :board="board" />
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur illo obcaecati mollitia recusandae blanditiis eum ratione odit iste laudantium hic eaque, voluptate eius laborum tempora. Eaque ut rerum harum saepe?</p>
  </div>
</template>

<script>
import NavbarBoard from '../NavbarBoard'
export default {
  data () {
    return {
      id: {},
      board: {
        color: '',
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
      console.log(board)
      this.board = board
    })
  },
  components: {
    NavbarBoard
  }
}
</script>

<style>

</style>
<template>
  <div class="app-layout">
    <navbar-board v-if="board" @updateBoard="$emit('updateBoard', {})" :board="board" />
    <navbar v-else />
    <slot />
  </div>
</template>

<script>
import Navbar from '../Navbar'
import NavbarBoard from '../NavbarBoard'
export default {
  components: {
    Navbar,
    NavbarBoard
  },
  props: ['board']
}
</script>

<style lang="scss" scoped>
.app-layout {
  top: 37px;
  position: relative;
}
</style>
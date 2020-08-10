<template>
  <div>
    <navbar></navbar>
    <div class="container is-fluid pt-6">
      <h1>User page</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus consectetur enim cupiditate atque perspiciatis ullam molestias neque maiores nemo, unde reiciendis autem consequuntur culpa eos voluptates incidunt qui quidem a!</p>
    </div>
  </div>
</template>

<script>
import Navbar from '../Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 1rem;
}
</style>
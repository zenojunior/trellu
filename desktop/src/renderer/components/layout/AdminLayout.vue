<template>
  <div>
    <navbar />
    <div class="container is-fluid pt-6">
      <div class="columns">
        <div class="column is-one-quarter">
          <menu-admin />
        </div>
        <div class="column is-three-quarters">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../partials/admin/NavbarAdmin'
import MenuAdmin from '../partials/admin/MenuAdmin'

export default {
  data () {
    return {
    }
  },
  components: {
    Navbar,
    MenuAdmin
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 2rem;
}
</style>
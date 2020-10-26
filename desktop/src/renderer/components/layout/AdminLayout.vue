<template>
  <div class="admin-layout">
    <navbar-admin/>
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
import NavbarAdmin from '../partials/admin/NavbarAdmin'
import MenuAdmin from '../partials/admin/MenuAdmin'

export default {
  data () {
    return {
    }
  },
  components: {
    NavbarAdmin,
    MenuAdmin
  }
}
</script>

<style lang="scss" scoped>
.admin-layout {
  top: 37px;
  position: relative;
}
.container {
  padding-top: 2rem;
}
.is-three-quarters {
  overflow-y: auto;
  height: 86vh;
}
</style>
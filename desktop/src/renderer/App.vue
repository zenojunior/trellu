<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import '@mdi/font/css/materialdesignicons.css'
  export default {
  }
</script>

<style lang="scss">
  @import '~buefy/dist/buefy.css';
  $primary: #5E2B97;

  * { user-select: none; }
  .modal-card {
    max-height: calc(100vh - 60px);
    margin-top: 30px!important;
  }
  .navbar.is-fixed-top {
    top: 30px;
    + .container { margin-top: 3.25rem; }
  }
</style>

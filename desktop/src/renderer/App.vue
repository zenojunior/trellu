<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'moment/locale/pt-br'
  import '@mdi/font/css/materialdesignicons.css'
  export default {
    created () {
      this.$moment.locale('pt-br')
    }
  }
</script>

<style lang="scss">
  @import '~buefy/dist/buefy.css';
  $primary: #5E2B97;

  * { user-select: none; }
  ._horizontal-scroll {
    width: 100%;
  }
  .smooth-dnd-container.horizontal {
    height: 100%;
  }
  .modal-card {
    max-height: calc(100vh - 60px);
    margin-top: 30px!important;
  }
  .navbar.is-fixed-top {
    top: 30px;
    + .container { margin-top: 3.25rem; }
  }
  .window-title {
    color: #fff
  }
  .titlebar.light .window-controls-container .window-icon {
    background-color: #fff!important
  }
</style>

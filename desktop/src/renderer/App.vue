<template>
  <div id="app">
    <app-bar />
    <router-view />
  </div>
</template>

<script>
  import 'moment/locale/pt-br'
  import '@mdi/font/css/materialdesignicons.css'
  import AppBar from './components/partials/AppBar'
  export default {
    created () {
      this.$moment.locale('pt-br')
    },
    components: {
      AppBar
    }
  }
</script>

<style lang="scss">
  @import '~buefy/dist/buefy.css';
  $primary: #5E2B97;
  #app {
    height: 100vh;
  }

  * { user-select: none; }
  .select-text {user-select: text!important;}

  ._horizontal-scroll {
    width: 100%;
  }
  .smooth-dnd-container.horizontal {
    width: 100%;    
    height: calc(100vh - 90px);
  }
  .modal-card {
    max-height: calc(100vh - 60px);
    margin-top: 30px!important;
  }
  .window-title {
    color: #fff
  }
  .titlebar.light .window-controls-container .window-icon {
    background-color: #fff!important
  }
</style>

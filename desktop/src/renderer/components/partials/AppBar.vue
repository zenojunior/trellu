<template>
  <b-navbar
    class="navbar"
    type="is-primary"
    shadow
    :style="{
      'background-color': $global.background || '#684ab7',
      'min-height': 'auto',
      height: '37px'
    }"
  >
    <template slot="start" style="flex: 1">
      <span class="logo">Tréllu</span>
    </template>

    <template slot="end" style="flex: 1">
        <b-navbar-item tag="div">
          <b-navbar-item tag="button" class="button is-small is-text" @click="minimize()" style="margin-right: 5px">
            <b-icon icon="window-minimize"></b-icon>
          </b-navbar-item>
          <b-navbar-item tag="button" class="button is-small is-text" @click="maximize()" disabled style="margin-right: 5px">
            <b-icon icon="window-maximize"></b-icon>
          </b-navbar-item>
          <b-navbar-item tag="button" class="button is-small is-text is-danger" @click="close()">
            <b-icon icon="window-close"></b-icon>
          </b-navbar-item>
        </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import {remote} from 'electron'
let window = remote.getCurrentWindow()

export default {
  data () {
    return {
      isMaximized: false
    }
  },
  methods: {
    close () {
      window.close()
    },
    maximize () {
      this.isMaximized ? window.unmaximize() : window.maximize()
    },
    minimize () {
      window.minimize()
    }
  }
}
</script>

<style lang="scss">
.navbar-item {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
<style lang="scss" scoped>
.navbar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  position: fixed;
  width: 100%;
  z-index: 10000;
  box-shadow: none!important;
  top: 0;

  button {
    -webkit-app-region: no-drag;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.15);
  }
}
.logo {
  opacity: .8;
  cursor: pointer;
  font-size: 20px;
  margin-left: auto;
  margin-right: 0;
  &:hover {
    opacity: 1;
  }
}
</style>
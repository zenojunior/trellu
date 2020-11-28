<template>
  <b-navbar
    :class="['navbar', {'board-page': currentRouteName === 'board-page'}]"
    type="is-primary"
    shadow
    :style="{
      'background-color': $global.background || '#684ab7',
      'min-height': 'auto',
      height: '37px'
    }"
  >
    <template slot="start" style="flex: 1">
      <div class="buttons-appbar">
        <b-button
          @click="$router.push({ name: 'dashboard-page' })"
          class="button is-primary is-text button-appbar"
          icon-left="view-dashboard"
        />
      </div>
      <b-button
          @click="$router.push({ name: 'dashboard-page' })"
          class="logo is-text"
      >
        Tréllu
      </b-button>
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
  computed: {
    currentRouteName () {
      return this.$route.name
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
.navbar {
  .navbar-start {
    flex: 1;
    .logo {
      opacity: .8;
      font-size: 20px;
      margin-left: auto;
      margin-right: 0;
      margin-right: auto;
      cursor: pointer;
      text-decoration: none;
      background: transparent;
      &:hover, &:focus {
        background: transparent;
        color: #fff;
        outline: none;
        box-sizing: none;
        box-shadow: none;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  &.board-page {
    &::after {
      content: '';
      background: rgba(0, 0, 0, 0.1);
      width: 100%;
      height: 100%;
      z-index: 1000;
      position: absolute;
      pointer-events: none;
    }
  }
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

  &:not(.board-page) {
    .button-appbar {
      display: none;
    }
  }

  button {
    -webkit-app-region: no-drag;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.15);
  }
}
.buttons-appbar {
  position: absolute;
  .button-appbar {
    height: 29px;
    padding-top: 1px;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 10px;
    left: -5px;
    &:hover {
      background-color: whitesmoke;
      color: #363636;
    }
  }
}
</style>
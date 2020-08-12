import Vue from 'vue'
import { Titlebar, Color } from 'custom-electron-titlebar'

export default new Vue({
  data: function () {
    return {
      title: 'Tréllu',
      color: '#5E2B97',
      titlebar: new Titlebar({
        backgroundColor: Color.fromHex('#5E2B97'),
        icon: 'static/icon.png',
        menu: null,
        titleHorizontalAlignment: 'left',
        shadow: true
      }),
      background: ''
    }
  },
  methods: {
    updateTitle (text = this.title) {
      this.titlebar.updateTitle(text)
    },
    resetBackgroundColor () {
      // this.titlebar.updateBackground(Color.fromHex(this.color))
      this.background = this.color
    },
    logout () {
      return this.$api.get('/api/auth/logout')
    },
    errorMessages (err) {
      console.log(err)
      if (err.startsWith('E_GUEST_ONLY')) return 'Você já está autenticado'
      return err
    }
  },
  computed: {
    backgroundStyle () {
      return `background: ${this.background}`
    },
    colorStyle () {
      return `color: ${this.background}`
    }
  },
  watch: {
    background: function (a, b) {
      this.titlebar.updateBackground(Color.fromHex(`${a}de`))
    }
  }
})

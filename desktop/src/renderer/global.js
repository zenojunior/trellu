import Vue from 'vue'
import { Titlebar, Color } from 'custom-electron-titlebar'

export default new Vue({
  data: function () {
    return {
      title: 'Tréllu',
      titlebar: new Titlebar({
        backgroundColor: Color.fromHex('#5E2B97'),
        icon: 'static/icon.png',
        menu: null,
        titleHorizontalAlignment: 'left',
        shadow: true
      })
    }
  },
  created () {
    console.log(__dirname)
  },
  methods: {
    updateTitle (text = this.title) {
      this.titlebar.updateTitle(text)
    }
  }
})

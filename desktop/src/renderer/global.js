import Vue from 'vue'
import electron from 'electron'
const BrowserWindow = electron.remote.BrowserWindow
export default new Vue({
  data: function () {
    return {
      title: 'Tréllu',
      color: '#5E2B97',
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
      this.$cookie.delete('adonis-session', { domain: this.baseURL })
      this.$cookie.delete('adonis-session-values', { domain: this.baseURL })
      return this.$api.get('/api/auth/logout')
    },
    errorMessages (err) {
      console.log(err)
      if (err.startsWith('E_GUEST_ONLY')) return 'Você já está autenticado'
      return err
    },
    createModal (url) {
      let modal = new BrowserWindow({
        height: 568,
        width: 768,
        title: 'teste',
        resizable: true,
        maximizable: true,
        transparent: true,
        // frame: false,
        // modal: true,
        webPreferences: {
          nodeIntegration: true
        }
      })

      console.log(url)
      modal.loadURL(url)
      modal.on('closed', () => {
        modal = null
      })
    }
  },
  computed: {
    baseURL () {
      return process.env.NODE_ENV === 'development' ? 'http://localhost:8090' : ''
    }
  }
})

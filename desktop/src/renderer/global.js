import Vue from 'vue'

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
    }
  },
  computed: {
    baseURL () {
      return process.env.NODE_ENV === 'development' ? 'http://localhost:8090' : ''
    }
  }
})

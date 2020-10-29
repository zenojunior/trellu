import Vue from 'vue'

const userTopicSubscriptions = id => {
  if (id) {
    let subscription = Vue.ws.socket.getSubscription(`user:${id}`)
    if (!subscription) {
      subscription = Vue.ws.subscribe(`user:${id}`)
    }
    subscription.on('HELLO_EVENT', data => {
      console.log('Hello (event handled in src/WsSubscriptions.js)', data)
    })
  }
}

export default async () => {
  return new Promise((resolve, reject) => {
    Vue.ws.disconnect()
    Vue.ws.connect(
      {
        wsDomain: 'ws://localhost:3333',
        jwtToken: null
      },
      {
        path: 'adonis-ws',
        reconnectionAttempts: 300,
        reconnectionDelay: 5000
      }
    )
    Vue.ws.socket.on('open', () => {
      userTopicSubscriptions(1)
      resolve()
    })
  })
}

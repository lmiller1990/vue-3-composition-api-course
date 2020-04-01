import { createApp } from 'vue'
import axios from 'axios'
import 'highlight.js/styles/github.css'

import App from './App.vue'
import { router } from './router'
import { posts } from './components/factories'
import { User, NewUser } from './types'

// @ts-ignore
axios.get = (url: string, config: any) => {
  if (url === '/posts') {
    return Promise.resolve({
      data: posts
    })
  }
  throw Error(`No mock data for ${url}`)
}

// @ts-ignore
axios.post = (url: string, content: any) => {
  if (url === '/posts') {
    return Promise.resolve({
      data: content
    })
  }

  if (url === '/users') {
    const user: User = {
      username: content.username,
      id: -1,
      isCurrentUser: true,
    }

    return Promise.resolve({
      data: user
    })
  }

  throw Error(`No mock data for ${url}`)
}


const app = createApp(App)
app.use(router)
app.mount('#app')

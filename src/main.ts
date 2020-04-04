import { createApp } from 'vue'
import axios from 'axios'
import 'highlight.js/styles/github.css'

import App from './App.vue'
import { router } from './router'
import { posts } from './components/factories'
import { User } from './types'
import { E401 } from './components/factories'

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
axios.put = (url: string, content: any) => {
  if (url.match(/posts\/\d+/)) {
    return Promise.resolve({
      data: content
    })
  }
  throw Error(`No mock data for ${url}`)
}

// @ts-ignore
axios.post = (url: string, content: any) => {
  if (url === '/login') {
    if (
      content.email === 'test@test.com' && 
      content.password === 'password'
    ) {
      return Promise.resolve<{ data: User }>({
        data: {
          id: 999,
          email: 'Lachlan',
          username: 'Lachlan',
          isCurrentUser: true
        }
      })
    }

    throw new E401()
  }

  if (url === '/posts') {
    return Promise.resolve({
      data: content
    })
  }

  if (url === '/logout') {
    return
  }

  if (url === '/users') {
    const user: User = {
      username: content.username,
      email: content.email,
      id: 999,
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

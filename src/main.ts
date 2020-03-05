import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import { router } from './router'
import { posts } from './components/factories'

// @ts-ignore
axios.get = (url: string, config: any) => {
  if (url === '/posts') {
    return {
      data: posts
    }
  }
  throw Error(`No mock data for ${url}`)
}


const app = createApp(App)
app.use(router)
app.mount('#app')

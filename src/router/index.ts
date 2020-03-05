import { createHistory, createRouter } from '@posva/vue-router-next'

import NewPost from '../components/NewPost.vue'
import Home from '../components/Home.vue'

const history = createHistory('')
const router = createRouter({
  history,
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: Home,
    },
    {
      path: '/posts/new',
      name: 'new-post',
      component: NewPost,
    }
  ]
})

export { router }

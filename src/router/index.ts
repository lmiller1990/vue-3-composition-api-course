import { createHistory, createRouter } from '@posva/vue-router-next'

import NewPost from '../components/NewPost.vue'
import ShowPost from '../components/ShowPost.vue'
import Home from '../components/Home.vue'
import NewUser from '../components/NewUser.vue'
import ValidatorInput from '../components/ValidatorInput.vue'

const history = createHistory('')
const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: '',
      component: Home,
    },
    {
      path: '/posts/new',
      name: 'new-post',
      component: NewPost,
    },
    {
      path: '/posts/:id',
      name: 'show-post',
      component: ShowPost,
    },
    {
      path: '/users/new',
      name: 'user-new',
      component: NewUser
    }
  ]
})

export { router }

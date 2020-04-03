import { createHistory, createRouter } from '@posva/vue-router-next'

import NewPost from '../components/NewPost.vue'
import ShowPost from '../components/ShowPost.vue'
import Home from '../components/Home.vue'
import EditPost from '../components/EditPost.vue'
import NewUser from '../components/NewUser.vue'
import Login from '../components/Login.vue'

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
      path: '/posts/:id/edit',
      name: 'edit-post',
      component: EditPost,
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
    },
    {
      path: '/users/login',
      name: 'login',
      component: Login
    }
  ]
})

export { router }

<template>
  <nav class="navbar">
    <nav class="navbar-brand">
      <a class="navbar-item"
         href="/"
       >
         Vue 3 Composition API
      </a>
    </nav>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="authenticated">
              <router-link to="/posts/new" class="button">
                New Post
              </router-link>

              <button @click="logout" class="button">
                Log Out
              </button>
            </div>

            <div v-else>
              <router-link to="/users/new" class="button">
                Sign Up
              </router-link>

              <router-link to="/users/login" class="button">
                Log In
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '../store'

export default defineComponent({
  name: 'Topnav',

  setup() {
    const store = useStore()

    return {
      logout: () => store.logout(),
      authenticated: computed(() => store.authenticated)
    }
  }
})
</script>

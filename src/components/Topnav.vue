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
            <a href="/users/new" class="button">
              Sign Up
            </a>

            <a href="/users/login" class="button">
              Log In
            </a>

            <router-link to="/posts/new" class="button">
              New Post
            </router-link>

            <button @click="logout" class="button">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Topnav',

  setup() {
    return {
      logout() {
        console.log('Logout')
      }
    }
  }
})
</script>

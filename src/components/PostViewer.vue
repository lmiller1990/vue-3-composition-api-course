<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <h1 class="title">{{ post.title }}</h1>
      <div class="post-html" v-html="post.content"></div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from '@posva/vue-router-next'

import { Post } from '../types'
import { useStore } from '../store'
import { delay } from '../utils'

export default defineComponent({
  name: 'PostViewer',

  async setup(props, ctx) {
    const route = useRoute()
    const postId = route.value.params['id'] as string
    const store = useStore()
    if (!store.getState().posts.loaded) {
      await delay()
      await store.fetchPosts()
    }

    const post = store.getState().posts.all[postId]

    return {
      post
    }
  }
})
</script>
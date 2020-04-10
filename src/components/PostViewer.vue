<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <div class="columns">
        <div class="column">
          <div class="is-pulled-right">
            <RouterLink 
              v-if="canEdit"
              class="button is-rounded is-link" 
              :to="editUrl"
            >
              <i class="fas fa-edit" />
            </RouterLink>

            <div class="button is-rounded is-success">
              <i class="fas fa-share" />
            </div>

            <div class="button is-rounded is-info">
              <i class="far fa-thumbs-up" />
            </div>
          </div>
        </div>
      </div>

      <h1 class="title">{{ post.title }}</h1>
      <div class="post-html" v-html="post.content"></div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

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
      post,
      editUrl: `/posts/${post.id}/edit`,
      canEdit: store.currentUser?.id === post.authorId
    }
  }
})
</script>
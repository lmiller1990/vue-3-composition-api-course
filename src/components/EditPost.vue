<template>
  <PostWriter
    :post="post"
    @submitted="updatePost"
  />
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from '@posva/vue-router-next'

import PostWriter from './PostWriter.vue'
import { Post } from '../types'
import { useStore } from '../store'

export default defineComponent({
  components: {
    PostWriter
  },

  setup() {
    const store = useStore()
    const router = useRouter()
    const id = useRoute().value.params.id as string

    const updatePost = async (post: Post) => {
      await store.updatePost(post)
      router.push(`/posts/${post.id}`)
    }

    const post = store.getState().posts.all[id]

    return {
      post,
      updatePost,
    }
  } 
})
</script>
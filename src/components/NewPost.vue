<template>
  <div>
    <PostWriter
      :post="newPost"
      @submitted="createPost"
    />
  </div> 
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import PostWriter from './PostWriter.vue'
import { Post } from '../types'
import { useStore } from '../store'

export default defineComponent({
  components: {
    PostWriter
  },

  setup() {
    const newPost: Post = {
      id: -1,
      title: 'New post...',
      markdown: '# My great post!\nThis is a *really exciting* post.',
      tags: [],
      content: '',
      created: moment(),
      authorId: 1,
      likes: 0,
    }

    const router = useRouter()
    const createPost = async(post: Post) => {
      const store = useStore()
      await store.createPost(post)
      await router.push('/')
    }

    return {
      newPost,
      createPost,
    }
  } 
})
</script>
<template>
  <div>
    <PostWriter
      :post="newPost"
    />
  </div> 
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent } from 'vue'

import PostWriter from './PostWriter.vue'
import { Post } from '../types'

export default defineComponent({
  components: {
    PostWriter
  },

  setup() {
    const newPost: Post = {
      id: 0,
      title: 'New post...',
      markdown: '# My great post!\nThis is a *really exciting* post.',
      tags: [],
      content: '',
      created: moment(),
      authorId: 1,
      likes: 0,
    }


    return {
      newPost
    }
  } 
})
</script>
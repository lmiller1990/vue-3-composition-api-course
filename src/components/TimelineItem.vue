<template>
  <a class="panel-block">
    <div class="level">
      <div>
        <div>
          <router-link 
            :to="link"
            class="link"
          >
            {{ post.title }}
          </router-link>
        </div>
        <span data-test="author">
          {{ ` ${post.created.format('Do MMM')} by ${author}.` }}
        </span>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Post } from '../types'

export default defineComponent({
  name: 'TimelineItem',

  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
    const link = `/posts/${props.post.id}`
    const author = 'Lachlan'

    return {
      link,
      author,
    }
  }
})
</script>


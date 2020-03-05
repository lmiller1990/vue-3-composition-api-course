<template>
  <nav class="panel is-primary">
    <p class="panel-tabs">
      <a 
        v-for="tab in tabs" 
        :key="tab" 
        :class="[ tab === activeTab ? 'is-active' : '']"
        :data-test="tab"
        @click="setActiveTab(tab)"
      >
        {{ tab }}
      </a>
    </p>

    <TimelineItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @like="handleLike"
    />
  </nav>
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent, ref, computed } from 'vue'

import { posts as mockPosts } from './factories'
import { store } from '../store/index'
import { filterPosts } from './timelineUtils'
import TimelineItem from './TimelineItem.vue'
import { TimePeriod, Post } from '../types'

const posts = ref<Post[]>([...mockPosts])

export default defineComponent({
  name: 'Timeline',

  components: {
    TimelineItem
  },
  
  setup() {
    const tabs: TimePeriod[] = ['today', 'this week', 'this month']
    const activeTab = ref<TimePeriod>('today')

    // const allPosts = computed(() => store.allPosts)
    // store.fetchPosts()

    const setActiveTab = (tab: TimePeriod) => {
      activeTab.value = tab
    }
    const handleLike = (postId: number) => {
      const post = posts.value.find(x => x.id === postId)
      if (post) {
        post.likes++
      }
    }

    return {
      posts: posts,
      tabs,
      activeTab,
      setActiveTab,
      handleLike
    }
  }
})
</script>

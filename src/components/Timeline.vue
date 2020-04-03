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
    />
  </nav>
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent, ref, computed } from 'vue'

import { useStore } from '../store'
import { filterPosts } from './timelineUtils'
import TimelineItem from './TimelineItem.vue'
import { TimePeriod, Post } from '../types'
import { delay } from '../utils'

export default defineComponent({
  name: 'Timeline',

  components: {
    TimelineItem
  },
  
  async setup() {
    const tabs: TimePeriod[] = ['today', 'this week', 'this month']
    const activeTab = ref<TimePeriod>('today')

    const store = useStore()
    if (!store.getState().posts.loaded) {
      await delay()
      await store.fetchPosts()
    }
    const filteredPosts = computed(() => filterPosts(store.allPosts, activeTab.value))

    const setActiveTab = (tab: TimePeriod) => {
      activeTab.value = tab
    }

    return {
      posts: filteredPosts,
      tabs,
      activeTab,
      setActiveTab,
    }
  }
})
</script>

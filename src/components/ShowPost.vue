<template>

  <Suspense>
    <template #default>
      <PostViewer />
    </template>

    <template #fallback>
      <div class="columns">
        <div class="column is-one-third"></div>
        <div class="column is-one-third">
          <Loader />
        </div>
        <div class="column is-one-third"></div>
      </div>
    </template>
  </Suspense> 

</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent } from 'vue'
import { useRouter } from '@posva/vue-router-next'

import PostViewer from './PostViewer.vue'
import Loader from './Loader.vue'
import { Post } from '../types'
import { useStore } from '../store'

export default defineComponent({
  components: {
    PostViewer,
    Loader,
  },

  setup() {
    const router = useRouter()
    const store = useStore()
  } 
})
</script>
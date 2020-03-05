<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      {{ post.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { PostsStore } from './store'

export default defineComponent({
  name: 'HelloWorld',

  setup() {
    const store = new PostsStore()
    const posts = computed(() => { 
      return store.getState().posts
    })

    window.setTimeout(() => {
      store.fetchPosts()
    }, 500)

    return { posts }
  }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

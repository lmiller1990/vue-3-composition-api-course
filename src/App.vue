<template>
  <div id="app">
    <Topnav />

    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

import Topnav from './components/Topnav.vue'
import Home from './components/Home.vue'

export default defineComponent({
  name: 'App',
  components: {
    Topnav,
    Home,
  }
});
</script>

<style>
#tutorial {
  border: 1px solid;
}
</style>

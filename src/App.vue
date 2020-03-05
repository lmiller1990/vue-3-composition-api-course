<template>
  <div id="app">
    <Topnav />

    <section class="section">
      <div class="container">
        <!-- <HelloWorld /> -->
        <!-- <Home /> -->
        <router-view />
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Topnav from './components/Topnav.vue'
import Home from './components/Home.vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    Topnav,
    HelloWorld,
    Home
  }
});
</script>

<style>
#tutorial {
  border: 1px solid;
}
</style>

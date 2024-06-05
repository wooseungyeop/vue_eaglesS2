<script setup>
import Navigation from "./Navigation.vue";
import VideoPlayer from "./VideoPlayer.vue";
</script>

<template>
  <body>
    <Navigation />
    <VideoPlayer />
    <RouterView />
  </body>
</template>

<style scoped></style>

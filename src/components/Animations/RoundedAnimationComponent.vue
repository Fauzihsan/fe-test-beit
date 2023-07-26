<template>
  <span :class="`animate-ping absolute top-0 right-0 h-${prop.width} w-${prop.height} rounded-full bg-secondary opacity-75`"></span>
</template>

<script setup lang="js">
import { defineProps } from 'vue';
const prop = defineProps({
  width: {
    default: 2,
    type: Number,
  },
  height: {
    default: 2,
    type: Number,
  },
});
</script>

<style scoped></style>

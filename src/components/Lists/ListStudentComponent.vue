<template>
  <div class="border-b-2 border-gray-700 py-3">
    <h3 class="text-lg font-semibold mb-2 text-gray-200">{{ prop.title }}</h3>
    <ul class="text-red-300">
      <li v-for="(student, siswaKey) in prop.data" :key="siswaKey">{{ student.name }} (Nilai: {{ student.score }})</li>
    </ul>
  </div>
</template>

<script setup lang="js">
import { defineProps } from 'vue';
const prop = defineProps({
    title: {
        default : "",
        type : String,
    },
  data: {
    default: null,
    type: Object,
  },
});
</script>

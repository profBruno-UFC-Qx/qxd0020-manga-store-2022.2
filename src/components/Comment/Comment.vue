<script setup lang="ts">
import Rating from './Rating.vue'

defineProps<{
  rating: number,
  description: string
}>()
</script>

<template>
  <div class="mt-2">
    <Rating 
    :value="rating"></Rating>
  </div>
  {{ description }}
</template>
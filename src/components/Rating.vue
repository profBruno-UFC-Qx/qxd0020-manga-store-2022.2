<script setup lang="ts">
defineProps<{
  value: number,
  description: string
}>()
</script>
<template>
 <i class="bi bi-star-fill text-warning" v-for="i in value"></i>
{{description}}
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = defineProps<{
  current: number,
  total: number
}>()


const route = useRoute()
const url = route.name?.toString()

</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <router-link class="page-link" aria-label="Previous" :class="{disabled: current == 1}" :to="{ name: url, query: { page: current -1 }}">
        <span aria-hidden="true">&laquo;</span>
      </router-link>

      <li class="page-item" v-for="pageNumber in total" :key="pageNumber">
        <router-link
        class="page-link" 
        :class="{ active: current == pageNumber}" 
        :to="{ name: url, query: { page: pageNumber }}">{{ pageNumber }}
      </router-link>
      </li>
      

      <router-link class="page-link" aria-label="Next" :class="{disabled: current == total}" :to="{ name: url, query: { page: current + 1 }}">
        <span aria-hidden="true">&raquo;</span>
      </router-link>
    </ul>
  </nav>
</template>
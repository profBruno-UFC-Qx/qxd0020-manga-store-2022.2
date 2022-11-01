<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MangaCard from '../components/MangaCard.vue'
import { api } from '../baseConfig'

interface Cover {
  url: string,
  formats: object
}

interface Manga {
  id: number,
  cover: Cover
  title: string,
  summary: string,
  price: number,
  number: number
}

const mangas = ref<Manga[]>([])

onMounted( async () => {
  const response = await api.get("/mangas", {
    params: {
      populate: "cover",
      "pagination[pageSize]": 24
    }
  })
  mangas.value = response.data.data
})

</script>

<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <MangaCard v-for="manga in mangas" :key="manga.id"
        :id="manga.id"
        :cover="manga.cover.url"
        :title="manga.title"
        :summary="manga.summary"
        :price="manga.price"
        :number="manga.number"></MangaCard>
    </div>
  </div>
</template>
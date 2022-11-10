<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../../baseConfig'
import { coverURL} from '../../mixing/uploadUtil'

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
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Título</th>
        <th>Capa</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="manga in mangas" :key="manga.id">
        <td>{{manga.number}}</td>
        <td>{{manga.title}}</td>
        <td><img :src="coverURL(manga.cover.url)" :alt="'capa do manga' + manga.title"/></td>
        <td>
          <a href="#" class="btn btn-danger">Delete</a>
          <a href="#" class="btn btn-info">Editar</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>
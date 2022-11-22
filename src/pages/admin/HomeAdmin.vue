<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { coverURL } from '../../mixing/uploadUtil'
import { useMangaStore } from '../../stores/manga'
import { isApplicationError } from '../../mixing/errorMessageMixing'
import PaginationButtons from '../../components/PaginationButtons.vue'
import { onBeforeRouteUpdate } from 'vue-router'

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

interface Pagination {
  page: number,
  pageSize: number,
  pageCount: number
  total: number
}

const mangas = ref<Manga[]>([])
const pagination = ref<Pagination>({} as Pagination)
const mangaStore = useMangaStore()

const alertType = ref('')
const alertMessage = ref('')

async function loadMangas(page = 1) {
  const result = await mangaStore.all(page)
  if (!isApplicationError(result)) {
    mangas.value = result.mangas
    pagination.value = result.pagination
  }
}
onBeforeMount(async () => {
  await loadMangas()
})


onBeforeRouteUpdate(async (to, from) => {
  if (to.query.page !== from.query.page) {
    await loadMangas(Number(to.query.page))
  }
})

async function remover(id: number) {
  console.log(`Deletando manga com id = ${id}`)
  const result = await mangaStore.remove(id)
  if (isApplicationError(result)) {
    alertType.value = "danger"
    alertMessage.value = `${result.name} - ${result.message}`
  } else {
    alertType.value = "success"
    alertMessage.value = `Manga ${result.title} removido`

    mangas.value = mangas.value.filter(m => m.id !== id)
  }
}
</script>

<template>
  <div class="alert" :class="'alert-' + alertType" role="alert" v-if="alertType">
    {{ alertMessage }}
  </div>
  <router-link to="/mangas/novo" class="btn btn-primary">Novo</router-link>
  <PaginationButtons :current="pagination.page" :total="pagination.pageCount"></PaginationButtons>
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
        <td>{{ manga.number }}</td>
        <td>{{ manga.title }}</td>
        <td><img :src="coverURL(manga.cover.url)" :alt="'capa do manga' + manga.title" /></td>
        <td>
          <a href="#" class="btn btn-danger" @click="remover(manga.id)">Delete</a>
          <router-link :to="'/mangas/' + manga.id + '/editar'" class="btn btn-info">Editar</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
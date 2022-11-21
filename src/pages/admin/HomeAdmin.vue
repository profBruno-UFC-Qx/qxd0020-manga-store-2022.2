<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../../baseConfig'
import { coverURL} from '../../mixing/uploadUtil'
import { useMangaStore } from '../../store/manga'
import { isApplicationError } from '../../mixing/errorMessageMixing'

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
const mangaStore = useMangaStore()

const alertType = ref('')
const alertMessage = ref('')

onMounted( async () => {
  const response = await api.get("/mangas", {
    params: {
      populate: "cover",
      "pagination[pageSize]": 24
    }
  })
  mangas.value = response.data.data
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
          <a href="#" class="btn btn-danger" @click="remover(manga.id)">Delete</a>
          <router-link :to="'/mangas/' + manga.id + '/editar'" class="btn btn-info">Editar</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useMangaStore } from '../../../stores/manga'
import { isApplicationError } from '../../../mixing/errorMessageMixing'
import { coverURL } from '../../../mixing/uploadUtil'

const props = defineProps<{
  id: string
}>()

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

const mangaStore = useMangaStore()
const manga = ref<Manga>({} as Manga)

const alertMessage = ref('')
const alertVisible = computed(() => alertMessage.value)
const alertFeedback = ref(false)

onMounted( async () => {
  if(props.id) {
      const result = await mangaStore.get(Number(props.id))
    if (!isApplicationError(result)) {
      manga.value = result
    }
  }
})

async function update() {
  const result = await mangaStore.update(manga.value)
  if (isApplicationError(result)) {
    alertFeedback.value = false
    alertMessage.value = `${result.name} - ${result.message}`
  } else {
    manga.value = result
    alertFeedback.value = true
    alertMessage.value = `Manga ${result.title} atualizado`
  }
}

</script>

<template>
  <div class="text-center" v-if="!manga.id && props.id">
      <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
  </div>
  <template v-else>
      <div class="col-12 alert alert-dismissible fade show" :class="{ 'd-none': !alertVisible, 'alert-success': alertFeedback, 'alert-danger': !alertFeedback }" role="alert">
          {{ alertMessage }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <img class="col-auto" v-if="manga.cover" :src="coverURL(manga.cover.url)"/>
      <div class="row text-start">
          <div class="col-12 mb-3">
              <label for="coverInput" class="form-label">Manga cover</label>
              <input type="file" id="coverInput" accept="image/*" class="form-control">
          </div>
          <div class="col-12 mb-3">
              <label for="titleInput" class="form-label">Manga title</label>
              <input type="text" id="titleInput" class="form-control" v-model="manga.title" placeholder="an awesome title">
          </div>
           <div class="col-3 mb-3 ">
              <label for="numberInput" class="form-label">Manga number</label>
              <input type="number" id="numberInput" class="form-control" v-model="manga.number" placeholder="volume number">
          </div>
          <div class="col-2 mb-3">
              <label for="priceInput" class="form-label">Manga price</label>
              <input type="text" id="priceInput" class="form-control" v-model="manga.price" placeholder="00.00">
          </div>
      </div>
      <router-link to="/admin" class="btn btn-danger">Cancel</router-link> 
      <a class="btn btn-primary" v-if="manga.id" @click="update">Update</a>
      <a class="btn btn-success" v-else >Create</a>
  </template>
</template>
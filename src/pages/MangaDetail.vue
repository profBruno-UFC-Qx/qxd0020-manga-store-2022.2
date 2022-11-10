<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../baseConfig'
import { coverURL} from '../mixing/uploadUtil'
import CommentContainer from '../components/Comment/Container.vue'

interface Comment {
  description: string,
  rating: number
}

interface Cover {
  alternativeText: string,
  url: string
}

interface Manga {
  id: number,
  cover: Cover
  title: string,
  summary: string,
  number: number,
  price: number
  comments: Comment[]
}

const route = useRoute()
const id = route.params.id
const manga = ref<Manga>({} as Manga)

onMounted( async () => {
  const response = await api.get(`/mangas/${id}`, {
    params: {
      populate: "cover, comments",
    }
  })
  const { data } = response
  manga.value = data.data
})




</script>

<template>
    <template v-if="manga.cover">
      <div class="row align-items-center" >
        <div class="col">
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img  :src="coverURL(manga.cover.url)" class="w-75 rounded-start" :alt="manga.cover.alternativeText">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{manga.title}}</h5>
                            <hr>
                            <div class="text-start">
                                <p class="card-text">Volume: {{manga.number}}</p>
                                <p class="card-text"><strong>Preço: <small class="text-danger">{{manga.price}}</small></strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <CommentContainer :comments="manga.comments"></CommentContainer>
    </template>
    <div v-else>
      <h1>Carregando</h1>
    </div>
</template>
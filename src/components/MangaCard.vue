<script setup lang="ts">
import { coverURL} from '../mixing/uploadUtil'

defineProps<{
    id: number,
    cover: string
    title: string,
    number: number,
    price: number
}>()


</script>

<template>
    <div class="col-lg-3 col-md-4 col-sm-1">
      <router-link :to="'/mangas/' + id">
      <div class="card shadow-sm">
        <img class="bd-placeholder-img card-img-top" width="100%" :src="coverURL(cover)" />
          <div class="card-body text-center">
              <h5 class="card-title">{{number}} - {{title}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Preço: {{price}}</h6>
              <div class="d-flex justify-content-between align-items-center">
              <!--<small class="text-muted">9 mins</small>-->
              </div>
          </div>  
      </div>
      </router-link>
    </div>
</template>
<script setup lang="ts">
import Comment from './Comment.vue'

interface Comment {
  description: string,
  rating: number
}

defineProps<{
  comments: Comment[]
}>()

</script>

<template>
<div class="row align-items-center" >
  <div class="col ms-3" v-if="comments.length > 0">
    <Comment v-for="comment in comments"
    :description="comment.description"
    :rating="comment.rating"
    ></Comment>
  </div>
  <div v-else>
    Seja o primeira a comentar
  </div>
</div>  
</template>
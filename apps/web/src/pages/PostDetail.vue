<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import { postsApi, type PostDetail } from '../api/posts';

const route = useRoute();
const post = ref<PostDetail | null>(null);

onMounted(async () => {
  post.value = await postsApi.detail(String(route.params.id));
});

const html = computed(() => (post.value ? marked.parse(post.value.content) : ''));
</script>

<template>
  <div v-if="post">
    <h1 style="margin:0 0 8px;">{{ post.title }}</h1>
    <p style="opacity:.7; margin-top:0;">{{ post.summary }}</p>
    <div v-html="html" style="line-height:1.8;"></div>
  </div>
</template>

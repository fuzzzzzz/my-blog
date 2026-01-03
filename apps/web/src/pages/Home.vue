<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { postsApi, type PostListItem } from '../api/posts';

const loading = ref(false);
const list = ref<PostListItem[]>([]);

onMounted(async () => {
  loading.value = true;
  try { list.value = await postsApi.list(); }
  finally { loading.value = false; }
});
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <div v-for="p in list" :key="p.id" style="padding:12px 0; border-bottom:1px solid #eee; cursor:pointer;"
         @click="$router.push(`/posts/${p.id}`)">
      <h3 style="margin:0 0 6px;">{{ p.title }}</h3>
      <p style="margin:0; opacity:.8;">{{ p.summary }}</p>
      <small style="opacity:.6;">{{ new Date(p.createdAt).toLocaleString() }}</small>
    </div>
  </div>
</template>

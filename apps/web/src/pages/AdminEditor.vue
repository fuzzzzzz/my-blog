<script setup lang="ts">
import { computed, ref } from 'vue';
import { marked } from 'marked';
import { postsApi } from '../api/posts';

const title = ref('我的第一篇文章');
const summary = ref('这是一段摘要');
const content = ref('# Hello Blog\n\n这是一篇 Markdown 文章。');
const status = ref<'DRAFT' | 'PUBLISHED'>('PUBLISHED');
const msg = ref('');

const preview = computed(() => marked.parse(content.value));

async function submit() {
  msg.value = '';
  try {
    await postsApi.create({ title: title.value, summary: summary.value, content: content.value, status: status.value });
    msg.value = '发布成功';
  } catch {
    msg.value = '发布失败：请先登录';
  }
}
</script>

<template>
  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
    <div>
      <h3>写文章</h3>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <input v-model="title" placeholder="标题" />
        <input v-model="summary" placeholder="摘要" />
        <select v-model="status">
          <option value="PUBLISHED">发布</option>
          <option value="DRAFT">草稿</option>
        </select>
        <textarea v-model="content" rows="16" placeholder="Markdown 内容"></textarea>
        <button @click="submit">提交</button>
        <small>{{ msg }}</small>
      </div>
    </div>
    <div>
      <h3>预览</h3>
      <div v-html="preview" style="border:1px solid #eee; padding:12px; line-height:1.8;"></div>
    </div>
  </div>
</template>

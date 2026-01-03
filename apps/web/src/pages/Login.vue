<script setup lang="ts">
import { ref } from 'vue';
import { http } from '../api/http';

const username = ref('admin');
const password = ref('admin123');
const msg = ref('');

async function login() {
  msg.value = '';
  try {
    const { token } = await http.post('/auth/login', { username: username.value, password: password.value }).then(r => r.data);
    localStorage.setItem('token', token);
    msg.value = '登录成功';
  } catch (e: any) {
    msg.value = '登录失败';
  }
}
</script>

<template>
  <div style="max-width:360px;">
    <h3>登录</h3>
    <div style="display:flex; flex-direction:column; gap:8px;">
      <input v-model="username" placeholder="username" />
      <input v-model="password" type="password" placeholder="password" />
      <button @click="login">Login</button>
      <small>{{ msg }}</small>
    </div>
  </div>
</template>

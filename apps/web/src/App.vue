<template>
  <div style="max-width: 900px; margin: 24px auto; padding: 0 16px;">
    <header style="display:flex; gap:12px; align-items:center; justify-content:space-between; margin-bottom:16px;">
      <h2 style="margin:0; cursor:pointer;" @click="$router.push('/')">My Blog</h2>
      <nav style="display:flex; gap:12px;">
        <a href="#" @click.prevent="$router.push('/admin')">写文章</a>
        <a href="#" @click.prevent="$router.push('/login')">登录</a>
      </nav>
    </header>
    <router-view />
  </div>
</template>

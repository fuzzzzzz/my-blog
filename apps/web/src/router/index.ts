import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import PostDetail from '../pages/PostDetail.vue';
import Login from '../pages/Login.vue';
import AdminEditor from '../pages/AdminEditor.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/posts/:id', component: PostDetail },
    { path: '/login', component: Login },
    { path: '/admin', component: AdminEditor },
  ],
});

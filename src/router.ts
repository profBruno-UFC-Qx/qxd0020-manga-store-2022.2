import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import HomeAdmin from './pages/admin/HomeAdmin.vue'
import MangaDetail from './pages/MangaDetail.vue'
import MangaForm from './pages/admin/Manga/Form.vue'
import Page403 from './pages/Page403.vue'
import Page404 from './pages/Page404.vue'

const routes = [
  { 
    path: '/', 
    component: Home, 
    alias: '/home' 
  },
  { 
    path: '/mangas/:id', 
    component: MangaDetail, 
  },
  { 
    path: '/mangas/:id/editar', 
    component: MangaForm,
    props: true,
    meta: { requiresAdmin: true }
  },
  { 
    path: '/mangas/novo', 
    component: MangaForm,
    meta: { requiresAdmin: true }
  },
  {
    path: '/login',
    component: Login
  },
  { 
    path: '/admin', 
    component: HomeAdmin, 
    meta: { requiresAdmin: true }
  },
  {
    path: '/forbiden',
    component: Page403,
  },
  {
    path: '/notfound',
    component: Page404,
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { api } from './baseConfig'
import { userStore, userStore } from './store/user'
import App from './App.vue'


api.interceptors.response.use(response => response, error => {
  const { response } = error
  if (response.status === 403) {
    router.replace('/forbiden')
  } else if (response.status === 404) {
    router.replace('/notfound')
  } else {
    return Promise.reject(error)
  }
});

router.beforeEach((to, from) => {
  if(to.meta.requiresAdmin) {
    const store = userStore()
    if(!store.isAdmin) {
      return '/login'
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

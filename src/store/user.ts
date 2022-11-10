import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../baseConfig'

interface User {
  jwt: string,
  id: number,
  username: string,
  email: string,
  role: string
}

interface State {
  user: User
}

export const userStore = defineStore('user', () => {
  const user = ref<User>({} as User)
  const isAdmin = computed(() => user.value.role === "Admin")
  
  async function authenticate(identifier: string, password: string) {
    try {
      const res = await api.post("/auth/local", {
        identifier,
        password
      })
      const { data } = res
      user.value = {
        jwt: data.jwt,
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: ""
      }
      user.value.role = await getRole()
      return ""
    } catch(error) {
      console.log("deu zebra")
      console.log(error.response.data.error.message)
      return error.response.data.error.message
    }
  }

  async function getRole(){
    const res = await api.get("/users/me", {
      headers : {
        Authorization: `Bearer ${user.value.jwt}`
      },
    })
    const { data } = res
    return data.role.name
  }
  
 
  return {user, isAdmin, authenticate, getRole}
})
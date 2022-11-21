import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../baseConfig'
import { ApplicationError, getAppError, isApplicationError } from '../mixing/errorMessageMixing'

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
  
  async function authenticate(identifier: string, password: string): Promise<User | ApplicationError> {
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
      const userRole = await getRole()
      if(isApplicationError(userRole)) throw userRole
      user.value.role = userRole
      return user.value
    } catch(error) {
      return getAppError(error)
    }
  }

  async function getRole(): Promise<string | ApplicationError>{
    try {
      const res = await api.get("/users/me", {
        headers : {
          Authorization: `Bearer ${user.value.jwt}`
        },
      })
      const { data } = res
      return data.role.name
    } catch(error) {
      return getAppError(error)
    }

  }
  
 
  return {user, isAdmin, authenticate, getRole}
})
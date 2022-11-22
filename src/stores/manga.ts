import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../baseConfig'
import { ApplicationError, getAppError } from '../mixing/errorMessageMixing'
import { userStore } from './user'

interface Cover {
  url: string,
  formats: object
}

interface Manga {
  id: number,
  cover: Cover
  title: string,
  summary: string,
  price: number,
  number: number
}

interface Pagination {
  page: number,
  pageSize: number,
  pageCount: number
  total: number
}

interface MangaCollection {
  mangas: Manga[]
  pagination: Pagination
}


export const useMangaStore = defineStore('manga', () => {


async function all(page = 1): Promise<MangaCollection | ApplicationError> {
  try {
    const { data } = await api.get("/mangas", {
      params: {
        populate: "cover",
        "pagination[page]": page,
        "pagination[pageSize]": 24
      }
    })
    return { mangas: data.data, pagination: data.meta.pagination}
  } catch(error) {
    return getAppError(error)
  }
}

  async function remove(id: number): Promise<Manga | ApplicationError> {
    const store = userStore()
    const token = store.user.jwt
    try {
      const res = await api.delete(`/mangas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const { data } = res
      return data.data
    } catch (error) {
      return getAppError(error)
    }
  }

  async function get(id: number): Promise<Manga | ApplicationError> {
    const store = userStore()
    const token = store.user.jwt
    try {
      const res = await api.get(`/mangas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          populate: 'cover'
        }
      })
      const { data } = res
      return data.data
    } catch (error) {
      return getAppError(error)
    }
  }

  async function update(manga: Manga): Promise<Manga | ApplicationError> {
    const store = userStore()
    const token = store.user.jwt
    try {
      const { id, title, number, price } = manga
      const res = await api.put(`/mangas/${id}`, {
        data: {
          title,
          price,
          number
        }
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
      const { data } = res
      return get(data.data.id)
    } catch (error) {
      return getAppError(error)
    }
  }

  return { all, get, remove, update }
})
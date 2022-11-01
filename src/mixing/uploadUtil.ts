import { baseURL } from '../baseConfig'

export function coverURL(coverName: string) {
  return `${baseURL}${coverName}`
}
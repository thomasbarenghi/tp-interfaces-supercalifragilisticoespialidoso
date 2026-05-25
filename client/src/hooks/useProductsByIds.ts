import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import type { Product } from '../types/product'

export const useProductsByIds = (ids: string[]) => {
  return useSWR<Product[]>(ids.length > 0 ? `products:${ids.join(',')}` : null, () =>
    Promise.all(ids.map((id) => fetcher<Product>(`/api/products/${id}`))),
  )
}

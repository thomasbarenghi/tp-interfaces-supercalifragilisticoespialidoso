import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import type { Product } from '../types/product'

export const useProduct = (slug: string) => {
  return useSWR<Product>(slug ? `/api/products/${slug}` : null, fetcher)
}

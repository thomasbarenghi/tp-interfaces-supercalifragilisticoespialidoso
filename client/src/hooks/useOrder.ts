import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import type { Order } from '../types/order'

export const useOrder = (orderNumber: string) => {
  const { data, isLoading, error } = useSWR<Order[]>(
    orderNumber ? `/api/orders?orderNumber=${orderNumber}` : null,
    fetcher,
  )

  return {
    order: data?.[0] ?? null,
    isLoading,
    notFound: !isLoading && !error && data !== undefined && data.length === 0,
    error,
  }
}

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useEnrichedCart } from './useEnrichedCart'
import { fetcher } from '../lib/fetcher'
import type { Cart, CartItem } from '../types/cart'
import type { Product } from '../types/product'
import type { Order } from '../types/order'

const validateCvv = (cvv: string) => cvv !== '666'

const fetchProducts = (items: CartItem[]) =>
  Promise.all(items.map((item) => fetcher<Product>(`/api/products/${item.productId}`)))

const postOrder = async (payload: object): Promise<{ id: string; orderNumber: string }> => {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error()
  return res.json()
}

const updateStock = (items: CartItem[], products: Product[]) =>
  Promise.all(
    items.map((item, i) =>
      fetch(`/api/products/${item.productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalStock: products[i].totalStock - item.quantity }),
      }),
    ),
  )

interface OrderItem {
  id: string
  productId: string
  name: string
  image: string
  quantity: number
  unitPrice: number
}

const buildOrder = (cart: Cart, items: OrderItem[], subtotal: number): Omit<Order, 'id'> => {
  const now = new Date().toISOString()
  const year = new Date().getFullYear()
  const orderNumber = `HR-${year}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const fromDate = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
  const toDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  return {
    orderNumber,
    cartId: cart.id,
    status: 'confirmed',
    paymentStatus: 'paid',
    fulfillmentStatus: 'pending',
    currency: 'ARS',
    createdAt: now,
    estimatedDelivery: {
      from: fmt(fromDate),
      to: fmt(toDate),
      label: `Llega entre el ${fromDate.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })} y ${toDate.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}`,
    },
    customer: { email: 'marcos@example.com', phone: '+54 11 5555 0000' },
    shippingAddress: {
      firstName: 'Marcos',
      lastName: 'García',
      address: 'Av. Corrientes 1234, 5° B',
      city: 'Caseros',
      province: 'Buenos Aires',
      postalCode: '1678',
      country: 'AR',
    },
    payment: { method: 'credit_card', provider: 'visa', installments: 1, last4: '3456' },
    shipping: {
      carrier: 'Andreani',
      trackingCode: `AR${String(Math.floor(Math.random() * 99999999)).padStart(8, '0')}CL`,
      trackingUrl: 'https://seguimiento.andreani.com/',
      currentStatus: 'Procesando',
    },
    tracking: {
      currentStep: 1,
      steps: [
        {
          id: 'confirmed',
          title: 'Pedido confirmado',
          description: 'Recibimos tu pedido y el pago fue acreditado.',
          status: 'current',
          date: now,
        },
        {
          id: 'packing',
          title: 'Preparando tu paquete',
          description: 'Estamos empacando los productos en nuestro depósito.',
          status: 'pending',
          date: null,
        },
        {
          id: 'shipped',
          title: 'Despachado',
          description: 'El paquete fue entregado al transportista para su distribución.',
          status: 'pending',
          date: null,
        },
        {
          id: 'in_transit',
          title: 'En camino',
          description: 'Tu paquete está en tránsito.',
          status: 'pending',
          date: null,
        },
        {
          id: 'city_hub',
          title: 'En tu ciudad',
          description: 'Llegará a la sucursal más cercana para la entrega final.',
          status: 'pending',
          date: null,
        },
        {
          id: 'out_for_delivery',
          title: 'En reparto',
          description: 'El repartidor sale con tu paquete.',
          status: 'pending',
          date: null,
        },
        {
          id: 'delivered',
          title: 'Entregado',
          description: 'Recibirás un mail con el comprobante.',
          status: 'pending',
          date: null,
        },
      ],
    },
    items: items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      category: '',
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      subtotal: item.unitPrice * item.quantity,
      image: item.image,
    })),
    summary: { subtotal, shipping: 0, discount: 0, total: subtotal },
  }
}

export const usePlaceOrder = (cvv: string) => {
  const { items, subtotal, isEmpty, cart, clearCart } = useEnrichedCart()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const submitted = useRef(false)

  const placeOrder = async () => {
    if (!validateCvv(cvv)) {
      navigate('/checkout/error')
      return
    }

    if (!cart) return

    setIsLoading(true)

    try {
      const products = await fetchProducts(cart.items)
      const createdOrder = await postOrder(buildOrder(cart, items, subtotal))
      await updateStock(cart.items, products)

      submitted.current = true
      clearCart()
      navigate(`/checkout/success?order.id=${createdOrder.orderNumber}`)
    } catch {
      navigate('/checkout/error')
    } finally {
      setIsLoading(false)
    }
  }

  return { placeOrder, isLoading, items, subtotal, isEmpty, submitted }
}

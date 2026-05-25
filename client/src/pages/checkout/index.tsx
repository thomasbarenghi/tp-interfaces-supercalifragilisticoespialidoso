import { useState } from 'react'
import { Navigate } from 'react-router'
import ContactForm from './components/ContactForm.tsx'
import ItemsCard from '../../components/ItemsCard'
import PaymentSummary from '../../components/PaymentSummary'
import PaymentForm from './components/PaymentForm'
import ShippingForm from './components/ShippingForm.tsx'
import Stepper, { type Step } from '../../components/Stepper'
import Main from '../../components/Main'
import TwoColumnLayout from '../../components/TwoColumnLayout'
import { usePlaceOrder } from '../../hooks/usePlaceOrder'

const STEPS: Step[] = [
  { label: 'Carrito', status: 'completed' },
  { label: 'Pago', status: 'current' },
  { label: 'Confirmación', status: 'pending' },
]

const Checkout = () => {
  const [cvv, setCvv] = useState('')
  const { placeOrder, isLoading, items, subtotal, isEmpty, submitted } = usePlaceOrder(cvv)

  if (isEmpty && !submitted.current) return <Navigate to="/list" replace />

  return (
    <Main>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">Finalizar compra</h1>
        <div className="hidden sm:block">
          <Stepper steps={STEPS} />
        </div>
      </div>

      <TwoColumnLayout>
        <TwoColumnLayout.Main>
          <ContactForm />
          <ShippingForm />
          <PaymentForm cvv={cvv} onCvvChange={setCvv} />
        </TwoColumnLayout.Main>

        <TwoColumnLayout.Sidebar>
          <ItemsCard title="Tu pedido" items={items} />
          <PaymentSummary
            subtotal={subtotal}
            shipping={0}
            total={subtotal}
            showAction
            onAction={placeOrder}
            isLoading={isLoading}
          />
        </TwoColumnLayout.Sidebar>
      </TwoColumnLayout>
    </Main>
  )
}

export default Checkout

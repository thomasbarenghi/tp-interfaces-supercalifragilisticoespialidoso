import ContactForm from './components/ContactForm.tsx'
import EmptyCart from './components/EmptyCart.tsx'
import ItemsCard from '../../components/ItemsCard'
import PaymentSummary from '../../components/PaymentSummary'
import PaymentForm from './components/PaymentForm'
import ShippingForm from './components/ShippingForm.tsx'
import Stepper, { type Step } from '../../components/Stepper'
import { mockCart } from '../../mocks/cart.ts'
import Main from '../../components/Main'
import TwoColumnLayout from '../../components/TwoColumnLayout'

const STEPS: Step[] = [
  { label: 'Carrito', status: 'completed' },
  { label: 'Pago', status: 'current' },
  { label: 'Confirmación', status: 'pending' },
]

const Checkout = () => {
  const cart = mockCart
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // TODO: esto no es correcto
  if (cart.items.length === 0) return <EmptyCart />

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
          <PaymentForm />
        </TwoColumnLayout.Main>

        <TwoColumnLayout.Sidebar>
          <ItemsCard
            title="Tu pedido"
            items={cart.items.map((item) => ({
              id: item.id,
              name: item.name,
              image: item.image,
              quantity: item.quantity,
              price: item.price * item.quantity,
            }))}
          />
          <PaymentSummary subtotal={subtotal} shipping={0} total={subtotal} showAction />
        </TwoColumnLayout.Sidebar>
      </TwoColumnLayout>
    </Main>
  )
}

export default Checkout

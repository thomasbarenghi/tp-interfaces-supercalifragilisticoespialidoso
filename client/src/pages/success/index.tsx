import Main from '../../components/Main'
import {OrderResult} from '../../components/OrderResult'
import { usePageTitle } from '../../hooks/usePageTitle'
import Stepper, { type Step } from '../../components/Stepper'
import { useSearchParams, useNavigate } from 'react-router'
import { useOrder } from '../../hooks/useOrder'
import { Button, Surface } from '@heroui/react'
import { ROUTES } from '../../config/routes'
import { Check } from '@gravity-ui/icons'

const STEPS: Step[] = [
  { label: 'Carrito', status: 'completed' },
  { label: 'Pago', status: 'completed' },
  { label: 'Confirmación', status: 'completed' },
]

const Success = () => {

            
    const [orderURL] = useSearchParams()
    const navigate = useNavigate()

    const orderID = orderURL.get('order.id') // Trae el id del pedido desde la URL
    const {order} = useOrder(orderID || '') // Trae los datos del pedido usando el id
    console.log(order)
    
    
    
//pedido va MUTED
//Seguir mi compra -> tracking/:id
//Ver mas productos -> list
//#DCF2E2
    usePageTitle('Felicitaciones')
    return (
        <Main contentClassName="flex flex-col items-center gap-8">
        <OrderResult>
  <OrderResult.Stepper>
    <Stepper steps={STEPS} />
  </OrderResult.Stepper>

  <OrderResult.Icon>
    <div className="p-6 rounded-full bg-[#DCF2E2]">
      <div className="flex justify-center items-center p-2 rounded-full bg-[#16A34A]">
        <Check width={64} height={64} className="text-white" />
      </div>
    </div>
  </OrderResult.Icon>

  <OrderResult.Title>
    ¡Gracias por tu compra, {order?.shippingAddress.firstName}!
  </OrderResult.Title>

  <OrderResult.Description>
    Tu pedido fue confirmado y ya lo estamos preparando.
  </OrderResult.Description>

  <OrderResult.Metadata>
    <Surface
      className="p-2.5 px-4 rounded-full leading-3"
      variant="secondary"
    >
      <span className="text-xs text-muted">Pedido: </span>
      <span className="text-xs font-bold">
        #{order?.orderNumber}
      </span>
    </Surface>
  </OrderResult.Metadata>

  <OrderResult.Actions>
    <Button
      variant="outline"
      fullWidth
      className="rounded-full"
      onClick={() =>
        navigate(
          `${ROUTES.TRACKING}/${order?.orderNumber}`,
        )
      }
    >
      Seguir mi compra
    </Button>

    <Button
      variant="primary"
      fullWidth
      className="rounded-full"
      onClick={() => navigate(ROUTES.LIST)}
    >
      Ver más productos
    </Button>
  </OrderResult.Actions>
</OrderResult>
        </Main>
    )
}

export default Success
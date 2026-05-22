import { ShoppingCart } from '@gravity-ui/icons'
import { useNavigate } from 'react-router'
import EmptyState from '../../../components/EmptyState'

const EmptyCart = () => {
  const navigate = useNavigate()
  return (
    <EmptyState
      icon={<ShoppingCart width={28} height={28} className="text-(--accent)" />}
      title="Tu carrito está vacío"
      description="Explorá nuestra tienda y encontrá algo que te guste."
      action={{ label: 'Ver productos', onClick: () => navigate('/') }}
    />
  )
}

export default EmptyCart

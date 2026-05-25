import { useNavigate } from 'react-router'
import { Comment } from '@gravity-ui/icons'
import InfoCard from '../InfoCard'

const HelpCard = () => {
  const navigate = useNavigate()
  return (
    <InfoCard
      icon={<Comment width={18} height={18} className="text-(--accent)" />}
      title="Necesito ayuda"
      description="Hablá con nuestro equipo"
      onClick={() => navigate('/contact')}
    />
  )
}

export default HelpCard

import { Comment } from '@gravity-ui/icons'
import InfoCard from '../InfoCard'

const HelpCard = () => (
  <InfoCard
    icon={<Comment width={18} height={18} className="text-(--accent)" />}
    title="Necesito ayuda"
    description="Hablá con nuestro equipo"
  />
)

export default HelpCard

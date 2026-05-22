import { Switch } from '@heroui/react'
import { useDarkMode } from '../../hooks/useDarkMode.ts'
import Main from '../../components/Main'

const Home = () => {
  const { dark, toggle } = useDarkMode()

  return (
    <Main>
      <Switch isSelected={dark} onChange={toggle} aria-label="Dark mode">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    </Main>
  )
}

export default Home

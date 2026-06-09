import { Button, Link } from '@heroui/react'
import { useNavigate } from 'react-router'
import CategoryCard from '../../components/CategoryCard'
import ShowcaseSection from '../../components/ShowcaseSection'
import { categories } from './constants/categories'
import ProductGrid from '../../components/ProductGrid'
import { useProducts } from '../../hooks/useProducts.ts'
import CapsuleBanner from './components/CapsuleBanner.tsx'
import Main from '../../components/Main'
import { usePageTitle } from '../../hooks/usePageTitle.ts'
import { ROUTES } from '../../config/routes'

const Home = () => {
  usePageTitle('Inicio')
  const navigate = useNavigate()
  const { products } = useProducts({ limit: 4 })
  return (
    <Main>
      <ShowcaseSection>
        <ShowcaseSection.Header>
          <ShowcaseSection.Title eyebrow="CATEGORÍAS" title="Comprá por categoría" />

          <ShowcaseSection.Action>
            <Link
              className="underline underline-offset-2 text-foreground decoration-(--accent)"
              href="/list"
            >
              Ver todo
              <Link.Icon className="text-(--accent)" />
            </Link>
          </ShowcaseSection.Action>
        </ShowcaseSection.Header>

        <ShowcaseSection.Content>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </ShowcaseSection.Content>
      </ShowcaseSection>

      <ShowcaseSection>
        <ShowcaseSection.Header>
          <ShowcaseSection.Title eyebrow="MÁS POPULARES" title="Lo más vendido esta semana" />

          <ShowcaseSection.Action>
            <Link
              className="underline underline-offset-2 text-foreground decoration-(--accent)"
              href="/list"
            >
              Ver todo
              <Link.Icon className="text-(--accent)" />
            </Link>
          </ShowcaseSection.Action>
        </ShowcaseSection.Header>

        <ShowcaseSection.Content>
          <ProductGrid products={products} skeletonCount={4} />
        </ShowcaseSection.Content>
      </ShowcaseSection>
      <CapsuleBanner>
        <CapsuleBanner.Content>
          <CapsuleBanner.Eyebrow>EDICIÓN LIMITADA</CapsuleBanner.Eyebrow>

          <CapsuleBanner.Title>La cápsula Denim 2.0</CapsuleBanner.Title>

          <CapsuleBanner.Description>
            Diez piezas únicas en denim reciclado. Diseños limpios, calce relajado y detalles
            utilitarios.
          </CapsuleBanner.Description>

          <CapsuleBanner.Action>
            <Button onPress={() => navigate(`${ROUTES.LIST}?badge=capsula`)}>
              Descubrir cápsula
            </Button>
          </CapsuleBanner.Action>
        </CapsuleBanner.Content>

        <CapsuleBanner.Visual>
          <CapsuleBanner.Number>02</CapsuleBanner.Number>
        </CapsuleBanner.Visual>
      </CapsuleBanner>
    </Main>
  )
}

export default Home

import { useState } from 'react'
import { Button } from '@heroui/react'
import { ArrowRotateLeft, ShoppingCart } from '@gravity-ui/icons'
import InfoCard from '../../components/InfoCard'
import { mockProduct } from '../../mocks/product.ts'
import type { Product } from '../../types/product.ts'
import { formatPrice } from '../../utils/format.ts'
import Main from '../../components/Main'
import TwoColumnLayout from '../../components/TwoColumnLayout'

const formatSales = (count: number) =>
  count >= 1000 ? `+${Math.floor(count / 1000)}k` : `+${count}`

const ProductDetail = () => {
  const product: Product = mockProduct
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <Main>
      <TwoColumnLayout gap="xl">
        <TwoColumnLayout.Main>
          <div className="flex flex-col gap-3 lg:gap-7.5">
            <div className="rounded-2xl overflow-hidden aspect-17/18 w-full">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover dark:brightness-90 transition-[filter]"
              />
            </div>
            <div className="flex gap-3 lg:gap-7.5">
              {product.images.slice(0, 3).map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-(--accent)' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover dark:brightness-90 transition-[filter]"
                  />
                </button>
              ))}
            </div>
          </div>
        </TwoColumnLayout.Main>

        <TwoColumnLayout.Sidebar>
          <div className="flex flex-col gap-7.5 lg:py-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.3]">
                {product.name}
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold text-sm">★★★★★</span>
                <span className="font-bold text-sm">{product.rating.average}</span>
                <span className="size-0.75 rounded-full bg-muted shrink-0" />
                <span className="text-muted text-sm">
                  {formatSales(product.salesCount)} vendidos
                </span>
                <span className="size-0.75 rounded-full bg-muted shrink-0" />
                <span className="text-muted text-sm">{product.totalStock} en stock</span>
              </div>

              <p className="text-base leading-[1.8]">{product.description}</p>
            </div>

            <p className="text-xl lg:text-2xl font-bold">{formatPrice(product.price)}</p>

            <div className="flex flex-col gap-4">
              <Button variant="primary" fullWidth className="rounded-full">
                <ShoppingCart width={16} height={16} />
                Agregar al carrito
              </Button>
              <Button variant="outline" fullWidth className="rounded-full">
                Comprar ahora
              </Button>
            </div>

            <InfoCard
              icon={<ArrowRotateLeft width={18} height={18} className="text-(--accent)" />}
              title="Cambios gratis 30 días"
              description="Cambios y devoluciones a domicilio sin costo"
            />
          </div>
        </TwoColumnLayout.Sidebar>
      </TwoColumnLayout>
    </Main>
  )
}

export default ProductDetail

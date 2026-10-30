import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Carousel, Header, ProductCard, ProductName, storageStyles } from '../components'
import { orderUrl, products } from '../data'

export default function Product() {
  const { id } = useParams()
  const [atEnd, setAtEnd] = useState(false)
  const row = useRef(null)
  useEffect(() => {
    window.scrollTo(0, 0)
    row.current?.scrollTo(0, 0)
    setAtEnd(false)
  }, [id])
  const product = products.find((p) => p.id === id)
  if (!product) return <Navigate to="/catalog" replace />

  const related = products.filter((p) => p.category === product.category && p.id !== product.id)

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-cream pb-28">
      <Header title="商品型錄" back />
      <Carousel
        key={product.id}
        images={[product.image, ...(product.gallery ?? [])].map((src) => ({ src, fit: 'contain', className: 'bg-white p-3' }))}
        className="aspect-[390/237]"
        interval={0}
        arrows={false}
      />

      <section className="flex flex-col gap-2.5 border-b border-line p-5">
        {(product.brand || product.storage || product.soldOut) && (
          <div className="flex gap-2.5 text-[15px] leading-normal">
            {product.brand && (
              <span className="rounded-full border border-sakura bg-sakura-cream px-2.5 py-1 text-sakura">{product.brand}</span>
            )}
            {product.storage && (
              <span className={`rounded-full px-2.5 py-1 ${storageStyles[product.storage]}`}>{product.storage}</span>
            )}
            {product.soldOut && <span className="rounded-full bg-stone-800/80 px-2.5 py-1 text-white">備貨中</span>}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl leading-normal font-bold text-stone-800">
            <ProductName name={product.name} />
          </h1>
          <p className="text-[15px] leading-normal text-gray-500">{product.spec}</p>
        </div>
      </section>

      {product.features && (
        <section className="flex flex-col gap-1 border-b border-line p-5 text-[15px]">
          <h2 className="leading-normal font-bold text-stone-800">商品特色</h2>
          <ul className="list-disc pl-[22.5px] leading-normal text-neutral-800">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="pt-5">
          <h2 className="px-5 text-[15px] leading-normal font-bold text-stone-800">同系列商品</h2>
          <div className="relative mt-2.5">
            <div
              ref={row}
              onScroll={(e) => {
                const el = e.currentTarget
                setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
              }}
              className="no-scrollbar flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pt-1 pb-4"
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} className="w-[171px] shrink-0 snap-start" />
              ))}
            </div>
            {!atEnd && related.length > 2 && (
              <button
                onClick={() => row.current.scrollBy({ left: row.current.clientWidth * 0.4, behavior: 'smooth' })}
                aria-label="查看更多"
                className="absolute top-16 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/80 shadow backdrop-blur transition active:scale-90"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-stone-800 stroke-2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md min-w-[350px] border-t border-line bg-white px-5 pt-[15px] pb-[max(30px,env(safe-area-inset-bottom))]">
        {product.soldOut ? (
          <p className="w-full rounded-xl bg-stone-200 py-3 text-center text-[15px] leading-normal font-bold text-stone-500">
            商品備貨中，敬請期待
          </p>
        ) : (
          <a
            href={orderUrl}
            className="block w-full rounded-xl bg-brand py-3 text-center text-[15px] leading-normal font-bold text-white transition active:scale-95"
          >
            前往訂貨
          </a>
        )}
      </div>
    </div>
  )
}

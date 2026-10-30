import { useState } from 'react'
import { Carousel, ProductCard } from '../components'
import { banners, categories, products } from '../data'

export default function Catalog() {
  const [category, setCategory] = useState('全部')
  const list = category === '全部' ? products : products.filter((p) => p.category === category)

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-cream pb-[105px]">
      <Carousel images={banners} className="aspect-[390/166]" />

      <h1 className="px-5 pt-5 text-2xl leading-[22px] font-bold text-brand">商品型錄</h1>

      <nav className="no-scrollbar sticky top-0 z-10 mt-2 flex gap-1.5 overflow-x-auto border-b border-line bg-cream pt-3 pb-3 pl-5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full border px-5 py-1.5 leading-[22px] font-bold transition ${
              c === category ? 'border-brand bg-brand text-white' : 'border-line bg-white text-slate-600'
            }`}
          >
            {c}
          </button>
        ))}
      </nav>

      <p className="px-5 pt-5 text-right text-[15px] leading-[22px] text-gray-500">{list.length} 項</p>

      <div className="mt-3.5 grid grid-cols-2 gap-3 px-5">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

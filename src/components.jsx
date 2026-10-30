import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Shows a gray box with the file name until the real image is added.
// fit="contain" shows the whole photo instead of cropping it to fill the box.
export function Img({ src, alt = '', className = '', fit = 'cover' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`grid place-items-center overflow-hidden bg-stone-200 p-2 text-center text-xs break-all text-stone-400 ${className}`}>
        {src.split('/').pop()}
      </div>
    )
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`} />
}

export function Header({ title, back = false }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center bg-white px-4">
      <button
        onClick={() => (back ? navigate(-1) : window.close())}
        aria-label={back ? '返回' : '關閉'}
        className="-ml-2 grid size-10 place-items-center rounded-full active:bg-stone-100"
      >
        {back ? (
          <img src="/images/product/back.svg" alt="" className="rotate-90" />
        ) : (
          <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-stone-800 stroke-2">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        )}
      </button>
      <p className="flex-1 pr-8 text-center text-[15px] leading-[22px] font-bold text-stone-800">{title}</p>
    </header>
  )
}

// interval 0 turns autoplay off.
export function Carousel({ images, className = 'aspect-[16/9]', interval = 4000, arrows = true }) {
  const [index, setIndex] = useState(0)
  const track = useRef(null)

  function go(to) {
    const el = track.current
    el.scrollTo({ left: ((to + images.length) % images.length) * el.clientWidth, behavior: 'smooth' })
  }

  // Auto-advance; the timer restarts after every slide change, including manual swipes.
  useEffect(() => {
    if (!interval || images.length < 2) return
    const timer = setTimeout(() => go(index + 1), interval)
    return () => clearTimeout(timer)
  })

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((img) => (
          <div key={img.src} className={`w-full shrink-0 snap-center overflow-hidden ${className}`}>
            <Img src={img.src} fit={img.fit} className={`size-full ${img.className ?? ''}`} />
          </div>
        ))}
      </div>
      {images.length > 1 && arrows && [
        { label: '上一張', to: index - 1, side: 'left-3', path: 'M15 5l-7 7 7 7' },
        { label: '下一張', to: index + 1, side: 'right-3', path: 'M9 5l7 7-7 7' },
      ].map(({ label, to, side, path }) => (
        <button
          key={label}
          onClick={() => go(to)}
          aria-label={label}
          className={`absolute top-1/2 ${side} grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/70 backdrop-blur transition active:scale-90`}
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-stone-800 stroke-2">
            <path d={path} />
          </svg>
        </button>
      ))}
      <div className={`absolute inset-x-0 bottom-5 flex justify-center gap-[9px] ${images.length < 2 ? 'hidden' : ''}`}>
        {images.map((img, i) => (
          <span key={img.src} className="relative size-1.5">
            {i === index ? (
              <img src="/images/catalog/dot-active.svg" alt="" className="absolute -inset-px" />
            ) : (
              <img src="/images/catalog/dot.svg" alt="" className="absolute inset-0" />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export const storageStyles = { 冷藏: 'bg-sky-50 text-sky-800', 冷凍: 'bg-indigo-50 text-indigo-800' }

export function Tags({ product, className = '' }) {
  return (
    <div className={`flex justify-between gap-2 ${className}`}>
      {product.brand ? (
        <span className="rounded-full border border-sakura bg-sakura-cream px-1.5 py-1 text-sm leading-normal text-sakura">{product.brand}</span>
      ) : (
        <span />
      )}
      {product.storage && (
        <span className={`rounded-full px-2 py-1 text-[13px] leading-normal ${storageStyles[product.storage]}`}>{product.storage}</span>
      )}
    </div>
  )
}

// Keeps a bracketed note like （餐飲用） on one line, so names only wrap before it.
export function ProductName({ name }) {
  const [main, note] = name.split('（')
  return note ? (
    <>
      {main}
      <span className="whitespace-nowrap">（{note}</span>
    </>
  ) : (
    name
  )
}

export function ProductCard({ product, className = '' }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className={`overflow-hidden rounded-2xl bg-white shadow-card transition active:scale-95 ${className}`}
    >
      <div className="relative border-b border-line">
        <Img
          src={product.image}
          alt={product.name}
          fit="contain"
          className={`h-32 w-full p-2 ${product.soldOut ? 'opacity-50 grayscale' : ''}`}
        />
        <Tags product={product} className="absolute inset-x-[9px] top-[9px]" />
        {product.soldOut && (
          <span className="absolute bottom-2 left-[9px] rounded-full bg-stone-800/80 px-2 py-0.5 text-[13px] leading-normal text-white">備貨中</span>
        )}
      </div>
      <div className="min-h-[85px] px-3 py-2 text-[15px] leading-[22px]">
        <p className="font-bold text-stone-800">
          <ProductName name={product.name} />
        </p>
        <p className="text-gray-500">{product.spec}</p>
      </div>
    </Link>
  )
}

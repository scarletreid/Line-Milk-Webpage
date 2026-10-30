import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Header, Img } from '../components'
import { news } from '../data'

export default function News() {
  const { id } = useParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  const article = news.find((n) => n.id === id)
  if (!article) return <Navigate to="/catalog" replace />

  const others = news.filter((n) => n.id !== id)

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white pb-10">
      <Header title="最新消息" />
      <Img
        key={article.id}
        src={article.image}
        alt={article.title}
        fit={article.fit}
        className={`aspect-[15/8] w-full ${article.fit === 'contain' ? 'p-4' : ''}`}
      />
      <article className="border-b border-line px-5 py-6">
        <time className="text-sm text-brand">{article.date}</time>
        <h1 className="mt-2 text-xl leading-normal font-bold text-stone-800">{article.title}</h1>
        {article.body.map((p) => (
          <p key={p} className="mt-4 text-[15px] leading-[1.8] text-stone-700">
            {p}
          </p>
        ))}
      </article>

      <section className="px-5 pt-6">
        <h2 className="text-[15px] leading-normal font-bold text-stone-800">其他消息</h2>
        {others.map((n) => (
          <Link key={n.id} to={`/news/${n.id}`} className="flex items-center gap-3 border-b border-line py-3 active:opacity-70">
            <div className="min-w-0 flex-1">
              <time className="text-xs text-brand">{n.date}</time>
              <p className="text-[15px] leading-normal text-stone-800">{n.title}</p>
            </div>
            <img src="/images/product/back.svg" alt="" className="-rotate-90" />
          </Link>
        ))}
      </section>
    </div>
  )
}

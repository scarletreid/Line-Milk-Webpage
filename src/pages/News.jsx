import { Navigate, useParams } from 'react-router-dom'
import { Header, Img } from '../components'
import { news } from '../data'

export default function News() {
  const { id } = useParams()
  const article = news.find((n) => n.id === id)
  if (!article) return <Navigate to="/catalog" replace />

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white">
      <Header title="最新消息" />
      <Img src={article.image} alt={article.title} className="aspect-[15/8] w-full" />
      <article className="px-5 py-6">
        <time className="text-sm text-brand">{article.date}</time>
        <h1 className="mt-2 text-xl leading-normal font-bold text-stone-800">{article.title}</h1>
        <p className="mt-4 text-[15px] leading-[1.8] text-stone-700">{article.body}</p>
      </article>
    </div>
  )
}

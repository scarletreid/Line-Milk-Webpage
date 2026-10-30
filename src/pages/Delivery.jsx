import { useEffect, useState } from 'react'
import { Header } from '../components'
import { deliveryAreas, faqs, holidayNotes } from '../data'

const icons = '/images/delivery'
const weekdays = ['日', '一', '二', '三', '四', '五', '六']

// Orders close at 15:00 the day before delivery; there is no Sunday delivery.
function cutoffText(now) {
  if (now.getDay() === 6) return '週日暫停配送'
  const left = new Date(now).setHours(15, 0, 0, 0) - now
  if (left <= 0) return '今日已截單'
  const mins = Math.ceil(left / 60000)
  const hours = Math.floor(mins / 60)
  return hours ? `截單倒數 ${hours} 時 ${mins % 60} 分` : `截單倒數 ${mins} 分`
}

export default function Delivery() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])
  const today = weekdays[now.getDay()]
  const [openFaqs, setOpenFaqs] = useState([0])
  const toggleFaq = (i) => setOpenFaqs((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-cream pb-24">
      <Header title="配送資訊" />

      <div className="flex items-center gap-2.5 bg-yellow-300 px-5 py-3 text-sm leading-[1.7] font-bold text-stone-700">
        {/* Delivery truck with a pause badge: "no delivery on these days". */}
        <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
          <circle cx="16" cy="16" r="16" className="fill-white" />
          <g className="fill-none stroke-brand" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 12.5h10.5v7.5H6z" />
            <path d="M16.5 15h3.5l2.5 2.6V20h-6" />
          </g>
          <circle cx="9.5" cy="21" r="1.7" className="fill-white stroke-brand" strokeWidth="1.6" />
          <circle cx="19.5" cy="21" r="1.7" className="fill-white stroke-brand" strokeWidth="1.6" />
          <circle cx="22.5" cy="10" r="4.5" className="fill-brand" />
          <path d="M21.3 8.2v3.6M23.7 8.2v3.6" className="stroke-white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        週日及國定假日暫停配送
      </div>

      <div className="flex flex-col gap-3 p-5">
        <section className="flex flex-col gap-2.5">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold text-brand">配送資訊</h1>
            <div className="h-15 w-[203px]">
              <img src="/images/illustrations/Japanese milk delivery truck sketch-4.png" alt="" className="size-full object-contain" />
            </div>
          </div>
          <p className="text-sm leading-[1.8] text-stone-600">
            岳佳以自有冷鏈車隊與合作物流配送，鮮乳類全程冷藏，確保商品新鮮送達門市。
          </p>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center gap-2 rounded-3xl bg-white px-3 py-4 text-center whitespace-nowrap shadow-card min-[390px]:px-5">
            <img src="/images/illustrations/Warm pencil standing desk calendar-2.png" alt="" className="h-13 w-15 object-contain opacity-50" />
            <div className="text-sm">
              <p className="leading-normal font-bold">訂貨截止時間</p>
              <p className="leading-[1.7] text-neutral-600">配送日前一天</p>
              <p className="text-2xl leading-[1.15] font-black text-brand">15:00</p>
            </div>
            <p className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs leading-normal font-bold whitespace-nowrap text-brand">{cutoffText(now)}</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-3xl bg-white px-3 py-4 text-center whitespace-nowrap shadow-card min-[390px]:px-5">
            <img src="/images/illustrations/Hand-drawn price tag and coins-1.png" alt="" className="h-13 w-15 object-contain opacity-50" />
            <div className="text-sm">
              <p className="leading-normal font-bold">免運門檻</p>
              <p className="text-2xl leading-[1.15] font-black text-brand">$3,000</p>
              <p className="leading-[1.7] text-neutral-600">未達酌收運費 $150</p>
            </div>
          </div>
        </div>

        <section className="rounded-3xl bg-white p-4 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] leading-normal font-bold">配送區域或配送日</h2>
            <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[13px] font-bold text-brand">今天 週{today}</span>
          </div>
          <div className="mt-2.5 flex justify-between border-b border-line py-2.5 text-sm leading-[1.7] text-neutral-600">
            <span>地區</span>
            <span>每週配送日</span>
          </div>
          {deliveryAreas.map(({ area, days }) => {
            const deliversToday = days.includes(today)
            return (
              <div key={area} className="flex items-center gap-3 border-b border-line py-2.5 text-sm leading-[1.7] last:border-0 last:pb-0">
                <span className={`flex-1 ${deliversToday ? 'font-bold text-brand' : ''}`}>
                  {/* Only allow line breaks between place names, never inside one. */}
                  {area.split('・').map((place, i) => (
                    <span key={place} className="whitespace-nowrap">
                      {i > 0 && '・'}
                      {place}
                    </span>
                  ))}
                </span>
                <div className="flex gap-1">
                  {days.map((d) => (
                    <span
                      key={d}
                      className={`grid size-7 place-items-center rounded-full font-bold ${
                        d === today ?'bg-brand text-white ring-2 ring-brand/30 ring-offset-1' : 'bg-brand/15 text-brand'
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        <section className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-card">
          <div className="flex flex-col items-center gap-2 border-b border-line pb-5">
            <img src="/images/illustrations/Curious Cow Pencil Sketch-3.png" alt="" className="h-[86px] w-[130px] object-contain opacity-70" />
            <h2 className="text-[15px] leading-normal font-bold">常見配送問題</h2>
          </div>
          {faqs.map(({ q, a }, i) => {
            const open = openFaqs.includes(i)
            return (
              <div key={q}>
                <button
                  onClick={() => toggleFaq(i)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 text-left text-[15px] leading-[1.6] font-bold text-stone-800"
                >
                  <span className="flex-1">{q}</span>
                  <img src={`${icons}/chevron-open.svg`} alt="" className={`transition duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>
                {/* Animating grid rows from 0fr to 1fr slides the answer open to its natural height. */}
                <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="pt-2.5 text-sm leading-[1.9] text-neutral-700">{a}</p>
                  </div>
                </div>
                <div className="mt-2.5 h-px bg-line" />
              </div>
            )
          })}
        </section>

        <section className="flex flex-col gap-3 rounded-3xl border border-line bg-white/60 p-4">
          <h2 className="text-[15px] leading-normal font-bold text-stone-800">假日配送注意事項</h2>
          <ul className="list-inside list-disc text-sm leading-loose text-stone-600">
            {holidayNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

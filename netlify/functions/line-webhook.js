import { createHmac, timingSafeEqual } from 'node:crypto'
import { news } from '../../src/data.js'

// LINE Messaging API webhook. Set the webhook URL in LINE Developers to
//   https://<your-site>.netlify.app/.netlify/functions/line-webhook
// and these environment variables in Netlify:
//   LINE_CHANNEL_SECRET, LINE_CHANNEL_ACCESS_TOKEN
//   SITE_URL (optional; where 閱讀全文 links point, e.g. a LIFF URL; defaults to the Netlify site URL)

const KEYWORD = '最新消息'
const BRAND = '#7e4533'

const siteUrl = () => (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '')
const absolute = (src) => (src.startsWith('http') ? src : `${siteUrl()}${src}`)

function verify(body, signature) {
  const expected = createHmac('sha256', process.env.LINE_CHANNEL_SECRET).update(body).digest()
  const given = Buffer.from(signature || '', 'base64')
  return given.length === expected.length && timingSafeEqual(given, expected)
}

const bubble = (n) => {
  const url = `${siteUrl()}/news/${n.id}`
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: absolute(n.image),
      size: 'full',
      aspectRatio: '15:8',
      aspectMode: 'cover',
      action: { type: 'uri', uri: url },
    },
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        { type: 'text', text: n.date, size: 'sm', color: BRAND },
        { type: 'text', text: n.title, weight: 'bold', size: 'md', color: '#292524', wrap: true, maxLines: 2 },
        { type: 'text', text: n.body[0], size: 'sm', color: '#57534e', wrap: true, maxLines: 3 },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [{ type: 'button', style: 'primary', color: BRAND, height: 'sm', action: { type: 'uri', label: '閱讀全文', uri: url } }],
    },
  }
}

// A carousel holds at most 12 bubbles.
export const newsCarousel = () => ({
  type: 'flex',
  altText: KEYWORD,
  contents: { type: 'carousel', contents: news.slice(0, 12).map(bubble) },
})

async function reply(replyToken, messages) {
  const res = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ replyToken, messages }),
  })
  if (!res.ok) console.error('LINE reply failed', res.status, await res.text())
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  const body = await req.text()
  if (!verify(body, req.headers.get('x-line-signature'))) return new Response('Invalid signature', { status: 401 })

  const { events = [] } = JSON.parse(body)
  await Promise.all(
    events
      .filter((e) => e.type === 'message' && e.message.type === 'text' && e.message.text.trim() === KEYWORD)
      .map((e) => reply(e.replyToken, [newsCarousel()])),
  )
  return new Response('OK')
}

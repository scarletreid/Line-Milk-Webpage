// Free Unsplash photos for now; swap in local paths like '/images/products/x.jpg' later.
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`

export const banners = [
  // Figma banner, zoomed to match the design crop
  { src: '/images/banners/banner-1.jpg', className: 'scale-[1.325] origin-[60%_12%]' },
  { src: unsplash('1500595046743-cd271d694d30') },
  { src: unsplash('1639151082235-406d8eb262b9') },
]

export const categories = ['全部', '乳品', '糖漿', '配料', '果汁']

export const products = [
  {
    id: 'sakura-milk',
    name: '櫻島家鮮奶',
    spec: '936ml／瓶',
    brand: '櫻島家',
    cold: true,
    category: '乳品',
    image: '/images/products/dairy-fresh.jpg',
    gallery: [unsplash('1635436338433-89747d0ca0ef'), '/images/products/milk-glass.jpg'],
    features: ['採用台灣在地A級生乳', '全程冷鏈配送', '適合直接飲用'],
  },
  {
    id: 'sakura-milk-pro',
    name: '櫻島家鮮奶（餐飲用）',
    spec: '936ml／瓶',
    brand: '櫻島家',
    cold: true,
    category: '乳品',
    image: '/images/products/dairy-fresh.jpg',
    gallery: [unsplash('1601436423474-51738541c1b1'), '/images/products/milk-glass.jpg'],
    features: ['採用台灣在地A級生乳', '全程冷鏈配送', '適合鮮奶茶, 拿鐵, 早餐飲品'],
  },
  {
    id: 'condensed-milk',
    name: '濃縮牛乳',
    spec: '1L／瓶',
    cold: true,
    category: '乳品',
    image: '/images/products/dairy-fresh.jpg',
    gallery: [unsplash('1585083969600-495ee7e3604b'), '/images/products/milk-glass.jpg'],
    features: ['乳脂濃郁', '適合調飲與烘焙'],
  },
  {
    id: 'sweet-condensed',
    name: '加糖煉乳',
    spec: '1.5kg／罐',
    cold: true,
    category: '乳品',
    image: '/images/products/milk-glass.jpg',
    gallery: [unsplash('1608634960479-c70cf0c3dece'), '/images/products/dairy-fresh.jpg'],
    features: ['香甜濃稠', '適合冰品與吐司抹醬'],
  },
  {
    id: 'brown-syrup',
    name: '黑糖糖漿',
    spec: '2.5kg／罐',
    category: '糖漿',
    image: unsplash('1678174472163-543b1704eb24'),
    features: ['台灣黑糖熬煮', '適合黑糖珍奶'],
  },
  {
    id: 'cane-syrup',
    name: '蔗糖糖漿',
    spec: '2.5kg／罐',
    category: '糖漿',
    image: unsplash('1740423099949-b0dfcabd91ce'),
    features: ['甜度穩定', '手搖飲常備'],
  },
  {
    id: 'tapioca',
    name: '黑糖珍珠',
    spec: '3kg／包',
    category: '配料',
    image: unsplash('1774979300628-12e379acea7b'),
    features: ['Q彈有嚼勁', '30 分鐘快煮'],
  },
  {
    id: 'passion-juice',
    name: '百香果原汁',
    spec: '1kg／瓶',
    cold: true,
    category: '果汁',
    image: unsplash('1571161473325-1594dece4499'),
    features: ['含果粒', '適合調製果茶'],
  },
]

export const deliveryAreas = [
  { area: '台中市區・西屯・北屯・南屯', days: ['一', '三', '五'] },
  { area: '大肚・潭子・豐原・神岡', days: ['二', '三'] },
  { area: '太平・大里・烏日', days: ['二', '四'] },
  { area: '彰化市・員林（部分區域）', days: ['三'] },
]

export const faqs = [
  { q: '訂貨後可以修改嗎？', a: '截單時間前可聯繫業務或於訂單頁面申請修改；截單後將進入備貨流程。' },
  { q: '收貨時發現商品異常怎麼辦？', a: '收貨後 24 小時內透過 LINE 傳送照片給客服，我們會儘速處理。' },
]

export const holidayNotes = [
  '週日及國定假日暫停配送。',
  '連續假期前將提前公告加開配送日與截單時間。',
  '建議假期前透過「AI 補貨」提前備貨。',
]

export const news = [
  {
    id: '1',
    date: '2026/10/12',
    title: '櫻島家鮮奶餐飲用大量包裝上市',
    body: '1857ml 餐飲用包裝，減少開瓶頻率與包材，適合出杯量大的飲料店與咖啡店。針對出杯量大的門市，推出 1857ml 餐飲用包裝。同樣採用台灣在地 A 級生乳，全程冷鏈配送。',
    image: '/images/banners/banner-1.jpg',
  },
]

// Where 前往訂貨 sends people to place an order.
export const orderUrl = 'https://b2bsh.ksi.com.tw/login'

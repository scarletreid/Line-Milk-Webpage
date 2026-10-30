// Free Unsplash photos for now; swap in local paths like '/images/products/x.jpg' later.
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`

export const banners = [
  // Figma banner, zoomed to match the design crop
  { src: '/images/banners/banner-1.jpg', className: 'scale-[1.325] origin-[60%_12%]' },
  { src: unsplash('1500595046743-cd271d694d30') },
  { src: unsplash('1639151082235-406d8eb262b9') },
]

export const categories = ['全部', '乳品', '果汁', '罐頭', '配料', '沖泡', '冰品']

// Products from sakurazimaya.com. Each photo keeps the file name it has on that site
// (sakurazimaya.com/uploads/…), saved as is into /public/images/product.
const photo = (file) => `/images/product/${file}`

export const products = [
  {
    id: '2',
    name: '櫻島家100%純鮮乳',
    spec: '936ml × 6罐／箱',
    brand: '櫻島家',
    storage: '冷藏',
    category: '乳品',
    image: photo('d584b4848b2486a4e04b41231bfabd2b.jpg'),
  },
  ...[
    ['31', '巧克力', '0c2177dee20e7e92a7a1a9d00278a969.png'],
    ['32', '原味', '7b41a4bc4af3ddb8be7e85d33bfdbe08.png'],
    ['33', '草莓', 'a60444c10f779dc3808775943a235724.png'],
    ['34', '麥芽', 'c89d5183a10c974236e9879e689e1e41.png'],
    ['35', '蘋果', 'ab9835eccfa47f7f29baaa6315a6c6cd.png'],
  ].map(([id, flavor, file]) => ({
    id,
    name: `櫻島家保久乳（${flavor}）`,
    spec: '24瓶／箱',
    brand: '櫻島家',
    category: '乳品',
    image: photo(file),
    features: ['售價 35 元／瓶'],
  })),
  ...[
    ['17', '百香果原汁', '3b833050305c32be8db3fca87dd73397.jpg'],
    ['10', '草莓汁', 'ae55ab8e9e0a54eb3659fbba696986b6.jpg'],
    ['11', '柳丁原汁', '671fc458cc59fc10402a84fa8bb6bff2.jpg'],
    ['12', '檸檬汁', '24c476953fa419bd199f561c7b1ba7aa.jpg'],
    ['18', '桑葚汁', '300338238938ea4458453e257119df4e.jpg'],
    ['29', '葡萄柚汁', '8841ec915b3b8b5ce720740417b5700f.jpg'],
  ].map(([id, name, file]) => ({
    id,
    name,
    spec: '1kg × 2瓶／箱',
    storage: '冷凍',
    category: '果汁',
    image: photo(file),
  })),
  ...[
    ['7', '水蜜桃果粒', '850g × 12罐／箱', 'ilHomF0H2fIjXXqwxFlTJfwSPhpnL57s.png'],
    ['20', '紅葡萄柚果粒', '850g × 12罐／箱', '3e4d3800cb692664103d54135ffb8822.jpg'],
    ['46', '火龍果顆粒罐頭', '850g × 12罐／箱', '1ae1c619ca6d9834c8f0d4130449f88e.jpg'],
    ['47', '鳳梨果肉醬', '900g × 12罐／箱', 'b908cd0591050897a229bbd51f5f1ca3.jpg'],
  ].map(([id, name, spec, file]) => ({
    id,
    name,
    spec,
    category: '罐頭',
    image: photo(file),
    features: id === '47' ? undefined : ['產地：越南', '效期：2 年'],
  })),
  {
    id: '28',
    name: '黑糖珍珠',
    spec: '3kg × 6包／箱',
    category: '配料',
    image: photo('e7563989fc75607876e37318651b6a4c.jpg'),
  },
  {
    id: '30',
    name: '芋圓（4分）',
    spec: '600g × 20包／箱',
    category: '配料',
    image: photo('9ebbc5887fab5b5ea46a286b396c09c6.jpg'),
    features: ['大芋圓'],
  },
  ...[
    ['41', '原味奶茶', 'e99abba3098a8e54105cb9c83300dc39.jpg'],
    ['42', '紅茶豆奶', 'd1c8e341fe8a6ce27f4ef7aa01e61beb.jpg'],
    ['43', '抹茶豆奶', 'b4de900d09116fe2e97088e05fa55b3d.jpg'],
    ['44', '黑芝麻豆奶', 'be3853f1569812c22ace52da2b44b9d8.jpg'],
  ].map(([id, name, file]) => ({
    id,
    name,
    spec: '20g × 50包／袋',
    brand: '櫻島家',
    category: '沖泡',
    image: photo(file),
    soldOut: true,
    features: ['歡迎來電洽談批發合作'],
  })),
  {
    id: '36',
    name: '蜜柑歐蕾雪糕',
    spec: '65g × 6支／袋',
    brand: '櫻島家',
    storage: '冷凍',
    category: '冰品',
    image: photo('B3ZgT9Jahot1bcPq0MFIb5zGv3VwLKtk.png'),
    soldOut: true,
    features: ['櫻島家 × 伊藤農園聯名', '購買 4 袋免運費，未滿 4 袋運費 160 元'],
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

// Mock articles with free Unsplash photos.
export const news = [
  {
    id: '1',
    date: '2026/10/12',
    title: '櫻島家鮮奶餐飲用大量包裝上市',
    image: unsplash('1579265898841-79c7890d69cf'),
    body: [
      '針對出杯量大的飲料店與咖啡店，櫻島家推出 1857ml 餐飲用大容量包裝，減少開瓶頻率與包材，讓吧台作業更順手。',
      '同樣採用台灣在地 A 級生乳，全程冷鏈配送，風味與一般包裝完全相同。即日起可於訂貨系統選購。',
    ],
  },
  {
    id: '2',
    date: '2026/10/05',
    title: '櫻島家保久乳五種口味全新登場',
    image: unsplash('1636335936810-a3a7672d3a25'),
    body: [
      '櫻島家保久乳推出原味、巧克力、草莓、麥芽、蘋果五種口味，常溫保存免冷藏，適合放在櫃台作為加購商品，也方便早餐店與便利通路陳列。',
      '每箱 24 瓶，建議售價每瓶 35 元。上市首月單筆訂購 3 箱以上，加贈原味保久乳 6 瓶。',
    ],
  },
  {
    id: '3',
    date: '2026/09/28',
    title: '冷凍果汁系列秋季備貨優惠',
    image: unsplash('1760712629836-f3e18ac1242f'),
    body: [
      '百香果原汁、檸檬汁、柳丁原汁、葡萄柚汁等冷凍果汁系列，即日起至 10/31 任選 5 箱享 95 折。',
      '冷凍果汁建議存放於 -18°C 以下，使用前移至冷藏退冰 12 小時，開封後請於 3 天內使用完畢，以維持最佳風味。',
    ],
  },
  {
    id: '4',
    date: '2026/09/20',
    title: '國慶連假配送調整公告',
    image: unsplash('1616432043562-3671ea2e5242'),
    body: [
      '10/10（六）至 10/11（日）國慶連假期間暫停配送，10/12（一）起恢復正常配送。',
      '原定 10/10 配送的訂單將提前至 10/9（五）送達，請於 10/8（四）15:00 前完成訂貨。建議連假前提前備貨，避免門市缺貨。',
    ],
  },
]

// Where 前往訂貨 sends people to place an order.
export const orderUrl = 'https://b2bsh.ksi.com.tw/login'

Reactg React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, file_00000000bbe08210aad06188ad3cc765.png, Menu, Trash2 } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: '鬲賷卮賷乇鬲 賯胤賳 賮丕禺乇', price: 250, emoji: '馃憰' },
  { id: 2, name: '丨匕丕亍 乇賷丕囟賷 賲乇賷丨', price: 800, emoji: '馃憻' },
  { id: 3, name: '爻丕毓丞 賷丿 賰賱丕爻賷賰賷丞', price: 600, emoji: '鈱�' },
  { id: 4, name: '賳馗丕乇丞 卮賲爻賷丞 兀賳賷賯丞', price: 350, emoji: '馃暥锔�' },
  { id: 5, name: '丨賯賷亘丞 馗賴乇 賱賱爻賮乇', price: 500, emoji: '馃帓' },
  { id: 6, name: '爻賲丕毓丕鬲 乇兀爻 賱丕爻賱賰賷丞', price: 700, emoji: '馃帶' },
  { id: 7, name: '毓胤乇 乇噩丕賱賷 賲賲賷夭', price: 900, emoji: '馃Т' },
  { id: 8, name: '賲丨賮馗丞 噩賱丿 胤亘賷毓賷', price: 200, emoji: '馃捈' },
];

// 丕爻鬲亘丿賱 丕賱乇賯賲 丕賱鬲丕賱賷 亘乇賯賲 賵丕鬲爻丕亘賰 亘氐賷睾丞 丿賵賱賷丞貙 亘丿賵賳 + 兀賵 賲爻丕賮丕鬲.
const WHATSAPP_NUMBER = '201000000000';

export default function EcommerceApp() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      return found
        ? prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id, delta) => setCart((prev) =>
    prev.map((item) => item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item)
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const formatPrice = (price) => `${price.toLocaleString('ar-EG')} 噩.賲`;

  const orderMessage = encodeURIComponent(
    '賲乇丨亘賸丕貙 兀乇睾亘 賮賷 胤賱亘 丕賱賲賳鬲噩丕鬲 丕賱鬲丕賱賷丞:\n' +
    cart.map((item) => `鈥� ${item.name} - ${item.quantity} 賯胤毓丞 - ${formatPrice(item.price * item.quantity)}`).join('\n') +
    `\n\n丕賱廿噩賲丕賱賷: ${formatPrice(cartTotal)}`
  );

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-[76px] flex items-center justify-between gap-3">
            <a href="#" className="flex items-center gap-2 shrink-0" aria-label="丕賱乇卅賷爻賷丞">
              <img
                src="https://raw.githubusercontent.com/abwasamh555/my_story/main/file_00000000bbe08210aad06188ad3cc765.png"
                alt="MY STORY"
                className="h-12 w-auto object-contain"
              />
            </a>

            <nav className="hidden md:flex items-center gap-7">
              <a href="#" className="font-semibold hover:text-amber-600 transition">丕賱乇卅賷爻賷丞</a>
              <a href="#products" className="font-semibold hover:text-amber-600 transition">丕賱賲賳鬲噩丕鬲</a>
              <a href="#about" className="font-semibold hover:text-amber-600 transition">毓賳 丕賱賲鬲噩乇</a>
              <a href="#contact" className="font-semibold hover:text-amber-600 transition">丕鬲氐賱 亘賳丕</a>
            </nav>

            <div className="flex items-center gap-1 sm:gap-3">
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-xl hover:bg-gray-100" aria-label="爻賱丞 丕賱鬲爻賵賯">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && <span className="absolute -top-0.5 -left-0.5 rounded-full bg-amber-500 text-white text-xs w-5 h-5 flex items-center justify-center">{cartCount}</span>}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100"
                aria-label="賮鬲丨 丕賱賯丕卅賲丞"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden border-t bg-white px-4 py-3 space-y-1 shadow-lg">
            {[
              ['丕賱乇卅賷爻賷丞', '#'],
              ['丕賱賲賳鬲噩丕鬲', '#products'],
              ['毓賳 丕賱賲鬲噩乇', '#about'],
              ['丕鬲氐賱 亘賳丕', '#contact'],
            ].map(([label, href]) => (
              <a key={label} href={href} onClick={closeMenu} className="block px-3 py-3 rounded-xl hover:bg-gray-50 font-medium">{label}</a>
            ))}
          </nav>
        )}
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-amber-950 to-black text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #fbbf24 0, transparent 30%), radial-gradient(circle at 80% 80%, #d97706 0, transparent 35%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 py-20 sm:py-28 text-center">
          <p className="text-amber-300 font-semibold tracking-[0.2em] mb-4">MY STORY ONLINE STORE</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">丕賰鬲卮賮 毓丕賱賲 丕賱鬲爻賵賯<br className="hidden sm:block" /> 亘賰賱 爻賴賵賱丞</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-200 leading-8 mb-9">鬲爻賵賯 丕賱丌賳 賵丕爻鬲賲鬲毓 亘鬲噩乇亘丞 卮乇丕亍 賮乇賷丿丞 賲毓 兀賮囟賱 丕賱賲賳鬲噩丕鬲 賵兀賳爻亘 丕賱兀爻毓丕乇. 噩賵丿丞 賱丕 鬲囟丕賴賷 賵鬲賵氐賷賱 爻乇賷毓 賱亘丕亘 亘賷鬲賰.</p>
          <a href="#products" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-lg rounded-full px-8 py-4 shadow-lg transition hover:-translate-y-0.5">
            <ShoppingBag className="w-5 h-5" /> 鬲爻賵賯 丕賱丌賳
          </a>
        </div>
      </section>

      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="mb-9">
          <h2 className="text-3xl sm:text-4xl font-extrabold">兀丨丿孬 丕賱賲賳鬲噩丕鬲</h2>
          <p className="text-gray-500 mt-3">丕禺鬲乇賳丕 賱賰 亘毓賳丕賷丞 兀賮囟賱 丕賱賲賳鬲噩丕鬲 賱鬲賳丕爻亘 匕賵賯賰 丕賱乇賮賷毓.</p>
          <div className="mt-4 h-1 w-20 rounded-full bg-amber-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
          {PRODUCTS.map((product) => (
            <article key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition flex flex-col">
              <div className="h-52 sm:h-60 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <span className="text-7xl transition-transform hover:scale-110">{product.emoji}</span>
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold rounded-full px-3 py-1">賲賳鬲噩 賲賲賷夭</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-amber-700 text-xl font-extrabold mb-5">{formatPrice(product.price)}</p>
                <button onClick={() => addToCart(product)} className="mt-auto w-full rounded-xl bg-gray-900 hover:bg-amber-500 hover:text-gray-950 text-white py-3 font-bold transition flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> 兀囟賮 廿賱賶 丕賱爻賱丞
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <section id="about" className="bg-white border-y border-gray-100 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-relaxed">賯氐鬲賳丕 賮賷 毓丕賱賲 丕賱兀賳丕賯丞 賵丕賱噩賵丿丞</h2>
            <p className="mt-4 text-gray-600 text-lg leading-8">亘丿兀賳丕 亘卮睾賮 賰亘賷乇 賱鬲賯丿賷賲 鬲噩乇亘丞 鬲爻賵賯 丕爻鬲孬賳丕卅賷丞. 賳丐賲賳 亘兀賳 賰賱 賯胤毓丞 鬲禺鬲丕乇賴丕 鬲毓亘乇 毓賳 卮禺氐賷鬲賰貙 賱匕賱賰 賳丨乇氐 毓賱賶 丕賳鬲賯丕亍 丕賱兀賮囟賱 丿丕卅賲賸丕 賱賷賰賵賳 亘賷賳 賷丿賷賰.</p>
            <div className="grid grid-cols-2 gap-5 mt-8">
              <div className="border-r-4 border-amber-500 pr-4"><strong className="block text-3xl">100%</strong><span className="text-gray-500">丕賴鬲賲丕賲 亘丕賱噩賵丿丞</span></div>
              <div className="border-r-4 border-amber-500 pr-4"><strong className="block text-3xl">丿毓賲</strong><span className="text-gray-500">賱禺丿賲丞 丕賱毓賲賱丕亍</span></div>
            </div>
          </div>
          <div className="rounded-3xl min-h-64 bg-gradient-to-br from-amber-100 to-gray-100 flex items-center justify-center"><span className="text-8xl">馃泹锔�</span></div>
        </div>
      </section>

      <footer id="contact" className="bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3 mb-4"><ShoppingBag className="w-8 h-8 text-amber-400" /><span className="text-2xl font-extrabold">MY STORY</span></div>
          <p className="text-gray-400 max-w-md mx-auto mb-7">賵噩賴鬲賰 賱賱鬲爻賵賯 亘賰賱 爻賴賵賱丞. 丕禺鬲丕乇 賲賳鬲噩丕鬲賰 賵丕胤賱亘賴丕 賲亘丕卮乇丞 毓亘乇 賵丕鬲爻丕亘.</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex bg-green-600 hover:bg-green-500 rounded-full px-6 py-3 font-bold transition">鬲賵丕氐賱 賲毓賳丕 毓亘乇 賵丕鬲爻丕亘</a>
          <p className="text-gray-500 text-xs mt-8">噩賲賷毓 丕賱丨賯賵賯 賲丨賮賵馗丞 漏 2026 MY STORY</p>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <button aria-label="廿睾賱丕賯 丕賱爻賱丞" onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/60" />
          <aside className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="text-xl font-extrabold flex items-center gap-2"><ShoppingCart className="text-amber-600" /> 爻賱丞 丕賱鬲爻賵賯</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-gray-100" aria-label="廿睾賱丕賯"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-gray-500"><span className="text-6xl mb-4">馃洅</span><p className="font-bold text-lg">爻賱鬲賰 賮丕乇睾丞 丨丕賱賷賸丕</p><p className="mt-2 text-sm">兀囟賮 賲賳鬲噩丕鬲 賱鬲亘丿兀 胤賱亘賰.</p></div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center bg-gray-50 rounded-xl p-3">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl">{item.emoji}</div>
                      <div className="flex-1 min-w-0"><p className="font-bold truncate">{item.name}</p><p className="text-amber-700 font-bold text-sm">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded border bg-white"><Minus className="w-4 h-4" /></button>
                          <span className="w-6 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded border bg-white"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" aria-label="丨匕賮 丕賱賲賳鬲噩"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && <div className="p-5 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4"><span className="font-bold text-gray-600">丕賱廿噩賲丕賱賷</span><span className="text-2xl font-extrabold text-amber-700">{formatPrice(cartTotal)}</span></div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${orderMessage}`} target="_blank" rel="noopener noreferrer" className="block text-center bg-green-600 hover:bg-green-500 text-white font-extrabold py-4 rounded-xl transition">廿鬲賲丕賲 丕賱胤賱亘 毓亘乇 賵丕鬲爻丕亘</a>
            </div>}
          </aside>
        </div>
      )}
    </div>
  );
}

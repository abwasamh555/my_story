import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  ShoppingBag,
  Menu,
  Trash2
} from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'تيشيرت قطن فاخر', price: 250, emoji: '👕' },
  { id: 2, name: 'حذاء رياضي مريح', price: 800, emoji: '👟' },
  { id: 3, name: 'ساعة يد كلاسيكية', price: 600, emoji: '⌚' },
  { id: 4, name: 'نظارة شمسية أنيقة', price: 350, emoji: '🕶️' },
  { id: 5, name: 'حقيبة ظهر للسفر', price: 500, emoji: '🎒' },
  { id: 6, name: 'سماعات رأس لاسلكية', price: 700, emoji: '🎧' },
  { id: 7, name: 'عطر رجالي مميز', price: 900, emoji: '🧴' },
  { id: 8, name: 'محفظة جلد طبيعي', price: 200, emoji: '💼' },
];

const WHATSAPP_NUMBER = '201000000000';

export default function EcommerceApp() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
          };
        }

        return item;
      })
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const formatPrice = (price) => {
    return price.toLocaleString('ar-EG') + ' جنيه';
  };

  const checkoutWhatsApp = () => {
    const message =
      'السلام عليكم، أرغب في طلب المنتجات التالية:\n\n' +
      cart
        .map(
          (item) =>
            `• ${item.name}\n` +
            `الكمية: ${item.quantity}\n` +
            `السعر: ${formatPrice(item.price * item.quantity)}`
        )
        .join('\n\n') +
      '\n\nالإجمالي: ' +
      formatPrice(cartTotal);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, '_blank');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <a href="#" className="flex items-center gap-2">

              <img
                src="https://raw.githubusercontent.com/abwasamh555/my_story/main/file_00000000bbe08210aad06188ad3cc765.png"
                alt="MY STORY"
                className="h-14 w-auto object-contain"
              />

            </a>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center gap-8">

              <a href="#" className="text-gray-700 hover:text-indigo-600">
                الرئيسية
              </a>

              <a href="#products" className="text-gray-700 hover:text-indigo-600">
                المنتجات
              </a>

              <a href="#about" className="text-gray-700 hover:text-indigo-600">
                عن المتجر
              </a>

              <a href="#contact" className="text-gray-700 hover:text-indigo-600">
                اتصل بنا
              </a>

            </nav>

            {/* BUTTONS */}
            <div className="flex items-center gap-3">

              {/* CART */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-indigo-600"
                aria-label="سلة التسوق"
              >

                <ShoppingCart size={27} />

                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}

              </button>

              {/* MOBILE MENU */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
                aria-label="القائمة"
              >

                {isMobileMenuOpen ? (
                  <X size={28} />
                ) : (
                  <Menu size={28} />
                )}

              </button>

            </div>

          </div>

        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (

          <div className="md:hidden bg-white border-t px-4 py-4">

            <div className="flex flex-col gap-4">

              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2"
              >
                الرئيسية
              </a>

              <a
                href="#products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2"
              >
                المنتجات
              </a>

              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2"
              >
                عن المتجر
              </a>

              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2"
              >
                اتصل بنا
              </a>

            </div>

          </div>

        )}

      </header>

      {/* HERO */}
      <section className="relative min-h-[520px] flex items-center justify-center text-white text-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80')"
          }}
        />

        <div className="absolute inset-0 bg-indigo-950/75" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 py-20">

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
            اكتشف أحدث صيحات الموضة والإلكترونيات
          </h1>

          <p className="text-lg sm:text-xl text-indigo-100 leading-relaxed mb-10">
            تسوق الآن واستمتع بتجربة شراء فريدة مع أفضل المنتجات
            وأنسب الأسعار. جودة لا تضاهي وتوصيل سريع لباب بيتك.
          </p>

          <a
            href="#products"
            className="inline-flex items-center gap-3 bg-white text-indigo-900 px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-100 transition shadow-xl"
          >
            <ShoppingBag size={24} />
            تسوق الآن
          </a>

        </div>

      </section>

      {/* PRODUCTS */}
      <main
        id="products"
        className="max-w-7xl mx-auto px-4 py-16"
      >

        <div className="text-center mb-12">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            أحدث المنتجات
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            اخترنا لك بعناية أفضل المنتجات لتناسب ذوقك الرفيع
          </p>

          <div className="w-20 h-1 bg-indigo-600 rounded-full mx-auto mt-5" />

        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7">

          {PRODUCTS.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col"
            >

              {/* PRODUCT IMAGE */}
              <div className="relative h-40 sm:h-60 bg-gray-100 flex items-center justify-center">

                <span className="text-6xl sm:text-8xl">
                  {product.emoji}
                </span>

                <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                  جديد
                </span>

              </div>

              {/* PRODUCT INFO */}
              <div className="p-3 sm:p-5 flex flex-col flex-1">

                <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>

                <p className="text-indigo-600 text-lg sm:text-2xl font-extrabold mb-4">
                  {formatPrice(product.price)}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto w-full bg-gray-900 hover:bg-indigo-600 text-white py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >

                  <ShoppingCart size={18} />

                  أضف للسلة

                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

      {/* ABOUT */}
      <section
        id="about"
        className="bg-white py-16 border-t"
      >

        <div className="max-w-7xl mx-auto px-5">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                قصتنا في عالم الأناقة والجودة
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                بدأنا بشغف كبير لتقديم تجربة تسوق استثنائية.
                نؤمن بأن كل قطعة تختارها تعبر عن شخصيتك،
                لذلك نحرص على انتقاء الأفضل دائماً ليكون بين يديك.
              </p>

              <div className="grid grid-cols-2 gap-5 mt-8">

                <div className="border-r-4 border-indigo-600 pr-4">

                  <span className="text-3xl font-bold">
                    100%
                  </span>

                  <p className="text-gray-500 mt-2">
                    جودة مميزة
                  </p>

                </div>

                <div className="border-r-4 border-indigo-600 pr-4">

                  <span className="text-3xl font-bold">
                    سريع
                  </span>

                  <p className="text-gray-500 mt-2">
                    توصيل الطلبات
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-indigo-50 rounded-3xl min-h-64 flex items-center justify-center">

              <span className="text-9xl">
                🛍️
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-gray-950 text-white py-12"
      >

        <div className="max-w-7xl mx-auto px-5 text-center">

          <div className="flex items-center justify-center gap-3 mb-5">

            <ShoppingBag className="text-indigo-400" size={32} />

            <span className="text-3xl font-bold">
              MY STORY
            </span>

          </div>

          <p className="text-gray-400 mb-8">
            وجهتك الأولى لتسوق أرقى المنتجات بكل سهولة وأمان.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold transition"
          >
            تواصل معنا عبر واتساب
          </a>

          <p className="text-gray-500 text-sm mt-10">
            جميع الحقوق محفوظة © 2026 MY STORY
          </p>

        </div>

      </footer>

      {/* CART */}
      {isCartOpen && (

        <div className="fixed inset-0 z-50">

          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsCartOpen(false)}
          />

          {/* CART PANEL */}
          <div className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col">

            {/* CART HEADER */}
            <div className="p-5 border-b flex items-center justify-between">

              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">

                <ShoppingCart className="text-indigo-600" />

                سلة التسوق

              </h2>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >

                <X size={25} />

              </button>

            </div>

            {/* CART ITEMS */}
            <div className="flex-1 overflow-y-auto p-4">

              {cart.length === 0 ? (

                <div className="h-full flex flex-col items-center justify-center text-center">

                  <span className="text-7xl mb-5">
                    🛒
                  </span>

                  <h3 className="text-xl font-bold text-gray-500">
                    سلتك فارغة
                  </h3>

                  <p className="text-gray-400 mt-2">
                    أضف بعض المنتجات لتبدأ التسوق
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex gap-3 items-center bg-gray-50 p-4 rounded-2xl"
                    >

                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl">
                        {item.emoji}
                      </div>

                      <div className="flex-1 min-w-0">

                        <h3 className="font-bold truncate">
                          {item.name}
                        </h3>

                        <p className="text-indigo-600 font-bold mt-1">
                          {formatPrice(item.price)}
                        </p>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-3 mt-3">

                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border rounded-lg"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border rounded-lg"
                          >
                            <Plus size={16} />
                          </button>

                        </div>

                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 p-2"
                        aria-label="حذف المنتج"
                      >

                        <Trash2 size={20} />

                      </button>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* CART FOOTER */}
            {cart.length > 0 && (

              <div className="p-5 border-t bg-gray-50">

                <div className="flex justify-between items-center mb-5">

                  <span className="text-lg font-bold">
                    الإجمالي
                  </span>

                  <span className="text-2xl font-extrabold text-indigo-600">
                    {formatPrice(cartTotal)}
                  </span>

                </div>

                <button
                  onClick={checkoutWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-bold text-lg transition"
                >

                  إتمام الطلب عبر واتساب

                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

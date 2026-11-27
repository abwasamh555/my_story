import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, ShoppingBag } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'تيشيرت قطن فاخر', price: 250 },
  { id: 2, name: 'حذاء رياضي مريح', price: 800 },
  { id: 3, name: 'ساعة يد كلاسيكية', price: 600 },
  { id: 4, name: 'نظارة شمسية أنيقة', price: 350 },
  { id: 5, name: 'حقيبة ظهر للسفر', price: 500 },
  { id: 6, name: 'سماعات رأس لاسلكية', price: 700 },
  { id: 7, name: 'عطر رجالي مميز', price: 900 },
  { id: 8, name: 'محفظة جلد طبيعي', price: 200 },
];

export default function EcommerceApp() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const formatPrice = (price) => {
    return price.toLocaleString('ar-EG') + ' ج.م';
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/file.00000000bbe08210aad06188ad3cc765.png" 
                alt="Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">الرئيسية</a>
              <a href="#products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">المنتجات</a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">عن المتجر</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">اتصل بنا</a>
            </nav>

            {/* Cart & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors"
                aria-label="سلة التسوق"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
                aria-label="القائمة"
              >
                <X className={`h-6 w-6 transform transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              الرئيسية
            </a>
            <a
              href="#products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              المنتجات
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              عن المتجر
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              اتصل بنا
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            اكتشف عالم التسوق بكل سهولة
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-indigo-200 mb-10 leading-relaxed">
            نقدم لكم تشكيلة مختارة من أرقى المنتجات التي تناسب ذوقكم الرفيع، بجودة عالية وأسعار تنافسية.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#products"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-indigo-900 bg-white hover:bg-indigo-50 shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              تسوق الآن
            </a>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">أحدث المنتجات</h2>
            <div className="mt-2 w-20 h-1 bg-indigo-600 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 bg-gray-100 overflow-hidden flex items-center justify-center p-6">
                <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                  {product.id === 1 && '👕'}
                  {product.id === 2 && '👟'}
                  {product.id === 3 && '⌚'}
                  {product.id === 4 && '🕶️'}
                  {product.id === 5 && '🎒'}
                  {product.id === 6 && '🎧'}
                  {product.id === 7 && '🧴'}
                  {product.id === 8 && '💼'}
                </span>
                <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  جديد
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                  <p className="text-2xl font-bold text-indigo-600 mb-4">{formatPrice(product.price)}</p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 px-4 bg-gray-900 hover:bg-indigo-600 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>أضف إلى السلة</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl leading-tight">
                قصتنا في عالم الأناقة والجودة
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                بدأنا بشغف كبير لتقديم تجربة تسوق استثنائية. نؤمن بأن كل قطعة تختارها تعبر عن شخصيتك، لذلك نحرص على انتقاء الأفضل دائماً ليكون بين يديك.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="border-r-4 border-indigo-600 pr-4">
                  <span className="block text-3xl font-bold text-gray-900">100%</span>
                  <span className="text-sm font-medium text-gray-500">جودة أصلية</span>
                </div>
                <div className="border-r-4 border-indigo-600 pr-4">
                  <span className="block text-3xl font-bold text-gray-900">دعم</span>
                  <span className="text-sm font-medium text-gray-500">فوري للطلبات</span>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="aspect-video bg-gray-100 rounded-3xl flex items-center justify-center shadow-inner relative overflow-hidden group">
                <span className="text-9xl transform group-hover:scale-105 transition-transform duration-500">🛍️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <ShoppingBag className="h-8 w-8 text-indigo-400" />
            <span className="text-2xl font-bold tracking-tight">MY STORY</span>
          </div>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            وجهتك الأولى لتسوق أرقى المنتجات بكل سهولة وأمان.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://wa.me/201000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-full transition-colors shadow-lg"
            >
              <span>طلب عبر واتساب</span>
            </a>
          </div>
          <p className="text-xs text-gray-500">
            جميع الحقوق محفوظة © 2026 MY STORY
          </p>
        </div>
      </footer>

      {/* Slide-over Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6 text-indigo-600" />
                  <span>سلة التسوق</span>
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-full focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <span className="text-6xl mb-4">🛒</span>
                    <p className="text-xl font-medium text-gray-500">سلتك فارغة حالياً</p>
                    <p className="text-sm text-gray-400 mt-2">ابدأ بإضافة بعض المنتجات المميزة!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                          {item.id === 1 && '👕'}
                          {item.id === 2 && '👟'}
                          {item.id === 3 && '⌚'}
                          {item.id === 4 && '🕶️'}
                          {item.id === 5 && '🎒'}
                          {item.id === 6 && '🎧'}
                          {item.id === 7 && '🧴'}
                          {item.id === 8 && '💼'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-gray-900 truncate">{item.name}</h4>
                          <p className="text-sm font-bold text-indigo-600 mt-1">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 focus:outline-none"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-semibold text-gray-900 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 focus:outline-none"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-medium text-gray-600">الإجمالي:</span>
                    <span className="text-3xl font-bold text-indigo-600">{formatPrice(cartTotal)}</span>
                  </div>
                  <a
                    href={`https://wa.me/201000000000?text=${encodeURIComponent(
                      'أرغب في طلب المنتجات التالية:\n' +
                        cart.map((i) => `- ${i.name} (${i.quantity} قطعة)`).join('\n') +
                        '\n\nالإجمالي: ' +
                        formatPrice(cartTotal)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl text-center block shadow-lg transition-transform active:scale-95"
                  >
                    إتمام الطلب عبر واتساب
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

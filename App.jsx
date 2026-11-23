import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ShoppingBag, Star, Menu } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'تيشيرت قطن فاخر', price: 350, category: 'ملابس', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', rating: 4.5 },
  { id: 2, name: 'حذاء رياضي مريح', price: 850, category: 'أحذية', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', rating: 4.8 },
  { id: 3, name: 'ساعة يد كلاسيكية', price: 1200, category: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop', rating: 4.9 },
  { id: 4, name: 'نظارة شمسية أنيقة', price: 450, category: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop', rating: 4.2 },
  { id: 5, name: 'حقيبة ظهر للسفر', price: 650, category: 'حقائب', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', rating: 4.7 },
  { id: 6, name: 'سماعات رأس لاسلكية', price: 1500, category: 'إلكترونيات', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', rating: 4.6 },
  { id: 7, name: 'عطر رجالي مميز', price: 900, category: 'عطور', image: 'https://images.unsplash.com/photo-1523293115678-d2900f52f5a2?w=500&h=500&fit=crop', rating: 4.4 },
  { id: 8, name: 'محفظة جلد طبيعي', price: 250, category: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop', rating: 4.3 },
];

export default function ECommerceApp() {
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
    <div dir="rtl" className="min-h-screen bg-gray-50 text-gray-800 font-sans" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-2xl tracking-tight text-gray-900">متجر my story</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">الرئيسية</a>
              <a href="#products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">المنتجات</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">التصنيفات</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">عروض خاصة</a>
            </nav>

            {/* Cart & Mobile Menu Buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 -mr-1 -mt-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button 
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            اكتشف أحدث صيحات الموضة والإلكترونيات
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-10 leading-relaxed">
            تسوق الآن واستمتع بتجربة شراء فريدة مع أفضل المنتجات وأنسب الأسعار.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-indigo-600">{formatPrice(product.price)}</span>
                  <button onClick={() => addToCart(product)} className="bg-gray-900 text-white p-2.5 rounded-xl hover:bg-indigo-600 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsCartOpen(false)} />
      )}
      <div className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">سلة المشتريات</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">سلة المشتريات فارغة</div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative group">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-indigo-600 font-semibold">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

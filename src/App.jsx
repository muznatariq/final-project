import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, Search, Menu, X, Sparkles, 
  ChevronRight, Star, ShieldCheck, Truck, RefreshCw, 
  ArrowRight, Check, Eye 
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Aurelia Diamond Solitaire Ring",
    category: "Rings",
    metal: "Platinum",
    price: 2450,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted in pure platinum featuring a brilliant 1.5-carat certified conflict-free solitaire diamond.",
    carat: "1.5 ct",
    purity: "Pt950"
  },
  {
    id: 2,
    name: "Royal Emerald & Diamond Necklace",
    category: "Necklaces",
    metal: "Yellow Gold",
    price: 4890,
    rating: 5.0,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    description: "Exquisite Zambian emerald framed by halo brilliant diamonds set in 18k yellow gold.",
    carat: "2.8 ct total",
    purity: "18K Gold"
  },
  {
    id: 3,
    name: "Celestial Diamond Drop Earrings",
    category: "Earrings",
    metal: "White Gold",
    price: 1850,
    rating: 4.8,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80",
    description: "Cascading pear-cut diamonds designed to capture light with every subtle movement.",
    carat: "1.2 ct",
    purity: "18K White Gold"
  },
  {
    id: 4,
    name: "Eternal Rose Gold Tennis Bracelet",
    category: "Bracelets",
    metal: "Rose Gold",
    price: 3200,
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1611591475271-e005085e6833?auto=format&fit=crop&w=800&q=80",
    description: "An unbroken stream of hand-selected round diamonds set in luminous 18k rose gold.",
    carat: "3.0 ct",
    purity: "18K Rose Gold"
  },
  {
    id: 5,
    name: "Lumina Vintage Gold Band",
    category: "Rings",
    metal: "Yellow Gold",
    price: 950,
    rating: 4.7,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    description: "Classic milgrain detailing etched into rich 18k yellow gold for timeless elegance.",
    carat: "N/A",
    purity: "18K Gold"
  },
  {
    id: 6,
    name: "Sovereign Diamond Choker",
    category: "Necklaces",
    metal: "Platinum",
    price: 6500,
    rating: 5.0,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    description: "A breathtaking masterpiece of baguette and round brilliant diamonds.",
    carat: "5.2 ct",
    purity: "Pt950"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedMetal, setSelectedMetal] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [currencyRate, setCurrencyRate] = useState(1);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    if (curr === 'USD') setCurrencyRate(1);
    if (curr === 'PKR') setCurrencyRate(280);
    if (curr === 'EUR') setCurrencyRate(0.92);
  };

  const formatPrice = (priceInUSD) => {
    const converted = priceInUSD * currencyRate;
    if (currency === 'PKR') return `Rs. ${converted.toLocaleString()}`;
    if (currency === 'EUR') return `€${converted.toLocaleString()}`;
    return `$${converted.toLocaleString()}`;
  };

  const filteredProducts = products.filter(item => {
    const matchesCat = activeTab === 'All' || item.category === activeTab;
    const matchesMetal = selectedMetal === 'All' || item.metal === selectedMetal;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesMetal && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const freeShippingThreshold = 3000;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Announcement Bar */}
      <div className="bg-amber-600 text-stone-950 text-xs font-semibold py-2 px-4 text-center tracking-widest uppercase">
        ✨ Complimentry Insured Worldwide Shipping & Signature Luxury Gift Box on Orders Over $3,000 ✨
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-stone-950/80 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <button className="md:hidden text-stone-300 hover:text-amber-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('All')}>
              <Sparkles className="text-amber-400" size={28} />
              <span className="text-2xl font-serif tracking-widest font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                AURA
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            {['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`transition-colors hover:text-amber-400 ${activeTab === cat ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : 'text-stone-300'}`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Actions & Currency */}
          <div className="flex items-center gap-5">
            <select 
              value={currency} 
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-amber-400"
            >
              <option value="USD">USD ($)</option>
              <option value="PKR">PKR (Rs)</option>
              <option value="EUR">EUR (€)</option>
            </select>

            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="relative text-stone-300 hover:text-amber-400 transition"
            >
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-stone-950 font-bold text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-amber-500 text-stone-950 p-2.5 rounded-full hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
            >
              <ShoppingBag size={20} />
              {cart.reduce((a, c) => a + c.qty, 0) > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-950 text-amber-400 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border border-amber-500">
                  {cart.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-stone-900 py-24 px-4 overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-amber-400 uppercase tracking-[0.3em] text-xs font-semibold block mb-4">
            Haute Joaillerie Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 tracking-wide leading-tight">
            Timeless Elegance Carved in <span className="italic font-normal text-amber-300">Starlight</span>
          </h1>
          <p className="text-stone-400 max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            Discover ethically sourced natural diamonds, certified precious gemstones, and master craftsmanship designed to be cherished for generations.
          </p>

          {/* Search & Metal Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-stone-950 p-2 rounded-2xl border border-stone-800 shadow-2xl">
            <div className="flex items-center flex-1 px-3 gap-2">
              <Search size={18} className="text-stone-500" />
              <input 
                type="text" 
                placeholder="Search rings, necklaces, diamonds..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full text-sm text-stone-200 focus:outline-none placeholder:text-stone-600"
              />
            </div>
            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              className="bg-stone-900 text-stone-300 text-xs px-4 py-3 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Metals</option>
              <option value="Platinum">Platinum</option>
              <option value="Yellow Gold">Yellow Gold</option>
              <option value="White Gold">White Gold</option>
              <option value="Rose Gold">Rose Gold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif tracking-wider">
            {activeTab === 'All' ? 'Signature Masterpieces' : `${activeTab} Collection`}
          </h2>
          <span className="text-stone-400 text-sm">{filteredProducts.length} unique pieces</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-stone-900/50 rounded-2xl border border-stone-800">
            <Sparkles className="mx-auto text-amber-500 mb-4" size={40} />
            <h3 className="text-lg font-medium text-stone-300 mb-2">No matching jewelry found</h3>
            <p className="text-stone-500 text-sm">Try adjusting your search query or metal filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => {
              const isWishlisted = wishlist.some(item => item.id === product.id);
              return (
                <div key={product.id} className="group bg-stone-900/40 rounded-2xl border border-stone-800/80 overflow-hidden hover:border-amber-500/50 transition duration-500 flex flex-col">
                  
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-stone-900">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-stone-950/80 backdrop-blur-md text-amber-400 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-stone-800">
                        {product.metal}
                      </span>
                    </div>

                    <button 
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition ${isWishlisted ? 'bg-amber-500 text-stone-950' : 'bg-stone-950/60 text-stone-300 hover:text-amber-400'}`}
                    >
                      <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    <button 
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-stone-950/90 text-stone-200 hover:text-amber-400 text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-stone-700 flex items-center gap-2 shadow-xl"
                    >
                      <Eye size={14} /> Quick View
                    </button>
                  </div>

                  {/* Content Details */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-amber-500 uppercase tracking-widest">{product.category}</span>
                        <div className="flex items-center gap-1 text-xs text-stone-400">
                          <Star size={13} className="text-amber-400 fill-amber-400" />
                          <span>{product.rating} ({product.reviews})</span>
                        </div>
                      </div>
                      <h3 className="font-serif text-lg text-stone-100 group-hover:text-amber-300 transition mb-2">
                        {product.name}
                      </h3>
                      <p className="text-stone-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-800/80 mt-auto">
                      <div>
                        <span className="text-xs text-stone-500 block">Price</span>
                        <span className="text-lg font-serif font-semibold text-amber-400">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-stone-100 text-stone-950 hover:bg-amber-400 text-xs uppercase tracking-wider font-medium px-4 py-2.5 rounded-xl transition shadow"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Brand Value Props */}
      <section className="bg-stone-900/60 border-t border-b border-stone-800 py-16 my-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <ShieldCheck className="mx-auto text-amber-400 mb-4" size={36} />
            <h4 className="font-serif text-lg mb-2">GIA Certified Diamonds</h4>
            <p className="text-stone-400 text-sm">Every diamond over 0.50 ct is independently certified for absolute quality and ethical sourcing.</p>
          </div>
          <div className="p-6">
            <Truck className="mx-auto text-amber-400 mb-4" size={36} />
            <h4 className="font-serif text-lg mb-2">Insured Express Delivery</h4>
            <p className="text-stone-400 text-sm">Fully insured armored transit right to your doorstep with signature confirmation required.</p>
          </div>
          <div className="p-6">
            <RefreshCw className="mx-auto text-amber-400 mb-4" size={36} />
            <h4 className="font-serif text-lg mb-2">Lifetime Warranty</h4>
            <p className="text-stone-400 text-sm">Complimentary cleaning, inspection, prong tightening, and lifetime manufacturing warranty.</p>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 bg-stone-950/60 text-stone-300 hover:text-amber-400 p-2 rounded-full transition"
            >
              <X size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-stone-950 aspect-square">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-amber-400 uppercase tracking-widest block mb-1">{quickViewProduct.category} • {quickViewProduct.metal}</span>
                  <h3 className="font-serif text-2xl text-stone-100 mb-3">{quickViewProduct.name}</h3>
                  <p className="text-amber-400 font-serif text-xl font-semibold mb-4">{formatPrice(quickViewProduct.price)}</p>
                  <p className="text-stone-400 text-xs leading-relaxed mb-6">{quickViewProduct.description}</p>
                  
                  <div className="space-y-2 text-xs text-stone-300 border-t border-b border-stone-800 py-4 mb-6">
                    <div className="flex justify-between"><span>Carat Weight:</span> <span className="font-semibold text-amber-400">{quickViewProduct.carat}</span></div>
                    <div className="flex justify-between"><span>Metal Purity:</span> <span className="font-semibold text-amber-400">{quickViewProduct.purity}</span></div>
                    <div className="flex justify-between"><span>Gift Packaging:</span> <span className="text-stone-400">Included Signature Velvet Box</span></div>
                  </div>
                </div>

                <button 
                  onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                  className="w-full bg-amber-500 text-stone-950 hover:bg-amber-400 font-medium py-3 rounded-xl uppercase tracking-wider text-xs transition"
                >
                  Add to Shopping Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-stone-900 border-l border-stone-800 w-full max-w-md h-full flex flex-col shadow-2xl">
            
            {/* Header */}
            <div className="p-6 border-b border-stone-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-amber-400" size={20} />
                <h3 className="font-serif text-lg tracking-wide">Your Shopping Bag</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-stone-950 p-4 border-b border-stone-800">
              <div className="flex justify-between text-xs text-stone-400 mb-2">
                <span>Free Insured Shipping</span>
                <span>{subtotal >= freeShippingThreshold ? 'Unlocked! 🎉' : `${formatPrice(freeShippingThreshold - subtotal)} away`}</span>
              </div>
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-stone-500">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20 text-amber-400" />
                  <p className="text-sm">Your shopping bag is currently empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 bg-stone-950/50 p-3 rounded-xl border border-stone-800">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-stone-900" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-sm text-stone-200 line-clamp-1">{item.name}</h4>
                        <span className="text-xs text-amber-400">{formatPrice(item.price)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 border border-stone-800 rounded-lg px-2 py-1 bg-stone-900">
                          <button 
                            onClick={() => setCart(cart.map(p => p.id === item.id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))}
                            className="text-stone-400 hover:text-stone-100 text-xs"
                          >-</button>
                          <span className="text-xs font-semibold">{item.qty}</span>
                          <button 
                            onClick={() => setCart(cart.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p))}
                            className="text-stone-400 hover:text-stone-100 text-xs"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => setCart(cart.filter(p => p.id !== item.id))}
                          className="text-stone-500 hover:text-red-400 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-800 bg-stone-950">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-stone-400 text-sm">Subtotal</span>
                  <span className="font-serif text-xl font-semibold text-amber-400">{formatPrice(subtotal)}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCheckoutSuccess(true);
                    setCart([]);
                  }}
                  className="w-full bg-amber-500 text-stone-950 hover:bg-amber-400 font-medium py-3.5 rounded-xl uppercase tracking-wider text-xs transition shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
                >
                  Proceed to Secure Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-stone-900 border-l border-stone-800 w-full max-w-md h-full flex flex-col shadow-2xl">
            <div className="p-6 border-b border-stone-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="text-amber-400" size={20} />
                <h3 className="font-serif text-lg tracking-wide">Your Wishlist</h3>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-20 text-stone-500">
                  <Heart size={48} className="mx-auto mb-4 opacity-20 text-amber-400" />
                  <p className="text-sm">Your wishlist is currently empty.</p>
                </div>
              ) : (
                wishlist.map(item => (
                  <div key={item.id} className="flex gap-4 bg-stone-950/50 p-3 rounded-xl border border-stone-800 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-stone-900" />
                    <div className="flex-1">
                      <h4 className="font-serif text-sm text-stone-200">{item.name}</h4>
                      <span className="text-xs text-amber-400">{formatPrice(item.price)}</span>
                    </div>
                    <button 
                      onClick={() => { addToCart(item); toggleWishlist(item); }}
                      className="bg-amber-500 text-stone-950 p-2 rounded-lg hover:bg-amber-400 text-xs font-medium"
                    >
                      Move to Bag
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      {isCheckoutSuccess && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-amber-400" size={32} />
            </div>
            <h3 className="font-serif text-2xl text-stone-100 mb-2">Order Confirmed!</h3>
            <p className="text-stone-400 text-sm mb-6 leading-relaxed">
              Thank you for choosing Aura Fine Jewelry. Your order is being handcrafted & prepared in our vault for insured shipment.
            </p>
            <button 
              onClick={() => setIsCheckoutSuccess(false)}
              className="w-full bg-amber-500 text-stone-950 hover:bg-amber-400 py-3 rounded-xl uppercase tracking-wider text-xs font-medium transition"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 py-12 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-amber-400" size={20} />
            <span className="font-serif text-lg tracking-widest text-stone-100 font-bold">AURA FINE JEWELRY</span>
          </div>
          <p>© 2026 Aura Fine Jewelry Inc. Crafted with precision for luxury connoisseurs worldwide.</p>
        </div>
      </footer>

    </div>
  );
}
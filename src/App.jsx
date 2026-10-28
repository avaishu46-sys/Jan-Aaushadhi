import React, { useState } from 'react';

const INVENTORY_DATA = [
  { id: 1, name: "Paracetamol Tablets IP 650mg", brandEquivalent: "Dolo 650 / Calpol", category: "Medicines", janPrice: 15.00, marketPrice: 34.00, desc: "Effective relief from high fever, body pain, and headaches." },
  { id: 2, name: "Amoxicillin & Potassium Clavulanate 625mg", brandEquivalent: "Augmentin 625 DUO", category: "Medicines", janPrice: 58.00, marketPrice: 204.00, desc: "Broad-spectrum antibiotic for respiratory & throat infections." },
  { id: 3, name: "Metformin Hydrochloride SR 500mg", brandEquivalent: "Glycomet 500", category: "Medicines", janPrice: 12.50, marketPrice: 42.00, desc: "First-line medicine for Type 2 Diabetes management." },
  { id: 4, name: "Atorvastatin Tablets IP 10mg", brandEquivalent: "Atorva 10 / Lipitor", category: "Medicines", janPrice: 9.00, marketPrice: 72.00, desc: "Lowers bad cholesterol and protects heart health." },
  { id: 5, name: "Pantoprazole Gastro-resistant 40mg", brandEquivalent: "Pan 40 / Pantocid", category: "Medicines", janPrice: 14.00, marketPrice: 110.00, desc: "Relief from acidity, GERD, and stomach ulcers." },
  { id: 6, name: "Oxymethazoline Nasal Drops 10ml", brandEquivalent: "Otrivin Adult Drops", category: "Personal Care", janPrice: 22.00, marketPrice: 95.00, desc: "Fast relief from blocked nose and sinus congestion." },
  { id: 7, name: "Biodegradable Sanitary Napkins (Pack of 4)", brandEquivalent: "Suvidha Napkin", category: "Personal Care", janPrice: 4.00, marketPrice: 28.00, desc: "Eco-friendly, highly absorbent sanitary pads under PMBJP." },
  { id: 8, name: "Protein Powder with Vitamins 200g", brandEquivalent: "Protinex / Threptin", category: "Nutraceuticals", janPrice: 160.00, marketPrice: 450.00, desc: "Nutritional supplement for energy, immunity, and recovery." }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [rxFile, setRxFile] = useState(null);
  const [lang, setLang] = useState("mr");

  const content = {
    mr: {
      portalTitle: "प्रधानमंत्री भारतीय जन औषधी केंद्र",
      location: "नळेगाव, ता. चाकूर, जि. लातूर (४१३५२४)",
      tagline: "सर्वसामान्यांना परवडणाऱ्या दरात गुणवत्तापूर्ण जेनेरिक औषधे",
      badgeSavings: "बाजारभावापेक्षा ५०% ते ९०% पर्यंत बचत",
      searchPlaceholder: "औषधाचे नाव किंवा ब्रँड शोधा (उदा. Dolo, Pan 40)...",
      rxHeader: "डॉक्टरांची चिठ्ठी (Prescription) अपलोड करा",
      rxSub: "तुमची औषधांची चिठ्ठी पाठवा. आमचे फार्मासिस्ट तपासणी करून कळवतील.",
      rxBtn: "📄 चिठ्ठी अपलोड करा (फोटो / PDF)",
      addToCart: "+ बास्केटमध्ये जोडा",
      cartTitle: "तुमची औषध बास्केट",
      totalSavings: "एकूण बचत",
      checkoutWhatsApp: "WhatsApp वर ऑर्डर पाठवा",
      storeAddress: "मुख्य रस्ता, बस स्टँडजवळ, नळेगाव, ता. चाकूर, जि. लातूर - ४१३५२४",
      phone: "+91 98765 43210"
    },
    en: {
      portalTitle: "Pradhan Mantri Bhartiya Janaushadhi Kendra",
      location: "Nalegaon, Taluka Chakur, Dist. Latur (413524)",
      tagline: "Quality Generic Medicines at Affordable Prices",
      badgeSavings: "50% to 90% Cheaper than Branded Alternatives",
      searchPlaceholder: "Search medicine generic name or brand (e.g. Dolo, Pan 40)...",
      rxHeader: "Upload Doctor's Prescription",
      rxSub: "Upload your prescription and our pharmacist will organize your order.",
      rxBtn: "📄 Upload Prescription File",
      addToCart: "+ Add to Basket",
      cartTitle: "Your Medicine Basket",
      totalSavings: "Total Money Saved",
      checkoutWhatsApp: "Order via WhatsApp",
      storeAddress: "Main Road, Near Bus Stand, Nalegaon, Taluka Chakur, Dist. Latur - 413524",
      phone: "+91 98765 43210"
    }
  };

  const t = content[lang];

  const filteredProducts = INVENTORY_DATA.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.brandEquivalent.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartJanTotal = cart.reduce((acc, item) => acc + item.janPrice * item.qty, 0);
  const cartMarketTotal = cart.reduce((acc, item) => acc + item.marketPrice * item.qty, 0);
  const totalSavings = cartMarketTotal - cartJanTotal;

  const sendWhatsAppOrder = () => {
    let text = `*New Order - Jan Aushadhi Kendra (Nalegaon)*\n------------------------------\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (x${item.qty}) - ₹${(item.janPrice * item.qty).toFixed(2)}\n`;
    });
    text += `------------------------------\n*Total:* ₹${cartJanTotal.toFixed(2)}\n*Saved:* ₹${totalSavings.toFixed(2)}\n`;
    if (rxFile) text += `*Prescription File:* ${rxFile}\n`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div>
      <div className="tricolor-bar"></div>

      {/* Top Banner */}
      <div className="top-announcement">
        <span>📍 {t.location}</span>
        <span>📞 {t.phone} | 🕒 8:00 AM - 9:00 PM</span>
      </div>

      {/* Header */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="brand">
            <div className="brand-icon">💊</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="brand-title">{t.portalTitle}</span>
                <span className="badge-tag">नळेगाव केंद्र</span>
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>{t.tagline}</p>
            </div>
          </div>

          <div className="nav-actions">
            <button className="btn-lang" onClick={() => setLang(lang === "mr" ? "en" : "mr")}>
              🌐 {lang === "mr" ? "English" : "मराठी"}
            </button>
            <button className="btn-cart" onClick={() => setIsCartOpen(true)}>
              🛒 Basket
              {cart.length > 0 && <span className="cart-count">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="hero-tag">🇮🇳 PMBJP Official Partner - Nalegaon (Latur)</span>
            <h1 className="hero-heading">नळेगाव आणि परिसरातील नागरिकांसाठी स्वस्त व उत्तम जेनेरिक औषधे</h1>
            <p style={{ color: '#cbd5e1', fontSize: '14px' }}>{t.badgeSavings}</p>

            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Rx Prescription Box */}
          <div className="rx-box">
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{t.rxHeader}</h3>
            <p style={{ fontSize: '12px', color: '#cbd5e1' }}>{t.rxSub}</p>

            {rxFile ? (
              <p style={{ marginTop: '12px', color: '#34d399', fontWeight: 'bold' }}>✓ {rxFile}</p>
            ) : (
              <label className="btn-upload">
                {t.rxBtn}
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files[0] && setRxFile(e.target.files[0].name)}
                />
              </label>
            )}
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <main className="main-content">
        <div className="location-banner">
          <div>
            <strong style={{ color: '#c2410c' }}>📍 दुकानाचा पत्ता (Store Address):</strong>
            <p style={{ fontSize: '13px' }}>{t.storeAddress}</p>
          </div>
          <a
            href="https://maps.google.com/?q=Nalegaon+Latur+Maharashtra"
            target="_blank"
            rel="noreferrer"
            style={{ background: '#f97316', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}
          >
            🗺️ Google Maps वर रस्ता पहा
          </a>
        </div>

        {/* Category Selection Tabs */}
        <div className="category-tabs">
          {["All", "Medicines", "Personal Care", "Nutraceuticals"].map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => {
            const savingsPercent = Math.round(((product.marketPrice - product.janPrice) / product.marketPrice) * 100);

            return (
              <div key={product.id} className="card">
                <div>
                  <div className="card-header">
                    <span className="card-cat">{product.category}</span>
                    <span className="card-discount">{savingsPercent}% सूट</span>
                  </div>

                  <h3 className="card-title">{product.name}</h3>

                  <div className="brand-sub">
                    पर्यायी ब्रँड: <strong>{product.brandEquivalent}</strong>
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748b' }}>{product.desc}</p>
                </div>

                <div>
                  <div className="price-row">
                    <div>
                      <div className="market-price">बाजार भाव: ₹{product.marketPrice.toFixed(2)}</div>
                      <div className="jan-price">₹{product.janPrice.toFixed(2)}</div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#059669', fontWeight: 'bold' }}>
                      बचत ₹{(product.marketPrice - product.janPrice).toFixed(0)}
                    </div>
                  </div>

                  <button className="btn-add" onClick={() => addToCart(product)}>
                    {t.addToCart}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-overlay">
          <div className="cart-drawer">
            <div>
              <div className="cart-header">
                <h3>🛍️ {t.cartTitle}</h3>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                  onClick={() => setIsCartOpen(false)}
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '40px', color: '#94a3b8' }}>बास्केट रिकामी आहे.</p>
              ) : (
                <div style={{ marginTop: '16px' }}>
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <strong>{item.name}</strong>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>
                          ₹{item.janPrice.toFixed(2)} x {item.qty}
                        </p>
                      </div>
                      <span style={{ fontWeight: '800' }}>₹{(item.janPrice * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div>
                <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '10px', textAlign: 'center', marginBottom: '10px' }}>
                  <p style={{ fontSize: '12px', color: '#065f46' }}>{t.totalSavings}</p>
                  <strong style={{ fontSize: '22px', color: '#059669' }}>₹{totalSavings.toFixed(2)}</strong>
                </div>

                <button className="btn-whatsapp" onClick={sendWhatsAppOrder}>
                  💬 {t.checkoutWhatsApp}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect, useCallback, memo } from 'react';
import { createClient } from '@supabase/supabase-js';

const heroSlides = [
  {
    image: "/img1.jpg",
    label: 'FREE DELIVERY ON ORDERS OVER Rs. 3000',
    title: "Pakistan's Finest",
    subtitle: 'Shirt Collection',
    text: 'Premium shirts for every occasion — formal, casual, and everything in between.',
  },
  {
    image: "/img2.jpg",
    label: 'NEW ARRIVALS',
    title: 'Elegant Formal',
    subtitle: 'Shirts for Office',
    text: 'Discover premium formal shirts crafted for comfort and confidence.',
  },
  {
    image: "/img3.jpg",
    label: 'SUMMER STYLE',
    title: 'Cool & Comfortable',
    subtitle: 'Summer Essentials',
    text: 'Lightweight shirts built for warm days and effortless looks.',
  },
];

// Jo URL aur Key aap ne copy ki hain, unhein yahan lagayein
const SUPABASE_URL = 'https://mxycveycpypseebedysp.supabase.co/';
const SUPABASE_ANON_KEY = 'sb_publishable_oC7wW-5zWP2e3UC5ttx1Iw_rdzWaGxW'; // Yahan wo lambi wali key paste karein

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Oxford',
    price: 2499,
    originalPrice: 3200,
    category: 'Formal',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Pink'],
    rating: 4.5,
    reviews: 128,
    stock: 15,
    badge: 'Bestseller',
    description:
      'A timeless Oxford shirt crafted from 100% premium cotton. Perfect for office wear or smart casual occasions.',
    images: ['👕'],
    imageUrl: "/img-4.webp",
  },
  {
    id: 2,
    name: 'Urban Slim Fit',
    price: 1899,
    originalPrice: 2500,
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Olive'],
    rating: 4.7,
    reviews: 245,
    stock: 8,
    badge: 'Hot',
    description:
      'Slim fit casual shirt with a modern cut. Made from breathable cotton-blend fabric for all-day comfort.',
    images: ['👕', '👔'],
    imageUrl: "/img3.jpg",
  },
  {
    id: 3,
    name: 'Linen Breeze',
    price: 2199,
    originalPrice: 2800,
    category: 'Summer',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'White', 'Sky Blue'],
    rating: 4.3,
    reviews: 89,
    stock: 20,
    badge: 'New',
    description:
      'Ultra-light linen shirt perfect for warm weather. Features a relaxed fit and natural breathability.',
    images: ['👕'],
    imageUrl: "/img3.jpg",
  },
  {
    id: 4,
    name: 'Flannel Comfort',
    price: 1699,
    originalPrice: 2200,
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red Check', 'Green Check', 'Blue Check'],
    rating: 4.6,
    reviews: 312,
    stock: 5,
    badge: 'Low Stock',
    description:
      'Cozy flannel shirt with classic plaid pattern. Soft brushed fabric keeps you warm in cooler months.',
    images: ['👔'],
    imageUrl: "/img2.jpg",  
  },
  {
    id: 5,
    name: 'Premium Denim',
    price: 2799,
    originalPrice: 3500,
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Light Wash', 'Dark Wash', 'Indigo'],
    rating: 4.8,
    reviews: 178,
    stock: 12,
    badge: 'Premium',
    description:
      'Stylish denim shirt that pairs perfectly with both jeans and chinos. Durable yet comfortable fabric.',
    images: ['👕', '👔'],
  },
  {
    id: 6,
    name: 'Mandarin Collar',
    price: 2099,
    originalPrice: 2700,
    category: 'Formal',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Charcoal'],
    rating: 4.4,
    reviews: 67,
    stock: 18,
    badge: 'Trending',
    description:
      'Sophisticated mandarin collar shirt with a clean minimalist design. Ideal for formal events.',
    images: ['👔'],
    imageUrl: "/img1.jpg",
  },
  {
    id: 7,
    name: 'Polo Classic',
    price: 1499,
    originalPrice: 1900,
    category: 'Sports',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'White', 'Red', 'Green'],
    rating: 4.5,
    reviews: 420,
    stock: 30,
    badge: 'Popular',
    description:
      'Classic polo shirt made from moisture-wicking fabric. Perfect for casual outings and light sports.',
    images: ['👕'],
    imageUrl: "/img4.jpg"
  },
  {
    id: 8,
    name: 'Hawaiian Vibes',
    price: 1799,
    originalPrice: 2300,
    category: 'Summer',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Tropical Blue', 'Sunset Orange', 'Palm Green'],
    rating: 4.2,
    reviews: 56,
    stock: 22,
    badge: 'Fun',
    description:
      'Vibrant Hawaiian-print shirt for beach days and summer parties. Light, airy, and full of personality.',
    images: ['👕'],
    imageUrl: "/img-4.webp",
  },
  {
    id: 9,
    name: 'Executive Stripe',
    price: 3299,
    originalPrice: 4200,
    category: 'Formal',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue Stripe', 'Black Stripe', 'Grey Stripe'],
    rating: 4.9,
    reviews: 93,
    stock: 7,
    badge: 'Luxury',
    description:
      'Premium striped dress shirt with fine stitching. Crafted for the modern executive.',
    images: ['👔'],
  },
];

const CATEGORIES = ['All', 'Formal', 'Casual', 'Summer', 'Sports'];
const SIZES_FILTER = ['S', 'M', 'L', 'XL', 'XXL'];

const colorMap = {
  White: '#f8f8f5',
  Blue: '#3b6bca',
  Pink: '#e88faa',
  Black: '#1a1a1a',
  Navy: '#1a2a5e',
  Olive: '#6b7c3e',
  Beige: '#c8b89a',
  'Sky Blue': '#7ab8d4',
  'Red Check': '#c0392b',
  'Green Check': '#27ae60',
  'Blue Check': '#2980b9',
  'Light Wash': '#a8c4d4',
  'Dark Wash': '#2c4a6e',
  Indigo: '#3d3a8c',
  Charcoal: '#4a4a4a',
  Red: '#e74c3c',
  Green: '#27ae60',
  'Tropical Blue': '#00a8cc',
  'Sunset Orange': '#f39c12',
  'Palm Green': '#16a085',
  'Blue Stripe': '#2c5282',
  'Black Stripe': '#2d3748',
  'Grey Stripe': '#718096',
};

// Memoized CheckoutPage component to prevent re-renders causing input focus loss
const CheckoutPageComponent = ({ 
  cart, 
  cartTotal, 
  cartCount, 
  checkoutStep, 
  checkoutForm, 
  styles, 
  setCheckoutStep, 
  setCheckoutForm, 
  notify, 
  placeOrder 
}) => {
  const delivery = cartTotal >= 3000 ? 0 : 150;
  const total = cartTotal + delivery;
  
  if (cart.length === 0)
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          Your cart is empty
        </div>
        <button style={styles.btn} onClick={() => setCheckoutStep(0)}>
          Shop Now
        </button>
      </div>
    );
  
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '1rem' : '2rem' }}>
      <h1 style={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 28, fontWeight: 900, marginBottom: 24 }}>
        Checkout
      </h1>
      {/* Steps */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          marginBottom: 32,
          background: '#f7f5f0',
          borderRadius: 12,
          padding: 4,
        }}
      >
        {[
          ['1', 'Delivery'],
          ['2', 'Review'],
          ['3', 'Confirm'],
        ].map(([n, label], i) => (
          <div
            key={n}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '10px',
              borderRadius: 10,
              background: checkoutStep === i + 1 ? '#1a1a1a' : 'transparent',
              color: checkoutStep === i + 1 ? '#fff' : '#888',
              fontWeight: 700,
              fontSize: 14,
              cursor: checkoutStep > i + 1 ? 'pointer' : 'default',
              transition: 'all 0.2s',
            }}
            onClick={() => checkoutStep > i + 1 && setCheckoutStep(i + 1)}
          >
            {label}
          </div>
        ))}
      </div>

      {checkoutStep === 1 && (
        <div
          className="checkoutGrid"
          style={{
            display: 'grid',
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth > 768 ? '1fr 380px' : '1fr',
            gap: '2rem',
          }}
        >
          <div style={{ background: '#fff', borderRadius: 16, padding: typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 28 }}>
            <h2 style={{ marginTop: 0, fontSize: 18, fontWeight: 800 }}>
              Delivery Information
            </h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {[
                ['name', 'Full Name', 'text'],
                ['email', 'Email Address', 'email'],
                ['phone', 'Phone Number', 'tel'],
                ['address', 'Street Address', 'text'],
                ['city', 'City', 'text'],
                ['province', 'Province', 'text'],
                ['zip', 'Postal Code', 'text'],
              ].map(([key, placeholder, type]) => (
                <input
                  key={key}
                  type={type}
                  style={styles.input}
                  placeholder={placeholder}
                  value={checkoutForm[key]}
                  onChange={(e) =>
                    setCheckoutForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                />
              ))}
              <textarea
                style={{ ...styles.input, height: 72, resize: 'vertical' }}
                placeholder="Order notes (optional)"
                value={checkoutForm.notes}
                onChange={(e) =>
                  setCheckoutForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </div>
            <div
              style={{
                marginTop: 20,
                background: '#f7f5f0',
                borderRadius: 12,
                padding: 16,
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: 24 }}>💳</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>
                  Cash on Delivery
                </div>
                <div style={{ fontSize: 13, color: '#666' }}>
                  Pay in cash when your order arrives at your doorstep. No
                  online payment required.
                </div>
              </div>
            </div>
            <button
              style={{
                ...styles.btn,
                width: '100%',
                justifyContent: 'center',
                marginTop: 20,
                fontSize: 16,
              }}
              onClick={() => {
                const required = [
                  'name',
                  'phone',
                  'address',
                  'city',
                  'province',
                ];
                if (required.some((k) => !checkoutForm[k])) {
                  notify('Please fill all required fields');
                  return;
                }
                setCheckoutStep(2);
              }}
            >
              Continue to Review →
            </button>
          </div>
          {/* Order Summary */}
          <div>
            <div
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 24,
                position: 'sticky',
                top: 80,
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: 16, fontWeight: 800 }}>
                Order Summary ({cartCount} items)
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item.key}
                    style={{ display: 'flex', gap: 10, alignItems: 'center' }}
                  >
                    <div
                      style={{
                        background: '#f0ede8',
                        borderRadius: 8,
                        width: 44,
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      {item.images[0]}
                      <span
                        style={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          background: '#1a1a1a',
                          color: '#fff',
                          borderRadius: '50%',
                          width: 18,
                          height: 18,
                          fontSize: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {item.qty}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#888' }}>
                        {item.color} · {item.size}
                      </div>
                    </div>
                    <div
                      style={{ fontWeight: 700, fontSize: 13, flexShrink: 0 }}
                    >
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #eee', paddingTop: 12 }}>
                {[
                  ['Subtotal', `Rs. ${cartTotal.toLocaleString()}`],
                  [
                    'Delivery',
                    delivery === 0 ? 'Free 🎉' : `Rs. ${delivery}`,
                  ],
                  ['Payment', 'Cash on Delivery'],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 13,
                      color: '#666',
                      marginBottom: 6,
                    }}
                  >
                    <span>{k}</span>
                    <span
                      style={{
                        color:
                          k === 'Delivery' && delivery === 0
                            ? '#27ae60'
                            : '#333',
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 800,
                    fontSize: 17,
                    marginTop: 10,
                    borderTop: '1px solid #eee',
                    paddingTop: 10,
                  }}
                >
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {checkoutStep === 2 && (
        <div
          className="checkoutGrid"
          style={{
            display: 'grid',
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth > 768 ? '1fr 380px' : '1fr',
            gap: '2rem',
          }}
        >
          <div style={{ background: '#fff', borderRadius: 16, padding: typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 28 }}>
            <h2 style={{ marginTop: 0 }}>Review Your Order</h2>
            <div
              style={{
                marginBottom: 20,
                background: '#f7f5f0',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                📍 Delivery Address
              </div>
              <div style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>
                {checkoutForm.name}
                <br />
                {checkoutForm.phone}
                <br />
                {checkoutForm.address}, {checkoutForm.city},{' '}
                {checkoutForm.province} {checkoutForm.zip}
              </div>
              <button
                style={{
                  ...styles.btnSm,
                  background: '#fff',
                  color: '#1a1a1a',
                  border: '1px solid #ddd',
                  marginTop: 10,
                  fontSize: 12,
                }}
                onClick={() => setCheckoutStep(1)}
              >
                Edit
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                marginBottom: 24,
              }}
            >
              {cart.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    gap: 14,
                    background: '#f7f5f0',
                    borderRadius: 12,
                    padding: 14,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      background: '#e8e4df',
                      borderRadius: 10,
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 30,
                      flexShrink: 0,
                    }}
                  >
                    {item.images[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: '#888' }}>
                      {item.color} · Size {item.size} · Qty {item.qty}
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>
                    Rs. {(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: '#fff8e1',
                border: '1.5px solid #f39c12',
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                display: 'flex',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 24 }}>⚠️</span>
              <div style={{ fontSize: 13 }}>
                <strong>Cash on Delivery:</strong> Please have exact cash of{' '}
                <strong>Rs. {total.toLocaleString()}</strong> ready at the
                time of delivery.
              </div>
            </div>
            <button
              style={{
                ...styles.btn,
                width: '100%',
                justifyContent: 'center',
                fontSize: 16,
                padding: 14,
              }}
              onClick={() => setCheckoutStep(3)}
            >
              Proceed to Confirm →
            </button>
          </div>
          <div>
            <div
              style={{ background: '#fff', borderRadius: 16, padding: 24 }}
            >
              <h3 style={{ marginTop: 0, fontSize: 16, fontWeight: 800 }}>
                Order Total
              </h3>
              {[
                ['Subtotal', `Rs. ${cartTotal.toLocaleString()}`],
                ['Delivery', delivery === 0 ? 'Free' : `Rs. ${delivery}`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 14,
                    color: '#666',
                    marginBottom: 8,
                  }}
                >
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: 20,
                  borderTop: '1px solid #eee',
                  paddingTop: 12,
                  marginTop: 6,
                }}
              >
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: '#888',
                  textAlign: 'center',
                }}
              >
                💳 Cash on Delivery
              </div>
            </div>
          </div>
        </div>
      )}

      {checkoutStep === 3 && (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: 40,
              textAlign: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>📋</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 900 }}>
              Confirm Your Order
            </h2>
            <p style={{ color: '#666', marginBottom: 24 }}>
              By confirming, you agree to pay{' '}
              <strong>Rs. {total.toLocaleString()}</strong> in cash on
              delivery.
            </p>
            <div
              style={{
                background: '#f7f5f0',
                borderRadius: 14,
                padding: 20,
                marginBottom: 24,
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 12 }}>
                Order Details
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                <span style={{ color: '#888' }}>Items</span>
                <span>{cartCount} shirt(s)</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                <span style={{ color: '#888' }}>Delivery to</span>
                <span>{checkoutForm.city}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                <span style={{ color: '#888' }}>Payment</span>
                <span>Cash on Delivery</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 18,
                  fontWeight: 800,
                  borderTop: '1px solid #ddd',
                  paddingTop: 12,
                  marginTop: 6,
                }}
              >
                <span>Amount Due</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
            <button
              style={{
                ...styles.btn,
                width: '100%',
                justifyContent: 'center',
                fontSize: 17,
                padding: 16,
                background: '#27ae60',
              }}
              onClick={placeOrder}
            >
              ✅ Place Order
            </button>
            <button
              style={{
                ...styles.btnOutline,
                width: '100%',
                justifyContent: 'center',
                marginTop: 12,
                padding: 14,
              }}
              onClick={() => setCheckoutStep(2)}
            >
              ← Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MemoizedCheckoutPage = memo(CheckoutPageComponent);

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize2, setSelectedSize2] = useState('');
  const [qty, setQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zip: '',
    notes: '',
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
  });
  const [productReviews, setProductReviews] = useState({});

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const sendOrderEmails = async (order) => {
    try {
      const response = await fetch('/api/order-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order,
          buyerEmail: checkoutForm.email,
          buyerName: checkoutForm.name,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Email send failed');
      }

      console.log('Order emails sent successfully');
      return true;
    } catch (error) {
      console.error('Email trigger failed', error);
      notify('⚠ Unable to send confirmation email.');
      return false;
    }
  };

  const addToCart = (product, color, size, quantity = 1) => {
    const key = `${product.id}-${color}-${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing)
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + quantity } : i
        );
      return [...prev, { ...product, key, color, size, qty: quantity }];
    });
    notify(`✓ ${product.name} added to cart!`);
    setCartOpen(true);
  };

  const removeFromCart = (key) =>
    setCart((prev) => prev.filter((i) => i.key !== key));
  const updateQty = (key, delta) =>
    setCart((prev) =>
      prev.map((i) =>
        i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    notify(
      wishlist.includes(id) ? 'Removed from wishlist' : '❤ Added to wishlist!'
    );
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filteredProducts = PRODUCTS.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  )
    .filter((p) => !selectedSize || p.sizes.includes(selectedSize))
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(
      (p) =>
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      return 0;
    });

  const placeOrder = async () => {
    // TODO: Tracking ID generation disabled for now — will implement in future
    const orderId = null;
    const now = new Date();
    const orderDate = now.toLocaleDateString('en-PK');
    const orderTime = now.toLocaleTimeString('en-PK', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const orderTimestamp = now.toISOString();

    // 1. Pehle Supabase Database mein save karein
    try {
      const { data, error } = await supabase.from('orders').insert([
       {
         customer_name: checkoutForm.name,
         order_id: orderId,
         customer_phone: checkoutForm.phone,
         customer_email: checkoutForm.email,
         customer_city: checkoutForm.city,
         customer_address: checkoutForm.address,
         order_items: cart, // 👈 Change JSON.stringify(cart) to just cart
         total_amount: cartTotal,
         status: 'Confirmed',
         order_date: orderDate,
         order_time: orderTime,
         ordered_at: orderTimestamp,
        },
      ]);

      if (error) {
        console.error('Supabase Error:', error);
        return notify("❌ Database error: Order couldn't save!");
      }
    } catch (err) {
      console.error(err);
      return notify('❌ Connection failed!');
    }

    // 2. Agar database mein save ho jaye, toh screen par success dikhein
    const order = {
      id: orderId,
      date: orderDate,
      items: [...cart],
      total: cartTotal,
      address: checkoutForm,
      status: 'Confirmed',
      payment: 'Cash on Delivery',
    };

    sendOrderEmails(order);
    setOrders((prev) => [order, ...prev]);
    setOrderData(order);
    setCart([]);
    setPage('order-success');
    setCheckoutStep(1);
    notify('🎉 Order Saved to Supabase!');
  };

  const styles = {
    app: {
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      minHeight: '100vh',
      background: '#f7f5f0',
      color: '#1a1a1a',
    },
    nav: {
      background: '#1a1a1a',
      color: '#fff',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    },
    // navLogo: {
    //   fontSize: 22,
    //   fontWeight: 800,
    //   letterSpacing: '-0.5px',
    //   cursor: 'pointer',
    //   color: '#fff',
    // },
    navLinks: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
    navLink: {
      color: '#ccc',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      textDecoration: 'none',
      transition: 'color 0.2s',
    },
    navBtn: {
      background: 'transparent',
      border: '1.5px solid #444',
      color: '#fff',
      borderRadius: 8,
      padding: '6px 14px',
      cursor: 'pointer',
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      transition: 'all 0.2s',
    },
    cartBadge: {
      background: '#e74c3c',
      color: '#fff',
      borderRadius: '50%',
      width: 18,
      height: 18,
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      background: '#1a1a1a',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      padding: '12px 28px',
      cursor: 'pointer',
      fontSize: 15,
      fontWeight: 600,
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
    },
    btnOutline: {
      background: 'transparent',
      color: '#1a1a1a',
      border: '2px solid #1a1a1a',
      borderRadius: 10,
      padding: '10px 24px',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      transition: 'all 0.2s',
    },
    btnSm: {
      background: '#1a1a1a',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '8px 18px',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 600,
    },
    mobileMenuBtn: {
      background: 'transparent',
      border: '1.5px solid #fff',
      color: '#fff',
      borderRadius: 10,
      padding: '10px 12px',
      cursor: 'pointer',
      fontSize: 18,
      lineHeight: 1,
    },
    card: {
      background: '#fff',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    },
    badge: {
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.3px',
    },
    input: {
      width: '100%',
      padding: '11px 14px',
      border: '1.5px solid #e0e0e0',
      borderRadius: 10,
      fontSize: 14,
      boxSizing: 'border-box',
      outline: 'none',
      fontFamily: 'inherit',
    },
    select: {
      padding: '10px 14px',
      border: '1.5px solid #e0e0e0',
      borderRadius: 10,
      fontSize: 14,
      background: '#fff',
      cursor: 'pointer',
      outline: 'none',
      fontFamily: 'inherit',
    },
    tag: {
      padding: '4px 12px',
      borderRadius: 20,
      border: '1.5px solid #e0e0e0',
      background: '#fff',
      fontSize: 13,
      cursor: 'pointer',
      fontWeight: 500,
      transition: 'all 0.15s',
    },
    section: { padding: '3rem 2rem', maxWidth: 1200, margin: '0 auto' },
    grid3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: 800,
      marginBottom: 8,
      letterSpacing: '-0.5px',
    },
    pill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 14px',
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
  };

  const badgeColor = (b) => {
    const map = {
      Bestseller: '#f39c12',
      Hot: '#e74c3c',
      New: '#27ae60',
      'Low Stock': '#e67e22',
      Premium: '#8e44ad',
      Trending: '#2980b9',
      Popular: '#16a085',
      Fun: '#e91e63',
      Luxury: '#7f8c8d',
    };
    return map[b] || '#555';
  };

  const StarRating = ({ rating, size = 14 }) => (
    <span style={{ color: '#f39c12', fontSize: size }}>
      {'★'.repeat(Math.floor(rating))}
      {'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ color: '#888', marginLeft: 4 }}>{rating}</span>
    </span>
  );

  const ProductCard = ({ product }) => {
    const inWish = wishlist.includes(product.id);
    const [hovered, setHovered] = useState(false);
    return (
      <div
        style={{
          ...styles.card,
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered
            ? '0 8px 32px rgba(0,0,0,0.15)'
            : '0 2px 12px rgba(0,0,0,0.08)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #f0ede8, #e8e4df)',
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 80,
            }}
            onClick={() => {
              setSelectedProduct(product);
              setSelectedColor(product.colors[0]);
              setSelectedSize2('');
              setQty(1);
              setPage('product');
            }}
          >
            {(() => {
              const firstImage = product.imageUrl || product.images?.[0];
              const isImageUrl =
                typeof firstImage === 'string' &&
                firstImage.includes('/') &&
                !firstImage.startsWith('data:image');
              return isImageUrl ? (
                <img
                  src={firstImage}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 16,
                  }}
                />
              ) : (
                firstImage
              );
            })()}
          </div>
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <span
              style={{
                ...styles.badge,
                background: badgeColor(product.badge),
                color: '#fff',
              }}
            >
              {product.badge}
            </span>
          </div>
          <button
            onClick={() => toggleWishlist(product.id)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: inWish ? '#e74c3c' : '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {inWish ? '❤' : '♡'}
          </button>
          {product.stock < 10 && (
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                background: '#e74c3c',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 10,
              }}
            >
              Only {product.stock} left!
            </div>
          )}
        </div>
        <div
          style={{ padding: '16px' }}
          onClick={() => {
            setSelectedProduct(product);
            setSelectedColor(product.colors[0]);
            setSelectedSize2('');
            setQty(1);
            setPage('product');
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: '#888',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: 4,
            }}
          >
            {product.category}
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
            {product.name}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 10,
            }}
          >
            <StarRating rating={product.rating} />
            <span style={{ fontSize: 12, color: '#888' }}>
              ({product.reviews})
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginBottom: 12,
              flexWrap: 'wrap',
            }}
          >
            {product.colors.slice(0, 4).map((c) => (
              <div
                key={c}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: colorMap[c] || '#e40000',
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 1.5px #ddd',
                }}
                title={c}
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 19, fontWeight: 800, color: '#1a1a1a' }}>
              Rs. {product.price.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: 13,
                color: '#aaa',
                textDecoration: 'line-through',
              }}
            >
              Rs. {product.originalPrice.toLocaleString()}
            </span>
            <span style={{ fontSize: 12, color: '#27ae60', fontWeight: 700 }}>
              {Math.round((1 - product.price / product.originalPrice) * 100)}%
              off
            </span>
          </div>
        </div>
        <div style={{ padding: '0 16px 16px', display: 'flex', gap: 8 }}>
          <button
            style={{ ...styles.btnSm, flex: 1 }}
            onClick={() =>
              addToCart(
                product,
                product.colors[0],
                product.sizes[1] || product.sizes[0]
              )
            }
          >
            Add to Cart
          </button>
          <button
            style={{ ...styles.btnSm, background: '#f7f5f0', color: '#1a1a1a' }}
            onClick={() => {
              addToCart(
                product,
                product.colors[0],
                product.sizes[1] || product.sizes[0]
              );
              setPage('checkout');
              setCartOpen(false);
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    );
  };

  const Hero = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    const activeSlide = heroSlides[slideIndex];

    return (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
          height: 520,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
          }}
        >
          {heroSlides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: index === slideIndex ? 1 : 0,
                transition: 'opacity 1s ease',
                display: 'block',
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(26,26,26,0.28) 0%, rgba(26,26,26,0.88) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            background: 'rgba(230, 4, 4, 0.03)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            background: 'rgba(233, 197, 197, 0.02)',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '5rem 2rem',
            textAlign: 'center',
            maxWidth: 700,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: '#e74c3c',
              color: '#fff',
              borderRadius: 20,
              padding: '4px 16px',
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 20,
              letterSpacing: '0.5px',
            }}
          >
            {heroSlides[slideIndex].label}
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              margin: '0 0 1rem',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            {heroSlides[slideIndex].title}
            <br />
            <span style={{ color: '#f39c12' }}>
              {heroSlides[slideIndex].subtitle}
            </span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: '#aaa',
              marginBottom: 32,
              maxWidth: 500,
              margin: '0 auto 32px',
            }}
          >
            {heroSlides[slideIndex].text}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                ...styles.btn,
                background: '#f39c12',
                fontSize: 16,
                padding: '14px 36px',
              }}
              onClick={() => setPage('shop')}
            >
              Shop Now →
            </button>
            <button
              style={{
                ...styles.btnOutline,
                color: '#fff',
                borderColor: '#fff',
                padding: '14px 28px',
                fontSize: 16,
              }}
              onClick={() => setPage('shop')}
            >
              View Collection
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              marginTop: 40,
              flexWrap: 'wrap',
            }}
          >
            {[
              ['50+', 'Styles'],
              ['10K+', 'Happy Customers'],
              ['100%', 'Cotton'],
              ['Easy', 'Returns'],
            ].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#f39c12' }}>
                  {val}
                </div>
                <div style={{ fontSize: 13, color: '#8b8181' }}>{label}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              marginTop: 24,
            }}
          >
            {heroSlides.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setSlideIndex(dotIndex)}
                style={{
                  width: dotIndex === slideIndex ? 16 : 10,
                  height: 10,
                  borderRadius: 999,
                  border: 'none',
                  background: dotIndex === slideIndex ? '#f39c12' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const HomePage = () => (
    <div>
      <Hero />
      {/* Featured Categories */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: 24,
          }}
        >
          {[
            {
              name: 'Formal',
              icon: '👔',
              desc: 'Office & Events',
              color: '#1a2a5e',
              count: 3,
            },
            {
              name: 'Casual',
              icon: '👕',
              desc: 'Everyday Wear',
              color: '#27ae60',
              count: 3,
            },
            {
              name: 'Summer',
              icon: '🌞',
              desc: 'Light & Breezy',
              color: '#f39c12',
              count: 2,
            },
          ].map((cat) => (
            <div
              key={cat.name}
              style={{
                background: cat.color,
                borderRadius: 16,
                padding: '28px 20px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                color: '#fff',
              }}
              onClick={() => {
                setSelectedCategory(cat.name);
                setPage('shop');
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{cat.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 17 }}>{cat.name}</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>{cat.desc}</div>
              <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>
                {cat.count} styles
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      <div style={{ background: '#fff', padding: '3rem 0' }}>
        <div style={styles.section}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <div>
              <h2 style={{ ...styles.sectionTitle, marginBottom: 4 }}>
                Bestsellers
              </h2>
              <p style={{ color: '#888', marginTop: 0 }}>
                Our most-loved shirts
              </p>
            </div>
            <button style={styles.btnOutline} onClick={() => setPage('shop')}>
              View All
            </button>
          </div>
          <div style={styles.grid3}>
            {PRODUCTS.filter((p) =>
              ['Bestseller', 'Hot', 'Popular'].includes(p.badge)
            ).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div
        style={{
          backgroundImage: "url('/img5.png')",
          ImgUrl: "url('/img5.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: 0 }}>
          Summer Sale — Up to 40% Off!
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 24, marginTop: 10}}>
          Limited time offer on selected styles
        </p>
        <button
          style={{ ...styles.btn, background: '#fff', color: '#e67e22' }}
          onClick={() => {
            setSelectedCategory('Summer');
            setPage('shop');
          }}
        >
          Shop Summer Collection
        </button>
      </div>

      {/* New Arrivals */}
      <div style={styles.section}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <h2 style={{ ...styles.sectionTitle, marginBottom: 4 }}>
              New Arrivals
            </h2>
            <p style={{ color: '#888', marginTop: 0 }}>
              Fresh styles just dropped
            </p>
          </div>
          <button style={styles.btnOutline} onClick={() => setPage('shop')}>
            View All
          </button>
        </div>
        <div style={styles.grid3}>
          {PRODUCTS.slice(5, 9).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Features */}
      <div
        style={{ background: '#1a1a1a', color: '#fff', padding: '3rem 2rem' }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {[
            {
              icon: '🚚',
              title: 'Free Delivery',
              desc: 'On orders above Rs. 3,000',
            },
            {
              icon: '💳',
              title: 'Cash on Delivery',
              desc: 'Pay when you receive',
            },
            { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
            {
              icon: '✅',
              title: 'Genuine Quality',
              desc: '100% authentic products',
            },
          ].map((f) => (
            <div key={f.title} style={{ padding: '1rem' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                {f.title}
              </div>
              <div style={{ color: '#888', fontSize: 14 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={styles.section}>
        <h2
          style={{
            ...styles.sectionTitle,
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          What Customers Say
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {[
            {
              name: 'Ahmed K.',
              city: 'Rawalpindi',
              text: 'Amazing quality! The Oxford shirt is exactly what I needed for office. Fast delivery too.',
              rating: 5,
            },
            {
              name: 'Bilal M.',
              city: 'Lahore',
              text: 'Love the collection. Bought 3 shirts last month. Cash on delivery is super convenient.',
              rating: 5,
            },
            {
              name: 'Sara J.',
              city: 'Karachi',
              text: 'Gifted the polo shirt to my husband. He absolutely loves it. Will order again!',
              rating: 4,
            },
          ].map((t) => (
            <div
              key={t.name}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <StarRating rating={t.rating} size={16} />
              <p style={{ margin: '12px 0', color: '#444', lineHeight: 1.6 }}>
                "{t.text}"
              </p>
              <div style={{ fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: '#888' }}>{t.city}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ShopPage = () => (
    <div>
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #eee',
          padding: '1rem 2rem',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Search */}
            <div
              style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#aaa',
                }}
              >
                🔍
              </span>
              <input
                style={{ ...styles.input, paddingLeft: 36 }}
                placeholder="Search shirts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Categories */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  style={{
                    ...styles.pill,
                    background: selectedCategory === c ? '#1a1a1a' : '#f7f5f0',
                    color: selectedCategory === c ? '#fff' : '#444',
                    border:
                      '1.5px solid ' +
                      (selectedCategory === c ? '#1a1a1a' : '#e0e0e0'),
                  }}
                  onClick={() => setSelectedCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <select
              style={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          {/* Size & Price Filters */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <span style={{ fontSize: 13, color: '#888', fontWeight: 600 }}>
              Size:
            </span>
            {SIZES_FILTER.map((s) => (
              <button
                key={s}
                style={{
                  ...styles.tag,
                  background: selectedSize === s ? '#1a1a1a' : '#fff',
                  color: selectedSize === s ? '#fff' : '#444',
                  borderColor: selectedSize === s ? '#1a1a1a' : '#e0e0e0',
                }}
                onClick={() => setSelectedSize(selectedSize === s ? '' : s)}
              >
                {s}
              </button>
            ))}
            <span style={{ fontSize: 13, color: '#888', marginLeft: 12 }}>
              Price: Rs. {priceRange[0].toLocaleString()} –{' '}
              {priceRange[1].toLocaleString()}
            </span>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              style={{ width: 120 }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
            {filteredProducts.length} shirts found
          </div>
        </div>
      </div>
      <div style={styles.section}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>No shirts found</div>
            <p>Try adjusting your filters</p>
            <button
              style={styles.btn}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSize('');
                setPriceRange([0, 5000]);
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={styles.grid3}>
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ProductPage = () => {
    if (!selectedProduct) return null;
    const p = selectedProduct;
    const pReviews = productReviews[p.id] || [];
    const savings = p.originalPrice - p.price;
    return (
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
        {/* Breadcrumb */}
        <div
          style={{
            fontSize: 13,
            color: '#888',
            marginBottom: 20,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <span style={{ cursor: 'pointer' }} onClick={() => setPage('home')}>
            Home
          </span>{' '}
          /
          <span style={{ cursor: 'pointer' }} onClick={() => setPage('shop')}>
            Shop
          </span>{' '}
          /<span style={{ color: '#1a1a1a', fontWeight: 600 }}>{p.name}</span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            gap: '3rem',
          }}
        >
          {/* Image */}
          <div>
            <div
              style={{
                background: 'linear-gradient(135deg, #f0ede8, #e8e4df)',
                borderRadius: 20,
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 140,
                marginBottom: 16,
              }}
            >
                  {(() => {
                    const firstImage = p.imageUrl || p.images?.[0];
                    const isImageUrl =
                      typeof firstImage === 'string' &&
                      firstImage.includes('/') &&
                      !firstImage.startsWith('data:image');
                    return isImageUrl ? (
                      <img
                        src={firstImage}
                        alt={p.name}
                        style={{
                          width: '100%',
                          height: typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 400,
                          objectFit: 'cover',
                          borderRadius: 20,
                        }}
                      />
                    ) : (
                      firstImage
                    );
                  })()}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {p.images.map((img, i) => {
                const isImg = typeof img === 'string' && img.includes('/') && !img.startsWith('data:image');
                return (
                  <div
                    key={i}
                    style={{
                      background: '#f0ede8',
                      borderRadius: 12,
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 40,
                      border: '2px solid #1a1a1a',
                      overflow: 'hidden',
                    }}
                  >
                    {isImg ? (
                      <img src={img} alt={`${p.name}-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      img
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Details */}
          <div>
            <span
              style={{
                ...styles.badge,
                background: badgeColor(p.badge),
                color: '#fff',
                marginBottom: 12,
                display: 'inline-block',
              }}
            >
              {p.badge}
            </span>
            <h1
              style={{
                fontSize: 30,
                fontWeight: 900,
                margin: '0 0 8px',
                letterSpacing: '-0.5px',
              }}
            >
              {p.name}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <StarRating rating={p.rating} size={16} />
              <span style={{ fontSize: 13, color: '#888' }}>
                ({p.reviews} reviews)
              </span>
              <span style={{ fontSize: 13, color: '#27ae60', fontWeight: 600 }}>
                ● {p.stock} in stock
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 32, fontWeight: 900 }}>
                Rs. {p.price.toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: '#aaa',
                  textDecoration: 'line-through',
                }}
              >
                Rs. {p.originalPrice.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                background: '#e8f5e9',
                color: '#27ae60',
                borderRadius: 8,
                padding: '8px 14px',
                display: 'inline-block',
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              You save Rs. {savings.toLocaleString()} (
              {Math.round((savings / p.originalPrice) * 100)}%)
            </div>
            {/* Color */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>
                Color: <span style={{ fontWeight: 400 }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {p.colors.map((c) => (
                  <button
                    key={c}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: colorMap[c] || '#ccc',
                      border:
                        selectedColor === c
                          ? '3px solid #1a1a1a'
                          : '2px solid #ddd',
                      cursor: 'pointer',
                      boxShadow:
                        selectedColor === c
                          ? '0 0 0 3px rgba(0,0,0,0.1)'
                          : 'none',
                    }}
                    title={c}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
            {/* Size */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>
                Size:
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    style={{
                      ...styles.tag,
                      background: selectedSize2 === s ? '#1a1a1a' : '#fff',
                      color: selectedSize2 === s ? '#fff' : '#444',
                      borderColor: selectedSize2 === s ? '#1a1a1a' : '#e0e0e0',
                      width: 48,
                      textAlign: 'center',
                      padding: '8px 0',
                    }}
                    onClick={() => setSelectedSize2(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {!selectedSize2 && (
                <div style={{ color: '#e74c3c', fontSize: 12, marginTop: 6 }}>
                  Please select a size
                </div>
              )}
            </div>
            {/* Qty */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>
                Quantity:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  style={{
                    width: 36,
                    height: 36,
                    border: '1.5px solid #e0e0e0',
                    borderRadius: 8,
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  −
                </button>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    minWidth: 24,
                    textAlign: 'center',
                  }}
                >
                  {qty}
                </span>
                <button
                  style={{
                    width: 36,
                    height: 36,
                    border: '1.5px solid #e0e0e0',
                    borderRadius: 8,
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                  onClick={() => setQty(Math.min(p.stock, qty + 1))}
                >
                  +
                </button>
              </div>
            </div>
            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <button
                style={{ ...styles.btn, flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  if (!selectedSize2) {
                    notify('Please select a size!');
                    return;
                  }
                  addToCart(p, selectedColor, selectedSize2, qty);
                }}
              >
                🛒 Add to Cart
              </button>
              <button
                style={{
                  ...styles.btn,
                  flex: 1,
                  justifyContent: 'center',
                  background: '#27ae60',
                }}
                onClick={() => {
                  if (!selectedSize2) {
                    notify('Please select a size!');
                    return;
                  }
                  addToCart(p, selectedColor, selectedSize2, qty);
                  setPage('checkout');
                }}
              >
                ⚡ Buy Now
              </button>
            </div>
            <button
              style={{
                ...styles.btnOutline,
                width: '100%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onClick={() => toggleWishlist(p.id)}
            >
              {wishlist.includes(p.id) ? '❤ In Wishlist' : '♡ Add to Wishlist'}
            </button>
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                gap: '1rem',
                fontSize: 13,
                color: '#888',
              }}
            >
              <span>✅ Genuine Product</span>
              <span>🚚 Fast Delivery</span>
              <span>💳 Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 24 }}
        >
          <div
            style={{
              display: 'flex',
              gap: 0,
              borderBottom: '2px solid #eee',
              marginBottom: 24,
            }}
          >
            {['description', 'details', 'reviews'].map((tab) => (
              <button
                key={tab}
                style={{
                  padding: '10px 24px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: activeTab === tab ? 700 : 400,
                  color: activeTab === tab ? '#1a1a1a' : '#888',
                  borderBottom:
                    activeTab === tab
                      ? '2px solid #1a1a1a'
                      : '2px solid transparent',
                  marginBottom: -2,
                  textTransform: 'capitalize',
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === 'description' && (
            <div
              style={{
                lineHeight: 1.8,
                color: '#444',
                fontSize: 15,
                maxWidth: 700,
              }}
            >
              <p>{p.description}</p>
              <ul style={{ paddingLeft: 20, color: '#555' }}>
                <li>Premium quality fabric — soft and durable</li>
                <li>Available in multiple colors and sizes</li>
                <li>Machine washable for easy care</li>
                <li>Crafted with attention to detail</li>
              </ul>
            </div>
          )}
          {activeTab === 'details' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                maxWidth: 500,
              }}
            >
              {[
                ['Category', p.category],
                ['Fabric', 'Premium Cotton'],
                ['Fit', 'Regular Fit'],
                ['Care', 'Machine Wash Cold'],
                ['Available Sizes', p.sizes.join(', ')],
                ['Colors', p.colors.join(', ')],
              ].map(([k, v]) => (
                <React.Fragment key={k}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: '#888',
                      fontSize: 14,
                      padding: '10px 0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      padding: '10px 0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    {v}
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center', minWidth: 120 }}>
                  <div style={{ fontSize: 48, fontWeight: 900 }}>
                    {p.rating}
                  </div>
                  <StarRating rating={p.rating} size={20} />
                  <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
                    {p.reviews + pReviews.length} reviews
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div
                      key={star}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: 13, width: 20 }}>{star}★</span>
                      <div
                        style={{
                          flex: 1,
                          background: '#eee',
                          borderRadius: 4,
                          height: 8,
                        }}
                      >
                        <div
                          style={{
                            width: `${star === 5 ? 65 : star === 4 ? 20 : 10}%`,
                            background: '#f39c12',
                            height: '100%',
                            borderRadius: 4,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* User reviews */}
              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                {pReviews.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#f7f5f0',
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>{r.name}</span>
                      <StarRating rating={r.rating} />
                    </div>
                    <p style={{ margin: 0, color: '#555', fontSize: 14 }}>
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
              {/* Write review */}
              <div
                style={{
                  marginTop: 24,
                  background: '#f7f5f0',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <h3 style={{ marginTop: 0 }}>Write a Review</h3>
                <input
                  style={{ ...styles.input, marginBottom: 10 }}
                  placeholder="Your name"
                  value={reviewForm.name}
                  onChange={(e) =>
                    setReviewForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <div style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 14, fontWeight: 600 }}>
                    Rating:{' '}
                  </label>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 22,
                        color: n <= reviewForm.rating ? '#f39c12' : '#ccc',
                      }}
                      onClick={() =>
                        setReviewForm((f) => ({ ...f, rating: n }))
                      }
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  style={{ ...styles.input, height: 80, resize: 'vertical' }}
                  placeholder="Share your experience..."
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm((f) => ({ ...f, comment: e.target.value }))
                  }
                />
                <button
                  style={{ ...styles.btn, marginTop: 10 }}
                  onClick={() => {
                    if (!reviewForm.name || !reviewForm.comment) {
                      notify('Please fill all fields');
                      return;
                    }
                    setProductReviews((prev) => ({
                      ...prev,
                      [p.id]: [...(prev[p.id] || []), { ...reviewForm }],
                    }));
                    setReviewForm({ name: '', rating: 5, comment: '' });
                    notify('✓ Review submitted!');
                  }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Related products */}
        <div style={{ marginTop: 40 }}>
          <h2 style={styles.sectionTitle}>You May Also Like</h2>
          <div style={styles.grid3}>
            {PRODUCTS.filter(
              (pr) => pr.category === p.category && pr.id !== p.id
            )
              .slice(0, 3)
              .map((pr) => (
                <ProductCard key={pr.id} product={pr} />
              ))}
          </div>
        </div>
      </div>
    );
  };

  const CartSidebar = () => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: cartOpen ? 'flex' : 'none',
      }}
    >
      <div
        style={{ flex: 1, background: 'rgba(0,0,0,0.4)' }}
        onClick={() => setCartOpen(false)}
      />
      <div
        style={{
          width: Math.min(420, window.innerWidth * 0.9),
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
            Your Cart ({cartCount})
          </h2>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 24,
            }}
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {cart.length === 0 ? (
            <div
              style={{ textAlign: 'center', padding: '3rem 0', color: '#888' }}
            >
              <div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
                Your cart is empty
              </div>
              <button
                style={styles.btn}
                onClick={() => {
                  setCartOpen(false);
                  setPage('shop');
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.map((item) => {
                const imageUrl = item.imageUrl || item.images?.[0];
                const isImg = typeof imageUrl === 'string' && imageUrl.includes('/');
                return (
                  <div
                    key={item.key}
                    style={{
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                      background: '#f7f5f0',
                      borderRadius: 14,
                      padding: 14,
                    }}
                  >
                    <div
                      style={{
                        background: '#e8e4df',
                        borderRadius: 10,
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 32,
                        flexShrink: 0,
                        overflow: 'hidden',
                      }}
                    >
                      {isImg ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        imageUrl
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{ fontSize: 12, color: '#888', marginBottom: 6 }}
                      >
                        {item.color} · Size {item.size}
                      </div>
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                      >
                        <button
                          style={{
                            width: 28,
                            height: 28,
                            border: '1px solid #ddd',
                            borderRadius: 6,
                            background: '#fff',
                            cursor: 'pointer',
                            fontWeight: 700,
                          }}
                          onClick={() => updateQty(item.key, -1)}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontWeight: 700,
                            minWidth: 20,
                            textAlign: 'center',
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          style={{
                            width: 28,
                            height: 28,
                            border: '1px solid #ddd',
                            borderRadius: 6,
                            background: '#fff',
                            cursor: 'pointer',
                            fontWeight: 700,
                          }}
                          onClick={() => updateQty(item.key, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </div>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#e74c3c',
                          fontSize: 12,
                          marginTop: 4,
                        }}
                        onClick={() => removeFromCart(item.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: 24, borderTop: '1px solid #eee' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
                fontSize: 14,
                color: '#666',
              }}
            >
              <span>Subtotal</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
                fontSize: 14,
                color: '#666',
              }}
            >
              <span>Delivery</span>
              <span style={{ color: '#27ae60' }}>
                {cartTotal >= 3000 ? 'Free' : 'Rs. 150'}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 16,
                fontSize: 18,
                fontWeight: 800,
                borderTop: '1px solid #eee',
                paddingTop: 12,
                marginTop: 6,
              }}
            >
              <span>Total</span>
              <span>
                Rs.{' '}
                {(cartTotal + (cartTotal >= 3000 ? 0 : 150)).toLocaleString()}
              </span>
            </div>
            <button
              style={{
                ...styles.btn,
                width: '100%',
                justifyContent: 'center',
                fontSize: 16,
                padding: '14px',
              }}
              onClick={() => {
                setCartOpen(false);
                setPage('checkout');
              }}
            >
              Proceed to Checkout →
            </button>
            <button
              style={{
                ...styles.btnOutline,
                width: '100%',
                justifyContent: 'center',
                marginTop: 10,
                padding: '12px',
              }}
              onClick={() => {
                setCartOpen(false);
                setPage('shop');
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const OrderSuccess = () => (
    <div
      style={{
        maxWidth: 600,
        margin: '3rem auto',
        padding: '0 2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: 48,
          boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: '#e8f5e9',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            margin: '0 auto 20px',
          }}
        >
          ✅
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#1a1a1a',
            marginBottom: 8,
          }}
        >
          Order Confirmed!
        </h1>
        <p style={{ color: '#666', marginBottom: 8 }}>
          Thank you, <strong>{orderData?.address?.name}</strong>!
        </p>
        <div
          style={{
            background: '#f7f5f0',
            borderRadius: 12,
            padding: '12px 20px',
            display: 'inline-block',
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 13, color: '#888' }}>Order ID: </span>
          <span style={{ fontWeight: 800, fontSize: 15 }}>{orderData?.id}</span>
        </div>
        <div
          style={{
            background: '#f7f5f0',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            textAlign: 'left',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 12 }}>
            Delivery Details
          </div>
          {[
            [
              '📍 Address',
              `${orderData?.address?.address}, ${orderData?.address?.city}`,
            ],
            ['📞 Phone', orderData?.address?.phone],
            ['💳 Payment', 'Cash on Delivery'],
            ['🚚 Estimated', '3–5 Business Days'],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: 'flex',
                gap: 12,
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              <span style={{ color: '#888', minWidth: 120 }}>{k}</span>
              <span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: '#fff8e1',
            border: '1px solid #f39c12',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            fontSize: 14,
            color: '#7a5c00',
          }}
        >
          💡 Please have{' '}
          <strong>Rs. {orderData?.total?.toLocaleString()}</strong> ready in
          cash for the delivery person.
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{ ...styles.btn, flex: 1, justifyContent: 'center' }}
            onClick={() => {
              setPage('home');
              setOrderData(null);
            }}
          >
            Continue Shopping
          </button>
          <button
            style={{ ...styles.btnOutline, flex: 1, justifyContent: 'center' }}
            onClick={() => setPage('orders')}
          >
            Track Orders
          </button>
        </div>
      </div>
    </div>
  );

  const WishlistPage = () => (
    <div style={styles.section}>
      <h1 style={{ ...styles.sectionTitle, marginBottom: 24 }}>
        My Wishlist ({wishlist.length})
      </h1>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>❤</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Your wishlist is empty
          </div>
          <button style={styles.btn} onClick={() => setPage('shop')}>
            Explore Shirts
          </button>
        </div>
      ) : (
        <div style={styles.grid3}>
          {PRODUCTS.filter((p) => wishlist.includes(p.id)).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );

  const OrdersPage = () => (
    <div style={styles.section}>
      <h1 style={{ ...styles.sectionTitle, marginBottom: 24 }}>My Orders</h1>
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            No orders yet
          </div>
          <button style={styles.btn} onClick={() => setPage('shop')}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>
                    Order #{order.id}
                  </div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
                    Placed on {order.date}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span
                    style={{
                      background: '#e8f5e9',
                      color: '#27ae60',
                      fontWeight: 700,
                      fontSize: 13,
                      padding: '4px 12px',
                      borderRadius: 20,
                    }}
                  >
                    ✅ {order.status}
                  </span>
                  <span style={{ fontSize: 13, color: '#888' }}>
                    💳 {order.payment}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                  marginBottom: 16,
                }}
              >
                {order.items.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      background: '#f7f5f0',
                      borderRadius: 10,
                      padding: '8px 14px',
                      fontSize: 13,
                    }}
                  >
                    <span style={{ marginRight: 6 }}>{item.images[0]}</span>
                    {item.name} × {item.qty}{' '}
                    <span style={{ color: '#888' }}>
                      ({item.color}, {item.size})
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #eee',
                  paddingTop: 12,
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 13, color: '#666' }}>
                  📍 {order.address.address}, {order.address.city}
                  <br />
                  📞 {order.address.phone}
                </div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>
                  Rs. {order.total.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const AboutPage = () => (
    <div>
      <div
        style={{
          background: '#1a1a1a',
          color: '#fff',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 40, fontWeight: 900, margin: 0 }}>
          About <span style={{ color: '#f39c12' }}>TeeKing</span>
        </h1>
        <p style={{ color: '#aaa', fontSize: 18, marginTop: 12 }}>
          Pakistan's premium shirt destination
        </p>
      </div>
      <div style={{ ...styles.section, maxWidth: 800 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            padding: 40,
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontWeight: 800, fontSize: 24, marginTop: 0 }}>
            Our Story
          </h2>
          <p style={{ lineHeight: 1.9, color: '#555', fontSize: 16 }}>
            Founded in Rawalpindi, TeeKing was born from a passion for quality
            shirts that don't compromise on style. We believe every man deserves
            a great shirt — whether it's for a boardroom meeting, a casual
            weekend, or a special occasion.
          </p>
          <p style={{ lineHeight: 1.9, color: '#555', fontSize: 16 }}>
            We source the finest fabrics and work with skilled craftsmen to
            bring you shirts that last. With Cash on Delivery as our payment
            method, we make shopping simple and risk-free for our customers
            across Pakistan.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            ['10,000+', 'Happy Customers'],
            ['50+', 'Shirt Styles'],
            ['3–5 Days', 'Delivery Time'],
            ['7 Day', 'Return Policy'],
          ].map(([val, label]) => (
            <div
              key={label}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 24,
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#f39c12',
                  marginBottom: 6,
                }}
              >
                {val}
              </div>
              <div style={{ fontSize: 14, color: '#666' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    return (
      <div style={{ ...styles.section, maxWidth: 700 }}>
        <h1 style={{ ...styles.sectionTitle, marginBottom: 8 }}>Contact Us</h1>
        <p style={{ color: '#888', marginBottom: 32 }}>
          Have questions? We'd love to hear from you.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: 32,
          }}
        >
          {[
            ['📞', 'Phone', '+92 300 1234567'],
            ['✉️', 'Email', 'andazeyebayan@gmail.com'],
            ['📍', 'Address', 'Rawalpindi, Punjab, Pakistan'],
            ['🕐', 'Hours', 'Mon–Sat, 9am–8pm'],
          ].map(([icon, label, val]) => (
            <div
              key={label}
              style={{
                background: '#fff',
                borderRadius: 14,
                padding: 20,
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#888',
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontWeight: 600 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: 28 }}>
          <h2 style={{ marginTop: 0, fontSize: 18, fontWeight: 800 }}>
            Send a Message
          </h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <input
              style={styles.input}
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <input
              type="email"
              style={styles.input}
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
            <textarea
              style={{ ...styles.input, height: 120, resize: 'vertical' }}
              placeholder="Your message..."
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
            />
          </div>
          <button
            style={{ ...styles.btn, marginTop: 16 }}
            onClick={() => {
              notify("✓ Message sent! We'll reply soon.");
              setForm({ name: '', email: '', message: '' });
            }}
          >
            Send Message →
          </button>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer
      className="animatedFooter"
      style={{
        background: '#1a1a1a',
        color: '#fff',
        padding: '3rem 2rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12,
              }}
            >
              <object
                data="/Andaze%20byan.pdf"
                aria-label="اندازِ بیاں logo"
                style={{ height: 40, width: 'auto', display: 'block', overflow: 'hidden', pointerEvents: 'none' }}
              >
                <img src="/logo.png" alt="اندازِ بیاں" style={{ height: 60, objectFit: 'contain', marginBottom: 10 }} />
              </object>
            </div>
            <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7 }}>
              Pakistan's finest shirt collection. Premium quality, unbeatable
              prices, delivered to your door.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Quick Links</div>
            {[
              ['Home', 'home'],
              ['Shop', 'shop'],
              ['About', 'about'],
              ['Contact', 'contact'],
            ].map(([label, pg]) => (
              <div
                key={pg}
                className="footerLink"
                style={{
                  color: '#888',
                  fontSize: 14,
                  marginBottom: 8,
                  cursor: 'pointer',
                }}
                onClick={() => setPage(pg)}
              >
                {label}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Categories</div>
            {CATEGORIES.slice(1).map((c) => (
              <div
                key={c}
                style={{
                  color: '#888',
                  fontSize: 14,
                  marginBottom: 8,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSelectedCategory(c);
                  setPage('shop');
                }}
              >
                {c} Shirts
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>
              Customer Care
            </div>
            {[
              '7-Day Returns',
              'Size Guide',
              'Track Order',
              'Cash on Delivery',
            ].map((item) => (
              <div
                key={item}
                style={{ color: '#888', fontSize: 14, marginBottom: 8 }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid #333',
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 13,
            color: '#666',
          }}
        >
          <div>© 2024 TeeKing. All rights reserved.</div>
          <div>Made with ❤ in Pakistan 🇵🇰</div>
        </div>
      </div>
    </footer>
  );

  const pages = {
    home: <HomePage />,
    shop: <ShopPage />,
    product: <ProductPage />,
    checkout: <MemoizedCheckoutPage cart={cart} cartTotal={cartTotal} cartCount={cartCount} checkoutStep={checkoutStep} checkoutForm={checkoutForm} styles={styles} setCheckoutStep={setCheckoutStep} setCheckoutForm={setCheckoutForm} notify={notify} placeOrder={placeOrder} />,
    'order-success': <OrderSuccess />,
    wishlist: <WishlistPage />,
    orders: <OrdersPage />,
    about: <AboutPage />,
    contact: <ContactPage />,
  };

  return (
    <div style={styles.app}>
      {/* Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: 80,
            right: 20,
            background: '#1a1a1a',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            zIndex: 500,
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            maxWidth: 300,
            animation: 'slideIn 0.3s ease',
          }}
        >
          {notification}
        </div>
      )}
      {/* Nav */}
      <nav className="animatedNav" style={styles.nav}>
        <div style={styles.navLogo} onClick={() => setPage('home')}>
          <object
            data="/logo.png"
            aria-label="اندازِ بیاں logo"
            style={{ height: 60, width: 'auto', display: 'block', overflow: 'hidden', pointerEvents: 'none' }}
          >
            {/* fallback to png if PDF can't render */}
            <img src="/logo.png" alt="اندازِ بیاں" style={{ height: 60, objectFit: 'contain' }} />
          </object>
        </div>
        <button
          className="mobileMenuBtn"
          style={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className="desktopNavLinks" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {[
            ['Home', 'home'],
            ['Shop', 'shop'],
            ['About', 'about'],
            ['Contact', 'contact'],
          ].map(([label, pg]) => (
            <span
              key={pg}
              className="animatedNavLink"
              style={{
                ...styles.navLink,
                color: page === pg ? '#f39c12' : '#ccc',
              }}
              onClick={() => setPage(pg)}
            >
              {label}
            </span>
          ))}
          <span style={styles.navLink} onClick={() => setPage('orders')}>
            Orders
          </span>
          <span
            style={{
              ...styles.navLink,
              color: wishlist.length > 0 ? '#e74c3c' : '#ccc',
            }}
            onClick={() => setPage('wishlist')}
          >
            ❤{' '}
            {wishlist.length > 0 && (
              <span style={{ ...styles.cartBadge, display: 'inline-flex' }}>
                {wishlist.length}
              </span>
            )}
          </span>
          <button style={styles.navBtn} onClick={() => setCartOpen(true)}>
            🛒 Cart{' '}
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </button>
        </div>
      </nav>
      <CartSidebar />
      <div
        className={`mobileMenuOverlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`mobileMenuDrawer ${mobileMenuOpen ? 'open' : ''}`}
          style={{
            height: '100%',
            width: '85%',
            maxWidth: 340,
            background: '#111',
            color: '#fff',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '-12px 0 40px rgba(0,0,0,0.35)',
            overflowY: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <div>
              <div style={{ fontWeight: 900, fontSize: 20 }}>TeeKing Menu</div>
              <div style={{ color: '#bbb', fontSize: 13, marginTop: 4 }}>
                Explore the store, orders, and support.
              </div>
            </div>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 26,
                cursor: 'pointer',
              }}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: '#222',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              🔍
            </span>
            <input
              type="search"
              placeholder="Search shirts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1px solid #333',
                padding: '12px 14px',
                background: '#0f0f0f',
                color: '#fff',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Home', 'home'],
              ['Shop', 'shop'],
              ['Orders', 'orders'],
              ['Wishlist', 'wishlist'],
              ['About', 'about'],
              ['Contact', 'contact'],
            ].map(([label, pg]) => (
              <button
                key={pg}
                style={{
                  background: '#1f1f1f',
                  border: '1px solid #333',
                  color: '#fff',
                  borderRadius: 14,
                  padding: '14px 16px',
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setPage(pg);
                  setMobileMenuOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            style={{
              borderTop: '1px solid #222',
              paddingTop: '1rem',
              marginTop: '1rem',
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: '#aaa',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 10,
              }}
            >
              Categories
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {CATEGORIES.slice(1).map((cat) => (
                <button
                  key={cat}
                  style={{
                    background: selectedCategory === cat ? '#f39c12' : '#1f1f1f',
                    border: '1px solid #333',
                    borderRadius: 14,
                    color: selectedCategory === cat ? '#111' : '#fff',
                    padding: '10px 14px',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setPage('shop');
                    setMobileMenuOpen(false);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid #222',
              paddingTop: '1rem',
              display: 'grid',
              gap: '0.75rem',
            }}
          >
            <button
              style={{
                background: '#f39c12',
                border: 'none',
                borderRadius: 14,
                padding: '14px 16px',
                color: '#111',
                fontWeight: 800,
                cursor: 'pointer',
              }}
              onClick={() => {
                setCartOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              🛒 Cart ({cartCount})
            </button>
            <button
              style={{
                background: '#1f1f1f',
                border: '1px solid #333',
                borderRadius: 14,
                padding: '14px 16px',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={() => {
                setPage('wishlist');
                setMobileMenuOpen(false);
              }}
            >
              ❤ Wishlist ({wishlist.length})
            </button>
          </div>

          <div
            style={{
              marginTop: 'auto',
              fontSize: 13,
              color: '#777',
              lineHeight: 1.6,
            }}
          >
            Need help? Contact us anytime for support and order tracking.
          </div>
        </div>
      </div>
      <main key={page} className="pageFade" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {pages[page] || <HomePage />}
      </main>
      <Footer />
      <style>{`
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; }
        button:hover { opacity: 0.9; }
        input:focus, textarea:focus, select:focus { border-color: #1a1a1a !important; outline: none; }
        .desktopNavLinks { display: flex; }
        .mobileMenuBtn { display: none; }
        .mobileMenuOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          z-index: 150;
          visibility: hidden;
          opacity: 0;
          transition: background 0.25s ease, opacity 0.25s ease;
          display: flex;
          justify-content: flex-end;
          pointer-events: none;
        }
        .mobileMenuOverlay.open {
          background: rgba(0, 0, 0, 0.55);
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
        }
        .mobileMenuDrawer {
          transform: translateX(100%);
          transition: transform 0.25s ease;
        }
        .mobileMenuDrawer.open {
          transform: translateX(0);
        }
        .checkoutGrid { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; }
        .stickySummary { position: sticky; top: 80px; }
        .animatedNav { animation: fadeInDown 0.35s ease both; }
        .animatedFooter { animation: fadeInUp 0.35s ease both; }
        .pageFade { animation: fadeIn 0.35s ease both; }
        .animatedNavLink {
          transition: color 0.25s ease, transform 0.25s ease;
          display: inline-block;
        }
        .animatedNavLink:hover {
          color: #f39c12;
          transform: translateY(-1px);
        }
        .footerLink {
          display: block;
          transition: color 0.25s ease, transform 0.25s ease;
          width: fit-content;
        }
        .footerLink:hover {
          color: #f39c12;
          transform: translateY(-1px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .desktopNavLinks { display: none !important; }
          .mobileMenuBtn { display: inline-flex !important; }
          .checkoutGrid { grid-template-columns: 1fr; }
          .stickySummary { position: static; top: auto; }
          .mobileMenuDrawer { width: 100%; max-width: 100%; }
        }
      `}</style>
    </div>
  );
}

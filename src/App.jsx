import React, { useEffect, useState } from 'react';
import {
  ArrowRight, ChevronLeft, ChevronRight, Menu, X, MapPin, ShoppingBasket,
  Sparkles, ShieldCheck, BadgeIndianRupee, Clock3, Phone,
  Instagram, Facebook, MessageCircle, Mail, Star
} from 'lucide-react';

const categories = [
  { name: 'Fresh Produce', sub: 'Fruits & vegetables', icon: '🥬', items: [
    { name: 'Seasonal fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=85' },
    { name: 'Farm fresh picks', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=85' },
    { name: 'Fresh market greens', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85' },
  ] },
  { name: 'Daily Groceries', sub: 'Rice, pulses & staples', icon: '🛒', items: [
    { name: 'Grocery aisle essentials', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=85' },
    { name: 'Rice and grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85' },
    { name: 'Pantry staples', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85' },
  ] },
  { name: 'Bakery & Dairy', sub: 'Fresh every day', icon: '🥐', items: [
    { name: 'Bakery cakes', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=85' },
    { name: 'Ice cream treats', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85' },
    { name: 'Chocolate favourites', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=85' },
  ] },
  { name: 'Beverages', sub: 'Drinks & refreshments', icon: '🥤', items: [
    { name: 'Coke cans', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=85' },
    { name: 'Fresh juices', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=85' },
    { name: 'Assorted bottled drinks', image: '/images/bottles%20-drinks.jpg' },
  ] },
  { name: 'Home Care', sub: 'Clean & care', icon: '🧼', items: [
    { name: 'Home cleaning essentials', image: '/images/home-essentials.jpg' },
    { name: 'A clean home', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=85' },
    { name: 'Mop sticks', image: '/images/mopStick.jpg' },
  ] },
  { name: 'Personal Care', sub: 'Care for everyone', icon: '✨', items: [
    { name: 'Skincare products', image: '/images/Skin_care_cosmetics.jpg' },
    { name: 'Baby care essentials', image: '/images/child-care.jpg' },
    { name: 'Haircare products', image: '/images/hair-care.jpeg' },
  ] },
];

const benefits = [
  { icon: BadgeIndianRupee, title: 'Fair Prices', text: 'Everyday value without compromising quality.' },
  { icon: ShieldCheck, title: 'Trusted Quality', text: 'Carefully selected products for your family.' },
  { icon: Sparkles, title: 'Fresh Stock', text: 'Fresh essentials stocked throughout the week.' },
  { icon: Clock3, title: 'Easy Shopping', text: 'A clean, comfortable and convenient experience.' },
];

const offers = [
  { tag: 'FRESH PICK', title: 'Farm Fresh Produce', text: 'Bright, fresh and ready for your everyday meals.', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1100&q=85' },
  { tag: 'DAILY VALUE', title: 'Groceries You Need', text: 'Stock up on everyday essentials at great value.', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1100&q=85' },
  { tag: 'SWEET MOMENTS', title: 'Bakery Favourites', text: 'Freshly baked treats for little celebrations.', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1100&q=85' },
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('D.No: 8-452/2, CRC Road, RAVULAPALEM, Ravulapalem, India, Andhra Pradesh')}`;
const reviewStorageKey = 'victory-bazars-reviews';

function Reveal({ children, className='' }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.querySelectorAll('.reveal-target');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible'));
    }, { threshold: 0.12 });
    el.forEach(x => obs.observe(x));
    setShow(true);
    return () => obs.disconnect();
  }, []);
  return <div className={`reveal-target ${className} ${show ? '' : ''}`}>{children}</div>;
}

function CategoryGallery({ category }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = category.items[activeSlide];
  const moveSlide = (step) => setActiveSlide((current) => (current + step + category.items.length) % category.items.length);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % category.items.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [category.items.length, paused]);

  return (
    <Reveal className="category-wrap">
      <article
        className="category-gallery-card"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div className="category-image-frame">
          <img key={item.image} className="category-slide-image" src={item.image} alt={item.name} />
          <button className="category-control category-previous" onClick={() => moveSlide(-1)} aria-label={`Previous ${category.name} image`}><ChevronLeft size={20}/></button>
          <span className="category-slide-count">{activeSlide + 1} / {category.items.length}</span>
          <button className="category-control category-next" onClick={() => moveSlide(1)} aria-label={`Next ${category.name} image`}><ChevronRight size={20}/></button>
        </div>
        <div className="category-caption">
          <span className="category-caption-name">{category.name}</span>
          <h3>{item.name}</h3>
          <p>{category.sub}</p>
        </div>
        <div className="category-pagination" aria-label={`${category.name} gallery slides`}>
          {category.items.map((slide, index) => (
            <button key={slide.name} className={index === activeSlide ? 'active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Show ${slide.name}`} aria-current={index === activeSlide ? 'true' : undefined}/>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = JSON.parse(localStorage.getItem(reviewStorageKey) || '[]');
      return Array.isArray(savedReviews) ? savedReviews : [];
    } catch {
      return [];
    }
  });
  const [reviewDraft, setReviewDraft] = useState({ name: '', experience: '', rating: 5 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem(reviewStorageKey, JSON.stringify(reviews));
  }, [reviews]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  const submitReview = (event) => {
    event.preventDefault();
    const name = reviewDraft.name.trim();
    const experience = reviewDraft.experience.trim();
    if (!name || !experience) return;

    setReviews((currentReviews) => [{
      id: crypto.randomUUID(),
      name,
      experience,
      rating: reviewDraft.rating,
      createdAt: new Date().toISOString(),
    }, ...currentReviews]);
    setReviewDraft({ name: '', experience: '', rating: 5 });
  };

  return (
    <div className="site">
      <div className="top-strip">
        <div className="top-announcement">
          <span className="top-dot">•</span>
          <span>Fresh stock every day</span>
          <span>Quality meets value</span>
        </div>
        <div className="top-actions">
          <a className="top-contact" href="https://wa.me/919256265626" target="_blank" rel="noreferrer"><MessageCircle size={13}/> WhatsApp</a>
          <a className="top-contact" href="tel:+919256265626"><Phone size={13}/> Call +91 9256265626</a>
        </div>
      </div>

      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="brand">
            <button className="brand-home" onClick={() => go('home')} aria-label="Victory Bazars home">
              <img className="brand-logo" src="/images/logo.jpg" alt="" />
            </button>
            <div className="brand-copy">
              <button className="brand-name" onClick={() => go('home')}>Victory Bazars Pvt Ltd</button>
              <a className="brand-location" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={13}/> RAVULAPALEM • 533238</a>
            </div>
          </div>

          <nav className={`nav-links ${menu ? 'open' : ''}`}>
            <button onClick={() => go('home')}>Home</button>
            <button onClick={() => go('about')}>About</button>
            <button onClick={() => go('categories')}>Categories</button>
            <button onClick={() => go('offers')}>Offers</button>
            <button onClick={() => go('reviews')}>Reviews</button>
            <button onClick={() => go('stores')}>Our Stores</button>
            <button className="nav-order" onClick={() => window.open('https://wa.me/919256265626', '_blank')}>Order on WhatsApp <ArrowRight size={16}/></button>
          </nav>

          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
            {menu ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-orb orb-one"></div>
          <div className="hero-orb orb-two"></div>
          <div className="hero-content">
            <Reveal>
              <div className="eyebrow"><span></span> YOUR EVERYDAY SUPERMARKET</div>
              <h1>Everyday shopping.<br/><em>Made better.</em></h1>
              <p>Fresh essentials, trusted quality and everyday value — all under one roof at Victory Bazars.</p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => go('categories')}>Explore Categories <ArrowRight size={18}/></button>
                <button className="ghost-btn" onClick={() => window.open(mapsUrl, '_blank', 'noopener,noreferrer')}><MapPin size={17}/> Find a Store</button>
              </div>
            </Reveal>
          </div>

          <div className="hero-visual">
            <div className="sun-disc"></div>
            <div className="hero-image-wrap">
              <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=90" alt="Fresh supermarket produce" />
            </div>
            <div className="floating-card card-fresh">
              <span className="mini-icon">🥦</span>
              <div><b>Fresh daily</b><small>Picked with care</small></div>
            </div>
            <div className="floating-card card-value">
              <span className="mini-icon">₹</span>
              <div><b>Everyday value</b><small>Prices you'll love</small></div>
            </div>
          </div>
          <div className="hero-bottom-wave"></div>
        </section>

        <section className="ticker">
          <div className="ticker-track">
            <span>FRESH PRODUCE</span><i>✦</i><span>BEST PRICES</span><i>✦</i><span>QUALITY YOU TRUST</span><i>✦</i><span>EVERYDAY ESSENTIALS</span><i>✦</i><span>FRESH PRODUCE</span><i>✦</i><span>BEST PRICES</span><i>✦</i>
          </div>
        </section>

        <section id="about" className="about section">
          <Reveal className="about-grid">
            <div className="about-photo">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85" alt="Fresh groceries at Victory Bazars" />
              <div className="since-badge"><strong>25+</strong><span>years of<br/>trusted service</span></div>
            </div>
            <div className="about-copy">
              <div className="eyebrow green">WHO WE ARE</div>
              <h2>A supermarket built around <span>your everyday life.</span></h2>
              <p>Established in 2001, Victory Bazars has grown to around 50 branches across Andhra Pradesh, serving families with quality products, fair pricing and a welcoming shopping experience.</p>
              <p>From fresh groceries and bakery favourites to home care, personal care, baby products and more — we bring the essentials together under one roof.</p>
              <div className="stats">
                <div><b>25+</b><small>Years of trust</small></div>
                <div><b>10K+</b><small>Products</small></div>
                <div><b>10K+</b><small>Daily customers</small></div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="categories" className="categories section">
          <div className="section-heading">
            <Reveal>
              <div className="eyebrow green">SHOP YOUR WAY</div>
              <h2>Everything you need.<br/><span>All in one place.</span></h2>
            </Reveal>
            <button className="text-btn" onClick={() => go('offers')}>See today's highlights <ArrowRight size={17}/></button>
          </div>
          <div className="category-grid">
            {categories.map((category) => <CategoryGallery key={category.name} category={category} />)}
          </div>
        </section>

        <section id="offers" className="offers section">
          <div className="offers-head">
            <Reveal>
              <div className="eyebrow">TODAY'S HIGHLIGHTS</div>
              <h2>Good food. <span>Good mood.</span></h2>
              <p>Discover the products and moments that make everyday shopping a little more exciting.</p>
            </Reveal>
          </div>
          <div className="offer-grid">
            {offers.map((o, i) => (
              <Reveal key={o.title}>
                <article className={`offer-card offer-${i+1}`}>
                  <img src={o.image} alt={o.title}/>
                  <div className="offer-shade"></div>
                  <div className="offer-copy"><small>{o.tag}</small><h3>{o.title}</h3><p>{o.text}</p><button onClick={() => go('categories')}>Explore <ArrowRight size={15}/></button></div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="benefits section">
          <div className="benefits-inner">
            <Reveal className="benefits-intro">
              <div className="eyebrow green">WHY VICTORY BAZARS</div>
              <h2>More than a store.<br/><span>A trusted habit.</span></h2>
              <p>We keep the everyday simple: reliable products, thoughtful service and value you can count on.</p>
            </Reveal>
            <div className="benefit-list">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return <Reveal key={b.title}><div className="benefit-item"><div className="benefit-icon"><Icon size={21}/></div><div><h3>{b.title}</h3><p>{b.text}</p></div><span>0{i+1}</span></div></Reveal>
              })}
            </div>
          </div>
        </section>

        <section id="reviews" className="review-section section">
          <div className="review-layout">
            <div className="review-intro">
              <div className="eyebrow green">CUSTOMER REVIEWS</div>
              <h2>Your experience.<br/><span>Your words.</span></h2>
              <p>Shop with us? Share what you think and help our community shop with confidence.</p>
              <div className="review-count"><b>{reviews.length}</b><span>{reviews.length === 1 ? 'customer review' : 'customer reviews'}</span></div>
            </div>
            <form className="review-form" onSubmit={submitReview}>
              <label className="review-field">Your name
                <input value={reviewDraft.name} onChange={(event) => setReviewDraft({ ...reviewDraft, name: event.target.value })} maxLength={60} autoComplete="name" required />
              </label>
              <label className="review-field">Your experience
                <textarea value={reviewDraft.experience} onChange={(event) => setReviewDraft({ ...reviewDraft, experience: event.target.value })} maxLength={600} rows={4} required />
              </label>
              <div className="rating-field">
                <span>Your rating</span>
                <div className="rating-picker" role="radiogroup" aria-label="Choose a star rating">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} type="button" role="radio" aria-label={`${rating} ${rating === 1 ? 'star' : 'stars'}`} aria-checked={reviewDraft.rating === rating} className={rating <= reviewDraft.rating ? 'selected' : ''} onClick={() => setReviewDraft({ ...reviewDraft, rating })}>
                      <Star size={21} fill="currentColor" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
              <button className="primary-btn review-submit" type="submit">Share review <ArrowRight size={17}/></button>
            </form>
            <div className="review-list" aria-live="polite">
              {reviews.length ? reviews.map((review) => (
                <article className="review-entry" key={review.id}>
                  <div className="review-entry-head">
                    <b>{review.name}</b>
                    <time dateTime={review.createdAt}>{new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(review.createdAt))}</time>
                  </div>
                  <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill={star <= review.rating ? 'currentColor' : 'none'} />)}
                  </div>
                  <p>{review.experience}</p>
                </article>
              )) : <p className="review-empty">No reviews yet. Be the first to share your experience.</p>}
            </div>
          </div>
        </section>

        <section id="stores" className="store-section">
          <div className="store-art">
            <div className="store-circle"><img src="/images/image.png" alt="Victory Bazars team and storefront" /></div>
            <a className="store-card" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Open Victory Bazars in Google Maps">
              <MapPin size={23}/><div><b>Ravulapalem</b><small>Head Office & Store</small></div>
            </a>
          </div>
          <Reveal className="store-copy">
            <div className="eyebrow">VISIT US</div>
            <h2>Your neighbourhood<br/><span>shopping stop.</span></h2>
            <p>Drop in for your everyday essentials, fresh picks and a friendly shopping experience.</p>
            <a className="address" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Open the full address in Google Maps"><MapPin size={20}/><span>D.No: 8-452/2, CRC Road,<br/>RAVULAPALEM, Ravulapalem,<br/>India, Andhra Pradesh</span></a>
            <div className="store-hours">
              <h3><Clock3 size={17}/> Store Hours</h3>
              <dl>
                <div><dt>Monday</dt><dd>6:00 AM – 11:00 PM</dd></div>
                <div><dt>Tuesday</dt><dd>6:00 AM – 11:00 PM</dd></div>
                <div><dt>Wednesday</dt><dd>6:00 AM – 11:00 AM</dd></div>
                <div><dt>Thursday</dt><dd>6:00 AM – 11:00 PM</dd></div>
                <div><dt>Friday</dt><dd>6:00 AM – 11:00 PM</dd></div>
                <div><dt>Saturday</dt><dd>Closed</dd></div>
                <div><dt>Sunday</dt><dd>6:00 AM – 11:00 PM</dd></div>
              </dl>
            </div>
            <button className="primary-btn" onClick={() => window.open(mapsUrl, '_blank', 'noopener,noreferrer')}>Get Directions <ArrowRight size={18}/></button>
          </Reveal>
        </section>

        <section className="cta">
          <div className="cta-shape"></div>
          <Reveal>
            <div className="eyebrow">NEED IT? WE'VE GOT IT.</div>
            <h2>Quality meets value.<br/><span>Every single day.</span></h2>
            <p>Have a question or want to place an order? We're just a message away.</p>
            <div className="cta-actions">
              <button className="light-btn" onClick={() => window.open('https://wa.me/919256265626','_blank')}><MessageCircle size={19}/> Order on WhatsApp</button>
              <a href="tel:+919256265626" className="outline-light"><Phone size={17}/> +91 9256265626</a>
              <a href="mailto:victorybazarravulapalem@gmail.com" className="outline-light"><Mail size={17}/> Email us</a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-main">
          <div className="footer-brand"><a className="brand footer-brand-link" href="#home"><img className="footer-logo" src="/images/logo.jpg" alt=""/><span className="footer-brand-copy">Victory Bazars Pvt Ltd</span></a><p>Everyday shopping, made better.<br/>Quality you can trust. Value you can feel.</p><div className="socials"><a className="social-instagram" href="https://www.instagram.com/victory_bazars_pvt_ltd/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17}/></a><a className="social-facebook" href="https://www.facebook.com/people/Victory-Bazars-Pvt-Ltd/100086981190368/?rdid=IeIEpyLmehHK7rPL&amp;share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1SPNJJN2kU%2F" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={17}/></a><a className="social-whatsapp" href="https://wa.me/919256265626" aria-label="WhatsApp"><MessageCircle size={17}/></a><a className="social-email" href="mailto:victorybazarravulapalem@gmail.com" aria-label="Email Victory Bazars"><Mail size={17}/></a></div></div>
          <div><h4>Explore</h4><button onClick={() => go('about')}>About us</button><button onClick={() => go('categories')}>Categories</button><button onClick={() => go('offers')}>Offers</button><button onClick={() => go('reviews')}>Reviews</button><button onClick={() => go('stores')}>Our stores</button></div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <a className="footer-contact-link" href="tel:+919256265626"><Phone size={15}/><span>+91 9256265626</span></a>
            <a className="footer-contact-link" href="mailto:victorybazarravulapalem@gmail.com"><Mail size={15}/><span>victorybazarravulapalem@gmail.com</span></a>
            <a className="footer-contact-link" href="mailto:victorybazarscustomercare@gmail.com"><Mail size={15}/><span>victorybazarscustomercare@gmail.com</span></a>
            <a className="footer-contact-link" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={15}/><span>D.No: 8-452/2, CRC Road, Ravulapalem</span></a>
            <a className="footer-contact-link" href="#stores"><Clock3 size={15}/><span>View store hours</span></a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Victory Bazars. All rights reserved.</span><span>Quality • Value • Trust</span></div>
      </footer>
    </div>
  );
}

export default App;
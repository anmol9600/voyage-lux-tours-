import { DOMESTIC_PACKAGES, INTERNATIONAL_PACKAGES, TESTIMONIALS, CASE_STUDIES, FAQS } from './data';
import { PackageCard, PackageModal } from './components/PackageCards';
import { ContactSection } from './components/ContactSection';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Plane, Globe2, Shield, HeartHandshake, 
  Clock, Map, Star, Compass, ArrowRight, MessageCircle
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('international');
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBookingModal = () => setIsContactModalOpen(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 object-contain font-bold text-2xl text-white tracking-tight">
            <Compass className="w-8 h-8 text-cyan-400" />
            <span>Voyage<span className="font-light text-cyan-400">Luxe</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="text-sm font-medium hover:text-cyan-400 transition-colors">About Us</a>
            <a href="#packages" className="text-sm font-medium hover:text-cyan-400 transition-colors">Packages</a>
            <a href="#reviews" className="text-sm font-medium hover:text-cyan-400 transition-colors">Reviews</a>
            <a href="#faq" className="text-sm font-medium hover:text-cyan-400 transition-colors">FAQ</a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#contact" className="text-sm font-medium hover:text-cyan-400 transition-colors px-4 py-2">Contact Us</a>
            <button onClick={openBookingModal} className="px-5 py-2.5 bg-white text-slate-950 text-sm font-bold rounded-full hover:bg-cyan-50 transition-colors hover:shadow-lg hover:shadow-white/20">
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-xl pt-24 px-6 lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 text-xl font-medium">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-white/5 pb-4">Home</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-white/5 pb-4">About Us</a>
              <a href="#packages" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-white/5 pb-4">Packages</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-white/5 pb-4">Contact</a>
            </div>
            <button onClick={() => { setIsMobileMenuOpen(false); openBookingModal(); }} className="mt-8 w-full py-4 bg-cyan-500 rounded-xl text-slate-950 font-bold text-lg">
              Book Your Trip
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-medium mb-6 inline-block leading-none text-cyan-50">
              Premium Travels Worldwide
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display text-white mb-6 leading-tight tracking-tight">
              Discover The World <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">In Luxury</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Curated experiences, seamless itineraries, and unforgettable memories. Let us craft your perfect getaway.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#packages" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Explore Packages
              </a>
              <button onClick={openBookingModal} className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                Contact an Expert
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
           <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 left-1/4 opacity-50"><Plane className="w-12 h-12 text-white/50 -rotate-45" /></motion.div>
           <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-1/3 right-1/4 opacity-50"><Globe2 className="w-16 h-16 text-cyan-400/30" /></motion.div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 z-20 pointer-events-none" />
      </section>

      {/* Value Proposition */}
      <section className="py-24 relative z-20 bg-slate-950 -mt-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Secure Booking", desc: "100% secure payment systems" },
              { icon: HeartHandshake, title: "Trusted Experts", desc: "15+ years of travel experience" },
              { icon: Map, title: "Custom Tours", desc: "Tailored to your preferences" },
              { icon: Clock, title: "24/7 Support", desc: "Always here when you need us" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-cyan-500/20">
                <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop" alt="About VoyageLuxe" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
              
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-8 -bottom-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-2xl">
                    15+
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Years</p>
                    <p className="text-slate-400 text-sm">Of Excellence</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3">About Us</h4>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Crafting Memories Since 2008</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                At VoyageLuxe, we believe that travel is more than just visiting a new place; it's about the feeling of discovery, the luxury of seamless experiences, and memories that last a lifetime. Our expert curators design journeys that blend adventure, relaxation, and unparalleled service.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="text-4xl font-black text-white mb-2">50k+</div>
                  <div className="text-slate-400 text-sm">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-2">120+</div>
                  <div className="text-slate-400 text-sm">Destinations Covered</div>
                </div>
              </div>

              <a href="#packages" className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors group">
                Discover our destinations <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 bg-slate-900 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h4 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3">Curated Journeys</h4>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-8">Popular Destinations</h2>
            
            {/* Tabs */}
            <div className="flex justify-center items-center gap-4 bg-slate-950 border border-slate-800 p-2 rounded-full inline-flex">
              <button 
                onClick={() => setActiveTab('international')}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${activeTab === 'international' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                International
              </button>
              <button 
                onClick={() => setActiveTab('domestic')}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${activeTab === 'domestic' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Domestic (India)
              </button>
            </div>
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(activeTab === 'international' ? INTERNATIONAL_PACKAGES : DOMESTIC_PACKAGES).map(pkg => (
              <PackageCard 
                key={pkg.id} 
                pkg={pkg} 
                onBook={openBookingModal} 
                onViewDetails={() => setSelectedPkg(pkg)} 
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h4 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3">Success Stories</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Memories Crafted By Us</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {CASE_STUDIES.map((study, idx) => (
              <motion.div 
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col sm:flex-row shadow-xl hover:shadow-cyan-500/10 transition-shadow"
              >
                <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden shrink-0">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{study.title}</h3>
                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-xs font-bold text-red-400 uppercase">Challenge:</span>
                      <p className="text-sm text-slate-300 line-clamp-2">{study.challenge}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase">Solution:</span>
                      <p className="text-sm text-slate-300 line-clamp-2">{study.solution}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-800">
                    <p className="text-sm font-medium italic text-slate-400">"{study.feedback}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?q=80&w=2070&auto=format&fit=crop')] opacity-5 bg-cover bg-fixed" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h4 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3">Client Reviews</h4>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">What Our Travelers Say</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-bold text-white">4.9</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
            </div>
            <p className="text-slate-400 text-sm">Based on 2,500+ verified reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-8 relative"
              >
                <div className="absolute -top-6 left-8">
                  <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full border-4 border-slate-900 object-cover" />
                </div>
                <div className="mt-6">
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-300 italic mb-6">"{t.text}"</p>
                  <p className="text-white font-bold">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3">Questions?</h4>
          <h2 className="text-4xl font-bold text-white">Frequently Asked <span className="text-cyan-400">Questions</span></h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-colors hover:border-slate-700">
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-white pr-8">{faq.question}</span>
                <ChevronRight className={`w-5 h-5 text-cyan-400 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-slate-400 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2 object-contain font-bold text-2xl text-white tracking-tight">
                <Compass className="w-8 h-8 text-cyan-400" />
                <span>Voyage<span className="font-light text-cyan-400">Luxe</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Premium travel experiences curated for the modern explorer. Discover the world with unparalleled luxury and comfort.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Destinations', 'Gallery', 'Contact'].map((link) => (
                  <li key={link}><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Packages</h4>
              <ul className="space-y-3">
                {['Dubai Luxury', 'Bali Retreat', 'Europe Tour', 'Goa Beach', 'Kashmir Heaven'].map((link) => (
                  <li key={link}><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-slate-400 text-sm mb-4">Subscribe to get special offers and travel inspiration.</p>
              <div className="flex bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-1">
                <input type="email" placeholder="Your email" className="bg-transparent text-white px-4 py-2 w-full focus:outline-none text-sm" />
                <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} VoyageLuxe Travel. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noreferrer"
          className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-400 transition-colors hover:scale-110 active:scale-95"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-slate-800/80 backdrop-blur text-white rounded-full flex mx-auto items-center justify-center shadow-lg hover:bg-slate-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5 -rotate-90" />
        </button>
      </div>

      {/* Modals */}
      <PackageModal 
        pkg={selectedPkg} 
        isOpen={!!selectedPkg} 
        onClose={() => setSelectedPkg(null)} 
        onBook={() => { setSelectedPkg(null); openBookingModal(); }} 
      />

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Users, Calendar, Trophy, Menu, X, ArrowRight, CheckCircle2, 
  Flame, ShieldCheck, HeartPulse, Clock, Star, MapPin, Phone, Mail, 
  ChevronRight, Calculator, Sparkles, UserCheck, Award
} from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [isYearly, setIsYearly] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // BMI Calculator State
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState('');

  // Booking Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      const hInM = height / 100;
      const val = (weight / (hInM * hInM)).toFixed(1);
      setBmi(val);
      if (val < 18.5) setBmiStatus('Underweight (Needs nutrition & bulking)');
      else if (val >= 18.5 && val < 24.9) setBmiStatus('Normal & Healthy (Keep it up!)');
      else if (val >= 25 && val < 29.9) setBmiStatus('Overweight (Cardio & Shredding recommended)');
      else setBmiStatus('Obese (Strict custom transformation plan needed)');
    }
  };

  const classesList = [
    { title: 'CrossFit Elite', time: '06:00 AM - 07:15 AM', type: 'Morning', trainer: 'Vikram Singh', slots: '4 left', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600' },
    { title: 'Advanced Bodybuilding', time: '08:00 AM - 09:30 AM', type: 'Morning', trainer: 'Rahul Sharma', slots: '2 left', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
    { title: 'Power Yoga & Stretch', time: '10:00 AM - 11:00 AM', type: 'Morning', trainer: 'Priya Sen', slots: '6 left', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600' },
    { title: 'HIIT Fat Burn', time: '05:00 PM - 06:00 PM', type: 'Evening', trainer: 'Amit Verma', slots: 'Full', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600' },
    { title: 'Zumba & Aerobics', time: '06:30 PM - 07:30 PM', type: 'Evening', trainer: 'Neha Kapoor', slots: '3 left', img: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&q=80&w=600' },
  ];

  const filteredClasses = activeTab === 'All' ? classesList : classesList.filter(c => c.type === activeTab);

  const handleOpenModal = (planName) => {
    setSelectedPlan(planName);
    setShowModal(true);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-cream-100 font-sans relative overflow-x-hidden">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 border-b border-gold-500/20 shadow-2xl' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-gold-500 to-amber-700 p-2.5 rounded-xl shadow-lg shadow-gold-500/20">
              <Dumbbell className="h-6 w-6 text-navy-950" />
            </div>
            <span className="text-2xl font-black tracking-wider uppercase text-white">
              FIT<span className="text-gold-500">ELITE</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-cream-200">
            <a href="#home" className="hover:text-gold-500 transition">Home</a>
            <a href="#features" className="hover:text-gold-500 transition">Features</a>
            <a href="#classes" className="hover:text-gold-500 transition">Classes</a>
            <a href="#trainers" className="hover:text-gold-500 transition">Trainers</a>
            <a href="#calculator" className="hover:text-gold-500 transition">BMI Calculator</a>
            <a href="#pricing" className="hover:text-gold-500 transition">Pricing</a>
            <a href="#contact" className="hover:text-gold-500 transition">Contact</a>
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => handleOpenModal('Free Trial Session')}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-navy-950 px-6 py-2.5 rounded-xl font-bold transition shadow-lg shadow-gold-500/20 transform hover:-translate-y-0.5"
            >
              Free Pass
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-cream-100 hover:text-gold-500">
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden glass-nav border-b border-gold-500/20 px-6 pt-4 pb-6 space-y-4 shadow-2xl">
            <a href="#home" onClick={() => setIsOpen(false)} className="block py-2 text-cream-100 hover:text-gold-500 font-medium">Home</a>
            <a href="#features" onClick={() => setIsOpen(false)} className="block py-2 text-cream-100 hover:text-gold-500 font-medium">Features</a>
            <a href="#classes" onClick={() => setIsOpen(false)} className="block py-2 text-cream-100 hover:text-gold-500 font-medium">Classes</a>
            <a href="#trainers" onClick={() => setIsOpen(false)} className="block py-2 text-cream-100 hover:text-gold-500 font-medium">Trainers</a>
            <a href="#calculator" onClick={() => setIsOpen(false)} className="block py-2 text-cream-100 hover:text-gold-500 font-medium">BMI Calculator</a>
            <a href="#pricing" onClick={() => setIsOpen(false)} className="block py-2 text-cream-100 hover:text-gold-500 font-medium">Pricing</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block py-2 text-cream-100 hover:text-gold-500 font-medium">Contact</a>
            <button 
              onClick={() => { setIsOpen(false); handleOpenModal('Free Trial Session'); }}
              className="w-full bg-gold-500 text-navy-950 py-3 rounded-xl font-bold mt-2"
            >
              Get Free Pass
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-36 pb-24 md:pt-48 md:pb-36 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-navy-900 border border-gold-500/30 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gold-500 shadow-inner">
            <Sparkles className="h-4 w-4" /> Luxury Fitness & Pro Training
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            FORGE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-amber-300 to-cream-100">LEGACY</span> TODAY
          </h1>
          <p className="text-cream-300 text-lg max-w-xl mx-auto md:mx-0 font-normal leading-relaxed">
            Experience state-of-the-art equipment, elite 1-on-1 coaching, and an exclusive high-performance atmosphere built for champions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <a href="#pricing" className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-navy-950 font-extrabold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20 transform hover:-translate-y-1">
              Start Membership <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#classes" className="w-full sm:w-auto glass-card hover:border-gold-500/50 text-cream-100 font-bold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2">
              Explore Classes
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-navy-800 max-w-lg mx-auto md:mx-0">
            <div>
              <p className="text-3xl font-black text-gold-500">15+</p>
              <p className="text-xs text-cream-300 mt-1 uppercase tracking-wider font-medium">Expert Trainers</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gold-500">2,500+</p>
              <p className="text-xs text-cream-300 mt-1 uppercase tracking-wider font-medium">Active Members</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gold-500">100%</p>
              <p className="text-xs text-cream-300 mt-1 uppercase tracking-wider font-medium">Pro Equipment</p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg z-10">
          <div className="relative rounded-3xl overflow-hidden glass-card p-3 border-2 border-gold-500/30 shadow-2xl group animate-float">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" 
              alt="Gym Luxury Workout" 
              className="w-full h-[450px] object-cover rounded-2xl group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-x-6 bottom-6 bg-navy-950/90 backdrop-blur-md p-4 rounded-2xl border border-gold-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gold-500 p-2.5 rounded-xl text-navy-950 font-bold">
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">Pro Coaching Session</p>
                  <p className="text-xs text-cream-300">Daily batch available now</p>
                </div>
              </div>
              <span className="bg-gold-500/20 text-gold-500 border border-gold-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase">Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-navy-900/50 border-y border-navy-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">Why Choose FitElite</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">PIONEERING FITNESS <span className="text-gold-500">EXCELLENCE</span></h2>
            <p className="text-cream-300 text-sm sm:text-base">Designed with uncompromising attention to detail, premium aesthetics, and world-class utility.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck className="h-7 w-7 text-gold-500" />, title: "Olympic Equipment", desc: "Imported German & American machines engineered for supreme biomechanics." },
              { icon: <Users className="h-7 w-7 text-gold-500" />, title: "Certified Masters", desc: "Train under national champions and certified sports nutritionists." },
              { icon: <Clock className="h-7 w-7 text-gold-500" />, title: "24/7 VIP Access", desc: "Biometric secure round-the-clock entry tailored to your busy schedule." },
              { icon: <HeartPulse className="h-7 w-7 text-gold-500" />, title: "Recovery Suite", desc: "Luxury sauna, ice baths, and advanced sports physiotherapy rooms." },
            ].map((feat, idx) => (
              <div key={idx} className="glass-card p-8 rounded-3xl hover:border-gold-500/50 transition-all duration-300 group hover:-translate-y-1">
                <div className="bg-navy-950 p-4 rounded-2xl w-fit mb-6 border border-gold-500/20 group-hover:border-gold-500/50 transition">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-cream-100">{feat.title}</h3>
                <p className="text-cream-300 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes & Schedule Section */}
      <section id="classes" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">Elite Training Batches</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">DISCOVER OUR <span className="text-gold-500">CLASSES</span></h2>
          <p className="text-cream-300">Filter schedules by session timings and join expert-led training groups.</p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {['All', 'Morning', 'Evening'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-lg shadow-gold-500/20' 
                  : 'glass-card text-cream-300 hover:text-cream-100'
              }`}
            >
              {tab} Sessions
            </button>
          ))}
        </div>

        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((item, idx) => (
            <div key={idx} className="glass-card rounded-3xl overflow-hidden border border-gold-500/20 group hover:border-gold-500/50 transition duration-300">
              <div className="relative h-56 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
                <span className="absolute top-4 right-4 bg-navy-950/80 backdrop-blur-md text-gold-500 border border-gold-500/30 text-xs px-3 py-1.5 rounded-full font-bold">
                  {item.slots}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-cream-100">{item.title}</h3>
                    <p className="text-gold-500 text-xs font-semibold mt-1">Trainer: {item.trainer}</p>
                  </div>
                  <span className="bg-navy-900 text-cream-300 border border-navy-800 text-xs px-3 py-1 rounded-lg font-medium">{item.type}</span>
                </div>
                <div className="flex items-center gap-2 text-cream-300 text-sm pt-2 border-t border-navy-800">
                  <Clock className="h-4 w-4 text-gold-500" />
                  <span>{item.time}</span>
                </div>
                <button 
                  onClick={() => handleOpenModal(item.title)}
                  className="w-full bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-cream-100 border border-gold-500/30 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 group-hover:border-gold-500"
                >
                  Book Slot <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-24 bg-navy-900/40 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">Elite Mentors</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">MEET OUR <span className="text-gold-500">HEAD COACHES</span></h2>
            <p className="text-cream-300">Dedicated professionals committed to pushing your absolute limits safely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Vikram Singh', role: 'Head Bodybuilding Coach', exp: '10+ Years Exp', img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600' },
              { name: 'Priya Sen', role: 'Yoga & Functional Expert', exp: '8+ Years Exp', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=600' },
              { name: 'Rahul Sharma', role: 'CrossFit & Strength Master', exp: '12+ Years Exp', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600' },
            ].map((trainer, idx) => (
              <div key={idx} className="glass-card rounded-3xl overflow-hidden border border-gold-500/20 group hover:border-gold-500/50 transition">
                <div className="relative h-80 overflow-hidden">
                  <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
                  <span className="absolute bottom-4 left-4 bg-gold-500 text-navy-950 text-xs px-3 py-1 rounded-full font-extrabold">
                    {trainer.exp}
                  </span>
                </div>
                <div className="p-6 text-center space-y-2">
                  <h3 className="text-xl font-bold text-cream-100">{trainer.name}</h3>
                  <p className="text-gold-500 text-sm font-medium">{trainer.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive BMI Calculator Section */}
      <section id="calculator" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl border-2 border-gold-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-gold-500 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20 inline-flex items-center gap-2">
                <Calculator className="h-4 w-4" /> Health Assessment
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">CALCULATE YOUR <span className="text-gold-500">BMI INDEX</span></h2>
              <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
                Body Mass Index (BMI) is a reliable metric to gauge body fat and determine whether you are in a healthy weight category. Enter your stats below to instantly check your score.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-cream-200">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0" />
                  <span>Instant computerized calculations</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-cream-200">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0" />
                  <span>Personalized feedback recommendations</span>
                </div>
              </div>
            </div>

            <div className="bg-navy-950/80 p-8 rounded-2xl border border-gold-500/20 shadow-inner space-y-6">
              <h3 className="text-xl font-bold text-cream-100 border-b border-navy-800 pb-4">BMI Calculator Form</h3>
              <form onSubmit={calculateBMI} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-300 mb-2">Weight (kg)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 75" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)} 
                    className="w-full bg-navy-900 border border-navy-800 rounded-xl p-3.5 text-cream-100 focus:outline-none focus:border-gold-500 transition"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cream-300 mb-2">Height (cm)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 178" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)} 
                    className="w-full bg-navy-900 border border-navy-800 rounded-xl p-3.5 text-cream-100 focus:outline-none focus:border-gold-500 transition"
                    required 
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-navy-950 font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-gold-500/20">
                  Calculate BMI Now
                </button>
              </form>

              {bmi && (
                <div className="mt-6 p-5 bg-navy-900 rounded-xl border border-gold-500/40 text-center animate-fade-in">
                  <p className="text-xs text-cream-300 uppercase tracking-wider font-semibold">Your BMI Score</p>
                  <p className="text-4xl font-black text-gold-500 my-1">{bmi}</p>
                  <p className="text-sm font-bold text-cream-100 mt-2">{bmiStatus}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-navy-900/50 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/20">Investment Plans</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">MEMBERSHIP <span className="text-gold-500">TIERS</span></h2>
            <p className="text-cream-300">Choose monthly or yearly billing and save up to 25% instantly.</p>
          </div>

          {/* Toggle Monthly / Yearly */}
          <div className="flex justify-center items-center gap-4 mb-16">
            <span className={!isYearly ? "text-cream-100 font-bold text-sm" : "text-cream-400 text-sm"}>Monthly Billing</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-8 bg-navy-950 border border-gold-500/40 rounded-full p-1 flex items-center transition relative"
            >
              <div className={`w-6 h-6 bg-gold-500 rounded-full shadow-md transition transform ${isYearly ? 'translate-x-6' : ''}`}></div>
            </button>
            <span className={isYearly ? "text-cream-100 font-bold text-sm" : "text-cream-400 text-sm"}>
              Yearly Billing <span className="text-xs bg-gold-500/20 text-gold-500 px-2 py-0.5 rounded-full font-bold ml-1">Save 25%</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter Tier", monthly: "₹1,999", yearly: "₹17,999", desc: "Essential floor access for independent athletes.", features: ["Full Gym Floor Access", "Standard Locker Room", "Cardio Zone Access", "1 Fitness Assessment"] },
              { name: "Pro Elite Tier", monthly: "₹3,999", yearly: "₹34,999", popular: true, desc: "Our most popular complete transformation package.", features: ["All Starter Features", "Unlimited Group Classes", "Personal Trainer (4 sessions/mo)", "Custom Nutrition Diet Plan", "Sauna & Ice Bath Access"] },
              { name: "VIP Executive", monthly: "₹7,999", yearly: "₹69,999", desc: "Ultimate luxury fitness with dedicated VIP privileges.", features: ["All Pro Elite Features", "1-on-1 Dedicated Master Trainer", "Private VIP Locker Suite", "Complimentary Protein Bar", "Guest Pass (2 per month)"] },
            ].map((plan, idx) => (
              <div key={idx} className={`relative glass-card rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${plan.popular ? 'border-2 border-gold-500 shadow-2xl shadow-gold-500/10 scale-105' : 'border border-gold-500/20'}`}>
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-black text-cream-100">{plan.name}</h3>
                  <p className="text-cream-300 text-xs mt-1 mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 my-4">
                    <span className="text-4xl font-black text-gold-500">{isYearly ? plan.yearly : plan.monthly}</span>
                    <span className="text-cream-400 text-sm">/ {isYearly ? 'year' : 'month'}</span>
                  </div>
                  <ul className="space-y-4 my-8 text-sm text-cream-200">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => handleOpenModal(plan.name)}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-sm transition shadow-lg ${plan.popular ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-navy-950 shadow-gold-500/20' : 'bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-cream-100 border border-gold-500/30'}`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-navy-950 border-t border-navy-800 pt-16 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gold-500 p-2 rounded-xl text-navy-950">
                <Dumbbell className="h-5 w-5" />
              </div>
              <span className="text-xl font-black uppercase text-white">FIT<span className="text-gold-500">ELITE</span></span>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed">
              Redefining premium fitness, luxury wellness, and uncompromising strength coaching for elite athletes and enthusiasts.
            </p>
          </div>

          <div>
            <h4 className="text-cream-100 font-bold uppercase tracking-wider text-sm mb-4 border-b border-navy-800 pb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream-300">
              <li><a href="#home" className="hover:text-gold-500 transition">Home</a></li>
              <li><a href="#features" className="hover:text-gold-500 transition">Features</a></li>
              <li><a href="#classes" className="hover:text-gold-500 transition">Classes & Schedule</a></li>
              <li><a href="#trainers" className="hover:text-gold-500 transition">Pro Trainers</a></li>
              <li><a href="#pricing" className="hover:text-gold-500 transition">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-100 font-bold uppercase tracking-wider text-sm mb-4 border-b border-navy-800 pb-2">Contact Us</h4>
            <ul className="space-y-3 text-sm text-cream-300">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-500 shrink-0" /> <span>Connaught Place, New Delhi, India</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold-500 shrink-0" /> <span>+91 98765 43210</span></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold-500 shrink-0" /> <span>contact@fitelitegym.com</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-100 font-bold uppercase tracking-wider text-sm mb-4 border-b border-navy-800 pb-2">Working Hours</h4>
            <ul className="space-y-2 text-sm text-cream-300">
              <li className="flex justify-between"><span>Monday - Saturday:</span> <strong className="text-gold-500">24 Hours</strong></li>
              <li className="flex justify-between"><span>Sunday:</span> <strong className="text-gold-500">06:00 AM - 10:00 PM</strong></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <p>© 2026 FitElite Pro Gym. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-gold-500 transition">Privacy Policy</a>
            <a href="#home" className="hover:text-gold-500 transition">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Booking / Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl p-8 border-2 border-gold-500/40 shadow-2xl relative animate-fade-in">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-cream-300 hover:text-gold-500">
              <X className="h-6 w-6" />
            </button>

            {!formSubmitted ? (
              <div className="space-y-6">
                <div>
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">Secure Registration</span>
                  <h3 className="text-2xl font-black text-cream-100 mt-3">Join: {selectedPlan}</h3>
                  <p className="text-cream-300 text-xs mt-1">Fill out your details to lock in your membership.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cream-300 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Prabhat Mishra" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-navy-900 border border-navy-800 rounded-xl p-3 text-cream-100 text-sm focus:outline-none focus:border-gold-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cream-300 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. prabhat@example.com" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-navy-900 border border-navy-800 rounded-xl p-3 text-cream-100 text-sm focus:outline-none focus:border-gold-500" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cream-300 mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 9876543210" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-navy-900 border border-navy-800 rounded-xl p-3 text-cream-100 text-sm focus:outline-none focus:border-gold-500" 
                      required 
                    />
                  </div>

                  <button type="submit" className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-navy-950 font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-gold-500/25 mt-2">
                    Confirm & Complete Registration
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-gold-500 text-navy-950 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-lg shadow-gold-500/30">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-cream-100">Registration Successful!</h3>
                <p className="text-cream-300 text-sm">
                  Welcome to FitElite, <strong className="text-gold-500">{formData.name}</strong>! Our fitness advisor will contact you shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

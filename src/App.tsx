import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Video, 
  Palette, 
  Megaphone, 
  Share2, 
  Lock, 
  Users, 
  Clock, 
  ShieldCheck, 
  Search, 
  Trash2, 
  Check, 
  HelpCircle, 
  Star, 
  Plus, 
  Minus,
  MessageSquare,
  DollarSign,
  ChevronDown,
  ExternalLink,
  Briefcase,
  AlertCircle,
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Define the Service structure
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  bullets: string[];
  icon: React.ComponentType<{ className?: string }>;
}

// Define the Lead structure
interface Lead {
  id: string;
  fullName: string;
  whatsappNumber: string;
  businessName: string;
  selectedPackageType: 'bundle' | 'custom';
  selectedServices: string[];
  totalPrice: number;
  timestamp: string;
}

// Define the Showcase Poster structure
interface ShowcasePoster {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  highlights: string[];
}

// 9 High-Converting Premium Poster templates shared by the user
const SHOWCASE_POSTERS: ShowcasePoster[] = [
  {
    id: 'poster_1',
    title: 'Luxury Real Estate & High-Value Property',
    category: 'Real Estate Campaign',
    description: 'High-contrast editorial grid showcasing architectural details. Tailored specifically to premium properties to elevate brand prestige and capture qualified homebuyer leads.',
    url: 'https://i.ibb.co/FqYSdv1G/Chat-GPT-Image-Aug-5-2026-08-07-33-AM.png',
    highlights: ['Sophisticated serif display typography', 'High-contrast light layouts', 'Conversion-optimized key callouts']
  },
  {
    id: 'poster_2',
    title: 'Luxury Watch & Premium Product Spotlight',
    category: 'E-Commerce & Retail',
    description: 'Bold dark-contrast presentation with a gold typography accent and premium lighting cues. Specially designed to drive immediate purchase intent and highlight craftsmanship.',
    url: 'https://i.ibb.co/8nTDcjrW/Chat-GPT-Image-Jul-30-2026-11-07-12-PM.png',
    highlights: ['Deep obsidian contrast palette', 'Elegant gold typography hierarchy', 'Centered product hero orientation']
  },
  {
    id: 'poster_3',
    title: 'Professional Corporate Growth Consultation',
    category: 'Financial & Business Services',
    description: 'Ultra-clean corporate visual framework featuring trusted cool color tones and structured bullet deliverables. Maximizes professional credibility and consulting conversion.',
    url: 'https://i.ibb.co/fV5DVPrS/Chat-GPT-Image-Jul-30-2026-10-57-44-PM.png',
    highlights: ['Clear, scannable value listing', 'Trustworthy neutral elements', 'High contrast action targets']
  },
  {
    id: 'poster_4',
    title: 'High-Conversion Agency Service Launch',
    category: 'Social Media Marketing',
    description: 'Vibrant, high-CTR modern gradient elements with futuristic overlay panels. Perfect for catching the eye of busy entrepreneurs scrolling through Instagram & Facebook.',
    url: 'https://i.ibb.co/Fjb4txM/Chat-GPT-Image-Jul-30-2026-11-01-24-PM.png',
    highlights: ['Electric neon border accents', 'Clean, modern geometry blocks', 'Highly persuasive CTA overlays']
  },
  {
    id: 'poster_5',
    title: 'Appetizing Gourmet Burger Special Menu',
    category: 'Food & Beverage Promotions',
    description: 'Mouth-watering photography layout paired with high-impact price callouts and dynamic appetite-appeal design language. Proven to boost casual dining orders.',
    url: 'https://i.ibb.co/mFbgZXng/Chat-GPT-Image-Jul-30-2026-10-54-24-PM.png',
    highlights: ['High-contrast rustic warm tones', 'Exciting discount sticker badges', 'Dynamic depth-of-field food focus']
  },
  {
    id: 'poster_6',
    title: 'Powerhouse Gym & Fitness Bootcamp Kickoff',
    category: 'Fitness & Lifestyle Brands',
    description: 'High-energy layout featuring bold, action-oriented typography designed to tap into seasonal motivation. Perfect for gyms, coaches, and sports brands.',
    url: 'https://i.ibb.co/GfRPdHzM/Chat-GPT-Image-Jul-30-2026-11-05-37-PM.png',
    highlights: ['Aggressive, high-impact display fonts', 'Dynamic motion-blur layout styling', 'Clear scarcity signup limits']
  },
  {
    id: 'poster_7',
    title: 'Editorial Summer Fashion Collection Launch',
    category: 'Apparel & Fashion E-Store',
    description: 'High-end layout featuring wide font letter tracking, minimal distraction, and spacious borders. Brings a premium department-store feel to any clothing line.',
    url: 'https://i.ibb.co/ksfYksH7/Chat-GPT-Image-Jul-30-2026-10-59-55-PM.png',
    highlights: ['Wide letter-spaced display text', 'Elegant, modern border frame', 'Neutral-toned aesthetic backing']
  },
  {
    id: 'poster_8',
    title: 'Sleek ANC Wireless Headphones Promotion',
    category: 'Consumer Electronics & Gadgets',
    description: 'Premium futuristic ad template with sleek cybernetic gradient lighting. Built to reduce purchase friction by combining key product specs with stunning visuals.',
    url: 'https://i.ibb.co/MyHkZBFf/Chat-GPT-Image-Jul-30-2026-11-03-39-PM.png',
    highlights: ['Stunning neon rim lighting glow', 'Futuristic floating asset placement', 'Key feature specification blocks']
  },
  {
    id: 'poster_9',
    title: 'Advanced AI Marketing Workshop Template',
    category: 'Edu-Tech & High-Ticket Webinars',
    description: 'Authoritative webinar flyer focusing on instructor credibility, core training deliverables, and conversion-optimized registration triggers.',
    url: 'https://i.ibb.co/mrbtN27m/Chat-GPT-Image-Jul-30-2026-10-56-09-PM.png',
    highlights: ['Prominent tutor bio orientation', 'Step-by-step masterclass topics', 'Direct, simple enrollment triggers']
  }
];

export default function App() {
  // Services data mapping the breakdown cards requested
  const services: Service[] = [
    {
      id: 'poster',
      name: 'Creative Poster Design',
      description: '4 High-Quality Creative Posters',
      price: 2000,
      originalPrice: 3000,
      bullets: [
        'Tailored-for-conversion ad layouts',
        'Custom high-fidelity typography & branding',
        'Ready for Instagram, Facebook, or Meta Ads',
        'Source files (.PSD/.Figma) included free'
      ],
      icon: Palette
    },
    {
      id: 'video',
      name: 'AI Video with Character',
      description: '2 Professional AI Videos',
      price: 3000,
      originalPrice: 4500,
      bullets: [
        'Photorealistic custom AI avatar selection',
        'Natural-sounding studio voiceover (Hindi/English)',
        'Full scriptwriting & engaging captions',
        'Perfect for highly engaging Reels & Meta Ads'
      ],
      icon: Video
    },
    {
      id: 'report',
      name: 'Monthly Performance Report',
      description: 'Insights & Recommendations',
      price: 3000,
      originalPrice: 4000,
      bullets: [
        'Detailed competitor marketing analysis',
        'Ad spend & conversion funnel health checks',
        'Direct strategic recommendations',
        'Dedicated monthly 1-on-1 feedback session'
      ],
      icon: FileText
    },
    {
      id: 'smm',
      name: 'SMM Management',
      description: 'Scheduling, Publishing, Engagement',
      price: 4000,
      originalPrice: 6000,
      bullets: [
        '15 optimized post publish schedule',
        'Comprehensive bio and profile optimization',
        'Active community comment & message reply management',
        'Strategic organic outreach & growth tactics'
      ],
      icon: Share2
    },
    {
      id: 'ads',
      name: 'Meta Ads Management',
      description: 'Setup, Targeting, Optimization',
      price: 5000,
      originalPrice: 7500,
      bullets: [
        'Laser-focused target audience selection',
        'Pixel, API and custom conversion tracking setup',
        'Robust A/B creative testing matrix',
        'Continuous optimization to maximize your ROAS'
      ],
      icon: Megaphone
    }
  ];

  // Global Bundle Details
  const BUNDLE_PRICE = 10000;
  const BUNDLE_ORIGINAL_PRICE = 16999;
  const BUNDLE_SAVINGS = BUNDLE_ORIGINAL_PRICE - BUNDLE_PRICE; // ₹6,999

  // State Management
  const [selectedServices, setSelectedServices] = useState<string[]>(services.map(s => s.id));
  const [isBundleSelected, setIsBundleSelected] = useState<boolean>(true);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [web3FormsKey, setWeb3FormsKey] = useState<string>(() => {
    return localStorage.getItem('oxixo_web3forms_key') || '';
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 7-Second Lead Capture Popup States
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalFullName, setModalFullName] = useState<string>('');
  const [modalWhatsappNumber, setModalWhatsappNumber] = useState<string>('');
  const [modalBusinessName, setModalBusinessName] = useState<string>('');
  const [modalIsSubmitted, setModalIsSubmitted] = useState<boolean>(false);
  const [modalIsSubmitting, setModalIsSubmitting] = useState<boolean>(false);
  const [modalSubmitError, setModalSubmitError] = useState<string | null>(null);
  const [modalLastSubmittedLead, setModalLastSubmittedLead] = useState<Lead | null>(null);

  // Poster Showcase Carousel States
  const [activePosterIndex, setActivePosterIndex] = useState<number>(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState<boolean>(true);
  const [zoomedPosterUrl, setZoomedPosterUrl] = useState<string | null>(null);
  
  // UI States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedLead, setLastSubmittedLead] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({
    0: true, // open first by default
  });

  // Countdown timer state (target 2 hours or dynamic loop)
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 48, seconds: 32 });

  // Load leads from localStorage on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('oxixo_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        console.error('Error parsing leads from localStorage', e);
      }
    }
  }, []);

  // Timer tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep the FOMO realistic yet functional
          return { hours: 2, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 7-second automatic lead capture popup effect
  useEffect(() => {
    const hasClosedOrSubmitted = sessionStorage.getItem('oxixo_popup_shown') === 'true';
    if (!hasClosedOrSubmitted) {
      const popupTimer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem('oxixo_popup_shown', 'true');
      }, 7000);
      return () => clearTimeout(popupTimer);
    }
  }, []);

  // Poster Showcase Autoplay effect
  useEffect(() => {
    if (!isAutoplayActive) return;
    const interval = setInterval(() => {
      setActivePosterIndex((prev) => (prev + 1) % SHOWCASE_POSTERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplayActive]);

  // Toggle single service
  const handleToggleService = (id: string) => {
    let updated: string[];
    if (selectedServices.includes(id)) {
      updated = selectedServices.filter(sid => sid !== id);
    } else {
      updated = [...selectedServices, id];
    }
    
    setSelectedServices(updated);

    // If they selected all services, represent it as the premium bundle discount
    if (updated.length === services.length) {
      setIsBundleSelected(true);
    } else {
      setIsBundleSelected(false);
    }
  };

  // Select standard bundle
  const handleSelectBundle = () => {
    setSelectedServices(services.map(s => s.id));
    setIsBundleSelected(true);
    
    // Smooth scroll to calculator or checkout
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Select custom ala-carte plan
  const handleSelectCustom = () => {
    setIsBundleSelected(false);
    if (selectedServices.length === services.length) {
      // Uncheck the most expensive one initially so it acts as custom
      setSelectedServices(services.map(s => s.id).filter(id => id !== 'ads'));
    }
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate current price based on selection
  const calculatePrice = () => {
    if (isBundleSelected) {
      return {
        current: BUNDLE_PRICE,
        original: BUNDLE_ORIGINAL_PRICE,
        savings: BUNDLE_SAVINGS,
        label: 'Complete Growth Bundle (41% Discount Applied)'
      };
    }

    const sumCurrent = selectedServices.reduce((sum, sid) => {
      const s = services.find(serv => serv.id === sid);
      return sum + (s ? s.price : 0);
    }, 0);

    const sumOriginal = selectedServices.reduce((sum, sid) => {
      const s = services.find(serv => serv.id === sid);
      return sum + (s ? s.originalPrice : 0);
    }, 0);

    return {
      current: sumCurrent,
      original: sumOriginal,
      savings: sumOriginal - sumCurrent,
      label: `Custom Package (${selectedServices.length} Selected)`
    };
  };

  const pricing = calculatePrice();

  // Scroll to element helper
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit Lead Form Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsappNumber.trim()) {
      alert('Please fill out your Name and WhatsApp Number to proceed.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const newLead: Lead = {
      id: 'lead_' + Math.random().toString(36).substring(2, 9),
      fullName,
      whatsappNumber,
      businessName: businessName.trim() || 'N/A',
      selectedPackageType: isBundleSelected ? 'bundle' : 'custom',
      selectedServices: [...selectedServices],
      totalPrice: pricing.current,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem('oxixo_leads', JSON.stringify(updatedLeads));
    setLastSubmittedLead(newLead);

    // Track lead event or trigger conversion feedback
    console.log('Lead captured successfully:', newLead);

    // Prepare Web3Forms payload
    const activeKey = web3FormsKey || (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY || localStorage.getItem('oxixo_web3forms_key') || '';
    
    if (activeKey) {
      try {
        const serviceNames = selectedServices.map(sid => {
          const s = services.find(serv => serv.id === sid);
          return s ? s.name : sid;
        }).join(', ');

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: activeKey,
            subject: `🔥 New OXIXO Lead: ${fullName}`,
            from_name: "OXIXO Lead Bot",
            to_email: "officialoxixo@gmail.com",
            "Client Name": fullName,
            "WhatsApp Number": `+91 ${whatsappNumber}`,
            "Business Name / Website": businessName.trim() || 'N/A',
            "Package Selected": isBundleSelected ? '🎁 Complete Growth Bundle (Recommended)' : '⚡ Custom Ala-Carte',
            "Selected Services": serviceNames,
            "Total Price": `₹${pricing.current.toLocaleString('en-IN')}`,
            "Timestamp": newLead.timestamp,
            "Contact Client WhatsApp Link": `https://wa.me/91${whatsappNumber.replace(/\D/g, '')}`
          })
        });

        const data = await response.json();
        if (data.success) {
          console.log('Web3Forms lead emailed successfully:', data);
        } else {
          console.error('Web3Forms submission failed:', data);
          setSubmitError(data.message || 'Failed to send email via Web3Forms.');
        }
      } catch (err) {
        console.error('Error submitting to Web3Forms:', err);
        setSubmitError('Network error sending lead email. Saved locally in browser cache!');
      }
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Submit Modal Lead Form Handler
  const handleModalFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFullName.trim() || !modalWhatsappNumber.trim()) {
      alert('Please fill out your Name and WhatsApp Number to proceed.');
      return;
    }

    setModalIsSubmitting(true);
    setModalSubmitError(null);

    const newLead: Lead = {
      id: 'lead_modal_' + Math.random().toString(36).substring(2, 9),
      fullName: modalFullName,
      whatsappNumber: modalWhatsappNumber,
      businessName: modalBusinessName.trim() || 'N/A',
      selectedPackageType: 'bundle',
      selectedServices: services.map(s => s.id),
      totalPrice: BUNDLE_PRICE,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem('oxixo_leads', JSON.stringify(updatedLeads));
    setModalLastSubmittedLead(newLead);

    // Track lead event or trigger conversion feedback
    console.log('Modal Lead captured successfully:', newLead);

    // Prepare Web3Forms payload
    const activeKey = web3FormsKey || (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY || localStorage.getItem('oxixo_web3forms_key') || '';
    
    if (activeKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: activeKey,
            subject: `🔥 [POPUP LEAD] OXIXO Lead: ${modalFullName}`,
            from_name: "OXIXO Popup Lead Bot",
            to_email: "officialoxixo@gmail.com",
            "Client Name": modalFullName,
            "WhatsApp Number": `+91 ${modalWhatsappNumber}`,
            "Business Name / Website": modalBusinessName.trim() || 'N/A',
            "Package Selected": '🎁 Complete Growth Bundle (Recommended - From Popup)',
            "Total Price": `₹10,000`,
            "Timestamp": newLead.timestamp,
            "Contact Client WhatsApp Link": `https://wa.me/91${modalWhatsappNumber.replace(/\D/g, '')}`
          })
        });

        const data = await response.json();
        if (data.success) {
          console.log('Web3Forms modal lead emailed successfully:', data);
        } else {
          console.error('Web3Forms modal submission failed:', data);
          setModalSubmitError(data.message || 'Failed to send email via Web3Forms.');
        }
      } catch (err) {
        console.error('Error submitting modal to Web3Forms:', err);
        setModalSubmitError('Network error sending lead email. Saved locally in browser cache!');
      }
    }

    setModalIsSubmitting(false);
    setModalIsSubmitted(true);
  };

  // Clear a single lead from admin
  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('oxixo_leads', JSON.stringify(updated));
    }
  };

  // Reset form to submit another
  const handleResetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setWhatsappNumber('');
    setBusinessName('');
    setSubmitError(null);
    // Reset to full bundle by default
    setSelectedServices(services.map(s => s.id));
    setIsBundleSelected(true);
  };

  // Generate WhatsApp prefilled link for agency to contact client
  const getWhatsAppContactLink = (lead: Lead) => {
    const serviceNames = lead.selectedServices.map(sid => {
      const s = services.find(serv => serv.id === sid);
      return s ? s.name : sid;
    }).join(', ');

    const text = `Hello ${lead.fullName}, thank you for choosing OXIXO! We received your order for the *${lead.selectedPackageType === 'bundle' ? 'Complete Growth Bundle (₹10,000)' : 'Custom Plan'}* (${serviceNames}) for your business *${lead.businessName}*. Let's discuss your marketing strategy!`;
    return `https://api.whatsapp.com/send?phone=91${lead.whatsappNumber.replace(/\D/g, '')}&text=${encodeURIComponent(text)}`;
  };

  // Generate self-WhatsApp prefilled message for lead to click on thank-you screen
  const getSelfWhatsAppLink = () => {
    if (!lastSubmittedLead) return '#';
    const serviceNames = lastSubmittedLead.selectedServices.map(sid => {
      const s = services.find(serv => serv.id === sid);
      return s ? s.name : sid;
    }).join(', ');
    
    const text = `Hello OXIXO Team! I've successfully submitted my lead form for *${lastSubmittedLead.fullName}* (${lastSubmittedLead.businessName}). My selected package is: *${lastSubmittedLead.selectedPackageType === 'bundle' ? 'Complete Growth Bundle (₹10,000)' : `Custom Package (₹${lastSubmittedLead.totalPrice})`}* incorporating: ${serviceNames}. Let's scale my business!`;
    return `https://api.whatsapp.com/send?phone=918590181381&text=${encodeURIComponent(text)}`; // Real agency whatsapp number
  };

  // Generate self-WhatsApp prefilled message for lead to click on thank-you screen in modal popup
  const getModalSelfWhatsAppLink = () => {
    if (!modalLastSubmittedLead) return '#';
    const text = `Hello OXIXO Team! I've successfully submitted my details through the popup for *${modalLastSubmittedLead.fullName}* (${modalLastSubmittedLead.businessName || 'No Business Name'}). Let's discuss growing my business with your Growth Bundle!`;
    return `https://api.whatsapp.com/send?phone=918590181381&text=${encodeURIComponent(text)}`; // Real agency whatsapp number
  };

  // Toggle FAQ Accordion
  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      
      {/* Dynamic Top Announcement Banner */}
      <div className="bg-[#1A1A1A] text-white py-2 px-4 text-xs md:text-sm font-medium tracking-wide flex justify-center items-center gap-2 border-b border-[#D4AF37]/20">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F33A6A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F33A6A]"></span>
        </span>
        <span>
          Exclusive Anniversary Discount: Save <strong className="text-[#D4AF37] font-semibold">₹6,999</strong> on our Complete Marketing Growth Bundle!
        </span>
        <span className="hidden md:inline-block ml-4 bg-[#F33A6A]/10 text-[#F33A6A] text-[11px] px-2 py-0.5 rounded border border-[#F33A6A]/20">
          Ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>

      {/* Floating Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://i.ibb.co/v4GvfMrr/Chat-GPT-Image-Jul-6-2026-07-57-53-AM.png" 
              alt="OXIXO Logo" 
              className="w-10 h-10 object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#1A1A1A]">OXIXO</span>
              <span className="text-[10px] block font-bold tracking-widest text-[#D4AF37] uppercase -mt-1">AI Powered Marketing</span>
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <button onClick={() => scrollTo('services')} className="hover:text-[#D4AF37] transition-colors">Our Services</button>
            <button onClick={() => scrollTo('calculator')} className="hover:text-[#D4AF37] transition-colors">Price Calculator</button>
            <button onClick={() => scrollTo('why-us')} className="hover:text-[#D4AF37] transition-colors">Why OXIXO</button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-[#D4AF37] transition-colors">Client Outcomes</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-[#D4AF37] transition-colors">FAQs</button>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <a 
              href="https://www.instagram.com/oxixoagency_/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] hover:text-[#D4AF37] transition-all bg-slate-50 hover:bg-slate-100 py-2 px-4 rounded-full border border-slate-200 cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5 text-[#F33A6A]" />
              <span>Instagram</span>
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=918590181381&text=Hello%20OXIXO%20Team!%20I'm%20interested%20in%20scaling%20my%20business%20with%20your%20services." 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-white transition-all bg-[#25D366]/10 hover:bg-[#25D366] py-2 px-4 rounded-full border border-[#25D366]/20 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
            <button 
              onClick={() => scrollTo('checkout')} 
              className="bg-[#1A1A1A] hover:bg-[#2C2825] text-white text-xs md:text-sm font-semibold px-5 py-2 rounded-full border border-[#D4AF37]/30 transition-all shadow-lg shadow-[#D4AF37]/10 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Subtle decorative circles */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 rounded-full bg-[#F33A6A]/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F33A6A]/10 border border-[#F33A6A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F33A6A] tracking-wide mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>AI-Powered Performance Marketing Ecosystem</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
            Complete Marketing Growth
            <span className="block mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F33A6A] to-[#D4AF37] bg-clip-text text-transparent">
              All You Need for Your Business
            </span>
          </h1>

          {/* Value Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-10">
            Forget expensive multi-agency contracts. We combine high-converting design, AI video tech, advanced platform optimization, and rigorous SMM scheduling into a singular high-performing system designed to skyrocket your sales.
          </p>

          {/* Massive Offer Banner Card */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-[#D4AF37]/30 shadow-2xl p-6 md:p-8 mb-12 relative overflow-hidden group">
            {/* Stamp highlight */}
            <div className="absolute -top-3 -right-3 bg-[#F33A6A] text-white text-[10px] md:text-xs font-bold tracking-widest uppercase py-2 px-6 rotate-12 shadow-md">
              SAVE ₹6,999 NOW
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Offer pricing block */}
              <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">OXIXO FULL SUITE</p>
                <div className="flex justify-center md:justify-start items-baseline gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-[#1A1A1A]">₹10,000</span>
                  <span className="text-lg text-slate-400 line-through font-semibold">₹16,999</span>
                </div>
                <p className="text-xs text-[#D4AF37] bg-amber-50 rounded-md py-1 px-2.5 inline-block font-semibold border border-amber-200">
                  ⚡ Single Payment, All-Inclusive Bundle
                </p>
              </div>

              {/* Offer highlights */}
              <div className="md:col-span-7 text-left space-y-3">
                <p className="text-sm font-extrabold text-slate-700">What’s included in this premium package:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>4 Creative Posters</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>2 Custom AI Videos</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Monthly Growth Report</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Complete SMM Setup</span>
                  </li>
                  <li className="flex items-center gap-1.5 sm:col-span-2">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Meta Ads Launch & Management</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Countdown timer inline */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4 text-xs">
              <span className="text-slate-500 font-medium">⏳ Act fast! This pricing is exclusive for this onboarding window:</span>
              <div className="flex items-center gap-1.5 font-mono text-slate-800">
                <span className="bg-[#1A1A1A] text-[#D4AF37] font-bold px-2 py-1 rounded shadow-xs">{timeLeft.hours.toString().padStart(2, '0')}h</span>
                <span className="text-slate-400 font-bold">:</span>
                <span className="bg-[#1A1A1A] text-[#D4AF37] font-bold px-2 py-1 rounded shadow-xs">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
                <span className="text-slate-400 font-bold">:</span>
                <span className="bg-[#1A1A1A] text-[#D4AF37] font-bold px-2 py-1 rounded shadow-xs">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
              </div>
            </div>

          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={handleSelectBundle}
              className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-black text-white text-base font-bold px-8 py-4 rounded-xl border border-[#D4AF37] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get the Complete Bundle (₹10,000)</span>
              <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
            </button>
            <button 
              onClick={handleSelectCustom}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 text-base font-semibold px-8 py-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Build Custom Package</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-slate-500">
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <ShieldCheck className="w-4 h-4 text-[#F33A6A] flex-shrink-0" />
              <span>Instant WhatsApp Updates</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#F33A6A] flex-shrink-0" />
              <span>Full Creative Support</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <TrendingUp className="w-4 h-4 text-[#F33A6A] flex-shrink-0" />
              <span>A/B Tested to Convert</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
              <Sparkles className="w-4 h-4 text-[#F33A6A] flex-shrink-0" />
              <span>Latest AI Ad Tech Integration</span>
            </div>
          </div>

        </div>
      </section>

      {/* Deep Dive Services Grid */}
      <section id="services" className="py-20 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">THE ECOSYSTEM BREAKDOWN</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mt-2 mb-4">
              Everything Needed to Fuel Consistent Revenue
            </h2>
            <p className="text-slate-500 text-base">
              Each module is engineered to sync perfectly with the others, maximizing conversion and reducing ad fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isSelected = selectedServices.includes(service.id);
              
              return (
                <div 
                  key={service.id} 
                  className={`bg-white rounded-2xl border p-6 md:p-8 transition-all duration-300 flex flex-col justify-between relative shadow-xs hover:shadow-lg ${
                    isSelected 
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/10' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  
                  {/* Select check badge */}
                  <button 
                    onClick={() => handleToggleService(service.id)}
                    className={`absolute top-6 right-6 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-[#1A1A1A] text-white border border-[#D4AF37]' 
                        : 'bg-slate-50 text-slate-300 border border-slate-100 hover:border-slate-300'
                    }`}
                    title={isSelected ? "Remove from custom list" : "Add to custom list"}
                  >
                    <Check className={`w-4 h-4 ${isSelected ? 'stroke-[3px]' : 'stroke-2'}`} />
                  </button>

                  <div>
                    {/* Header: Icon & Category */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#F33A6A]/10 flex items-center justify-center text-[#F33A6A]">
                        <IconComponent className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">MODULE 0{index + 1}</span>
                        <h3 className="font-bold text-lg text-slate-800">{service.name}</h3>
                      </div>
                    </div>

                    {/* Pricing Pill */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-extrabold text-[#1A1A1A]">₹{service.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-400 line-through">₹{service.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] bg-[#F33A6A]/10 text-[#F33A6A] border border-[#F33A6A]/20 py-0.5 px-1.5 rounded font-semibold ml-2">
                        Included in Bundle
                      </span>
                    </div>

                    {/* Subheading */}
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 border-b border-slate-100 pb-3">
                      🎯 Deliverable: {service.description}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2.5 mb-8">
                      {service.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Add / Remove Action */}
                  <button
                    onClick={() => handleToggleService(service.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F33A6A]/10 hover:bg-[#F33A6A]/20 text-[#F33A6A] border border-[#F33A6A]/20'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Minus className="w-3.5 h-3.5" />
                        <span>Remove from custom selection</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to custom selection (₹{service.price})</span>
                      </>
                    )}
                  </button>

                </div>
              );
            })}

          </div>

          {/* Quick Package Selector Sync Tip */}
          <div className="mt-12 bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div>
              <p className="font-bold text-slate-800 text-sm md:text-base">🎁 Recommendation: The Complete Growth Bundle</p>
              <p className="text-xs text-slate-500 mt-1">
                You get all 5 marketing modules for only ₹10,000 instead of paying individual fees. Total a-la-carte sum is ₹17,000. Saves you ₹7,000 instantly!
              </p>
            </div>
            <button 
              onClick={handleSelectBundle} 
              className="bg-[#1A1A1A] hover:bg-[#2C2825] text-white text-xs font-bold py-2.5 px-6 rounded-lg whitespace-nowrap transition-all shadow-md border border-[#D4AF37]/30"
            >
              Activate Bundle Discount
            </button>
          </div>

        </div>
      </section>

      {/* Professional Creative Poster Showcase */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
        {/* Abstract design elements to give a premium look */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#F33A6A]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] fill-current" />
              <span>OXIXO CREATIVE PORTFOLIO</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Our Service Posters Showcase
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-3 leading-relaxed">
              Explore our premium, high-converting social media creatives engineered with professional layout standards, meticulous visual hierarchy, and strategic color psychology to boost your client engagement.
            </p>
          </div>

          {/* Core Interactive Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Visual Carousel Display (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-lg aspect-square bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden group flex items-center justify-center">
                
                {/* Active Image Render */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePosterIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full p-4 md:p-6 flex items-center justify-center relative cursor-pointer"
                    onClick={() => setZoomedPosterUrl(SHOWCASE_POSTERS[activePosterIndex].url)}
                  >
                    <img 
                      src={SHOWCASE_POSTERS[activePosterIndex].url} 
                      alt={SHOWCASE_POSTERS[activePosterIndex].title}
                      className="max-w-full max-h-full object-contain rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Magnify Badge */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-3xl">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full text-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Category Label */}
                <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase py-1 px-3 rounded-full">
                  {SHOWCASE_POSTERS[activePosterIndex].category}
                </span>

                {/* Left/Right Slider Arrows */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoplayActive(false);
                    setActivePosterIndex((prev) => (prev - 1 + SHOWCASE_POSTERS.length) % SHOWCASE_POSTERS.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-white p-2.5 rounded-full transition-all focus:outline-none hover:text-[#D4AF37] hover:scale-105 z-20 cursor-pointer"
                  title="Previous Poster"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoplayActive(false);
                    setActivePosterIndex((prev) => (prev + 1) % SHOWCASE_POSTERS.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-white p-2.5 rounded-full transition-all focus:outline-none hover:text-[#D4AF37] hover:scale-105 z-20 cursor-pointer"
                  title="Next Poster"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Progress bar inside slide */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                  <motion.div 
                    key={activePosterIndex + '_' + isAutoplayActive}
                    initial={{ width: '0%' }}
                    animate={isAutoplayActive ? { width: '100%' } : { width: '0%' }}
                    transition={isAutoplayActive ? { duration: 4.5, ease: 'linear' } : { duration: 0 }}
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F33A6A]"
                  />
                </div>
              </div>

              {/* Slider Meta Controls & Index Indicator */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex gap-1.5">
                  {SHOWCASE_POSTERS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoplayActive(false);
                        setActivePosterIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        activePosterIndex === idx 
                          ? 'w-6 bg-[#D4AF37]' 
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="h-4 w-px bg-slate-800" />

                {/* Play/Pause Control */}
                <button
                  onClick={() => setIsAutoplayActive(!isAutoplayActive)}
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isAutoplayActive ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#F33A6A] fill-current" />
                      <span>Pause Autoplay</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                      <span>Resume Autoplay</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: In-Depth Strategic Design Breakdown (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-slate-800/60 border border-slate-700/50 py-1 px-3 rounded-md inline-block">
                  Design Showcase {activePosterIndex + 1} of {SHOWCASE_POSTERS.length}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {SHOWCASE_POSTERS[activePosterIndex].title}
                </h3>
              </div>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                {SHOWCASE_POSTERS[activePosterIndex].description}
              </p>

              {/* Psychology Highlight Cards */}
              <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-300 border-b border-slate-800 pb-2">
                  ⚡ Key Conversion Principles Applied:
                </h4>
                <ul className="space-y-3">
                  {SHOWCASE_POSTERS[activePosterIndex].highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book instant consultation based on active poster category */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('checkout');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-[#D4AF37] hover:bg-[#C19C2B] text-slate-950 font-black py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-[#D4AF37]/15 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Select Creative Packages to Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Thumbnails Row Carousel for direct selection */}
          <div className="mt-16 border-t border-slate-800 pt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-6">
              Browse All 9 Premium Campaign Designs
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
              {SHOWCASE_POSTERS.map((poster, idx) => (
                <button
                  key={poster.id}
                  onClick={() => {
                    setIsAutoplayActive(false);
                    setActivePosterIndex(idx);
                  }}
                  className={`relative aspect-square rounded-xl border overflow-hidden transition-all duration-300 flex items-center justify-center bg-slate-950 group ${
                    activePosterIndex === idx 
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-105 shadow-md' 
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                  }`}
                  title={poster.title}
                >
                  <img 
                    src={poster.url} 
                    alt={poster.title}
                    className="max-w-[85%] max-h-[85%] object-contain rounded-md"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  
                  {/* Miniature index badge */}
                  <span className="absolute bottom-1 right-1 bg-slate-900/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Value Calculator */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">INTERACTIVE CUSTOMIZER</span>
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mt-2 mb-3">
              Configure Your Ideal Growth Package
            </h2>
            <p className="text-sm text-slate-500">
              Check/uncheck boxes below or simply opt for the highly recommended discounted Full Bundle.
            </p>
          </div>

          <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-6 md:p-10 shadow-xl">
            
            {/* Tab switchers */}
            <div className="flex gap-2 p-1 bg-white rounded-xl border border-slate-100 max-w-md mx-auto mb-8">
              <button 
                onClick={() => {
                  setIsBundleSelected(true);
                  setSelectedServices(services.map(s => s.id));
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isBundleSelected 
                    ? 'bg-[#1A1A1A] text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isBundleSelected ? 'text-[#D4AF37]' : ''}`} />
                <span>Growth Bundle (₹10,000)</span>
              </button>
              <button 
                onClick={() => {
                  setIsBundleSelected(false);
                  // Ensure at least some are selected so price isn't zero
                  if (selectedServices.length === services.length) {
                    setSelectedServices(services.map(s => s.id).filter(id => id !== 'ads'));
                  }
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  !isBundleSelected 
                    ? 'bg-[#1A1A1A] text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                <span>Ala-Carte / Custom</span>
              </button>
            </div>

            {/* If Bundle is active */}
            {isBundleSelected ? (
              <div className="text-center py-6">
                <span className="inline-block bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#D4AF37]/40 mb-3">
                  🔥 Best Value Bundle Activated
                </span>
                <p className="text-sm text-slate-500 max-w-lg mx-auto mb-6">
                  You are getting our full performance ecosystem. Handing everything over to us ensures standard branding coherence across your posters, AI videos, SMM, and meta target parameters.
                </p>

                {/* Bundle elements checklist visualization */}
                <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto mb-8">
                  {services.map(s => (
                    <span key={s.id} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#F33A6A] stroke-[3px]" />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              /* Ala-Carte checklists */
              <div className="space-y-3 max-w-xl mx-auto mb-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Services to Include:</p>
                {services.map(s => {
                  const isChecked = selectedServices.includes(s.id);
                  return (
                    <div 
                      key={s.id}
                      onClick={() => handleToggleService(s.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer bg-white ${
                        isChecked 
                          ? 'border-[#D4AF37] shadow-sm' 
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-[#1A1A1A] border-[#D4AF37] text-white' : 'border-slate-300'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-bold text-slate-800">{s.name}</p>
                          <p className="text-[11px] text-slate-400">{s.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs md:text-sm font-extrabold text-slate-700">₹{s.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Dynamic Output calculation result */}
            <div className="bg-white rounded-2xl border border-[#D4AF37]/10 p-6 md:p-8 max-w-2xl mx-auto shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                <div className="text-center md:text-left space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">YOUR CUSTOM ESTIMATE</span>
                  <h4 className="font-bold text-slate-700 text-sm md:text-base">{pricing.label}</h4>
                  {pricing.savings > 0 && (
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-50 inline-block px-2.5 py-0.5 rounded border border-emerald-100">
                      🎉 You save ₹{pricing.savings.toLocaleString('en-IN')} on this selection!
                    </p>
                  )}
                </div>

                <div className="text-center md:text-right">
                  <div className="flex items-center justify-center md:justify-end gap-2.5">
                    <span className="text-3xl md:text-4xl font-black text-[#1A1A1A]">₹{pricing.current.toLocaleString('en-IN')}</span>
                    {pricing.original > pricing.current && (
                      <span className="text-base text-slate-400 line-through font-semibold">₹{pricing.original.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-semibold">GST and complete strategic review included</p>
                </div>

              </div>

              {/* Action */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Secure checkout via WhatsApp routing. No pre-payment required.</span>
                </p>
                <button 
                  onClick={() => {
                    // Update form field visual values and scroll to checkout
                    scrollTo('checkout');
                  }}
                  className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-black text-white font-bold text-xs md:text-sm py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg border border-[#D4AF37]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Select & Fill Order Form</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Why Choose OXIXO / AI Growth Advantage */}
      <section id="why-us" className="py-20 bg-[#1A1A1A] text-white relative overflow-hidden">
        {/* Abstract grids */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F33A6A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">THE OXIXO EDGE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
              Traditional Agencies Are Too Slow. We Leverage AI.
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              By combining elite engineering frameworks with premium aesthetic standards, OXIXO yields 3x the output at a fraction of local market prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-[#242424] rounded-2xl p-8 border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center mb-6 border border-[#D4AF37]/20">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white">AI-Driven Speed & Avatars</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Rather than coordinating expensive actors and sets, we deploy high-converting photorealistic digital characters. This lets us draft, test, and render custom ad variations within hours instead of weeks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#242424] rounded-2xl p-8 border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300">
              <div className="w-12 h-12 bg-[#F33A6A]/10 text-[#F33A6A] rounded-xl flex items-center justify-center mb-6 border border-[#F33A6A]/20">
                <TrendingUp className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white">Consolidated Performance Suite</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Most agencies do only one thing. We synchronize everything: posters, videos, scheduling, and Meta optimizations. A unified campaign approach leads to better data capture and significantly lower conversion costs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#242424] rounded-2xl p-8 border border-white/5 hover:border-[#D4AF37]/20 transition-all duration-300">
              <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center mb-6 border border-[#D4AF37]/20">
                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-white">Complete Transparency</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No complex retainer fees or surprise setup costs. We outline deliverables with precision and back our outputs with an intuitive performance report so you see exactly where your conversions are coming from.
              </p>
            </div>

          </div>

          {/* Core metrics panel */}
          <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-5xl font-black text-[#D4AF37]">45%</p>
              <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Average Meta CPA Drop</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-black text-[#D4AF37]">3x</p>
              <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Faster Asset Turnaround</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-black text-[#D4AF37]">₹7M+</p>
              <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Total Revenue Generated</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-black text-[#D4AF37]">120+</p>
              <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wider">Successful Campaigns Launched</p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">REAL CLIENT SUCCESS</span>
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mt-2 mb-4">
              Validated by Ambitious Brands
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              See how local and digital businesses are scaling using the OXIXO AI marketing model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 text-sm md:text-base italic leading-relaxed mb-6">
                  "The AI avatar videos are game-changing. We got 2 premium voiceover ad reels that generated over 300+ inquiries in our first week on Meta! Highly recommend the Complete Growth Bundle."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className="w-10 h-10 rounded-full bg-[#F33A6A]/10 flex items-center justify-center font-bold text-[#F33A6A]">
                  RV
                </div>
                <div>
                  <p className="font-bold text-xs md:text-sm text-[#1A1A1A]">Rohan Varma</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Founder, LuxDecor Furnishings</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 text-sm md:text-base italic leading-relaxed mb-6">
                  "The original estimate with individual agencies was close to ₹20K per month. With OXIXO, we got the posters, full ad setups, and reports for just ₹10,000. Saved money and scaled sales by 60%."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className="w-10 h-10 rounded-full bg-[#F33A6A]/10 flex items-center justify-center font-bold text-[#F33A6A]">
                  NK
                </div>
                <div>
                  <p className="font-bold text-xs md:text-sm text-[#1A1A1A]">Neha Kapoor</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Marketing Lead, FitFuel Nutrition</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 text-sm md:text-base italic leading-relaxed mb-6">
                  "The Monthly Performance Reports are incredible. Instead of confusing spreadsheets, they give 3 concrete optimizations that actually make sense. Absolute clarity on every rupee spent."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className="w-10 h-10 rounded-full bg-[#F33A6A]/10 flex items-center justify-center font-bold text-[#F33A6A]">
                  AS
                </div>
                <div>
                  <p className="font-bold text-xs md:text-sm text-[#1A1A1A]">Aman Singhania</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Director, Singhania Jewellers</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Onboarding Timeline / Step by Step */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">EFFORTLESS COOPERATION</span>
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mt-2 mb-3">
              How We Launch Your Growth Funnel
            </h2>
            <p className="text-slate-500 text-sm">
              From form submission to live sales setup, we have optimized our pipeline to just 4 days.
            </p>
          </div>

          <div className="relative border-l border-slate-100 ml-4 md:ml-8 space-y-12">
            
            {/* Step 1 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-3.5 bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/40 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">Submit Lead Details</h3>
              <p className="text-slate-500 text-sm mt-1">
                Fill the simple order form below indicating your preferred package. There is no upfront pre-payment.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-3.5 bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/40 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">15-Minute WhatsApp Alignment</h3>
              <p className="text-slate-500 text-sm mt-1">
                We will immediately reach out to you on WhatsApp to understand your brand identity, product niche, and target goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-3.5 bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/40 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">Asset Drafting & Rendering</h3>
              <p className="text-slate-500 text-sm mt-1">
                Our design and voice synthesizer tools draft your high-converting posters and photorealistic character video scripts for approval.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative pl-8 md:pl-12">
              <span className="absolute -left-3.5 bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/40 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs">
                4
              </span>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">Meta Ad Setup & Launch</h3>
              <p className="text-slate-500 text-sm mt-1">
                We integrate your conversion pixel, load the optimized target demographic, and trigger your campaigns to begin receiving client inquires.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Core Interactive Checkout & Order Lead Form */}
      <section id="checkout" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">SECURE ORDER FORM</span>
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mt-2 mb-3">
              Begin Your Journey to Scale
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Enter your details below. Once submitted, our team will review your business and ping you on WhatsApp within minutes to initiate the alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="md:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8">
              
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Full Name <span className="text-[#F33A6A]">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rohith Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all text-[#1A1A1A]"
                    />
                  </div>

                  {/* WhatsApp field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      WhatsApp Number <span className="text-[#F33A6A]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">+91</span>
                      <input 
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, '').substring(0, 10))}
                        placeholder="10-digit number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all text-[#1A1A1A]"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Please specify a number containing active WhatsApp messenger.</p>
                  </div>

                  {/* Business website link / Business Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Business Name / Website Link <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input 
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. MyStore.com or Sharma Furnishings"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all text-[#1A1A1A]"
                    />
                  </div>

                  {/* Active Package display read-only indicator */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-[#D4AF37]/20">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Selected Package Configured:</p>
                    <div className="flex justify-between items-baseline">
                      <p className="font-extrabold text-slate-800 text-xs md:text-sm">
                        {isBundleSelected ? '🎁 Complete Growth Bundle (Recommended)' : `⚡ Custom Ala-Carte (${selectedServices.length} modules)`}
                      </p>
                      <p className="font-black text-[#1A1A1A] text-sm md:text-base">₹{pricing.current.toLocaleString('en-IN')}</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => scrollTo('calculator')}
                      className="text-[#D4AF37] hover:text-[#C19C2B] text-[11px] font-bold underline mt-1.5 cursor-pointer block"
                    >
                      Change selection or add/remove packages ↑
                    </button>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold text-base py-4 rounded-xl shadow-lg border border-[#D4AF37]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting Lead...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit & Claim Special Offer Pricing</span>
                        <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    🔒 SSL Encrypted connection. We prioritize privacy of credentials.
                  </p>

                </form>
              ) : (
                /* Success screen */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-[#F33A6A]/10 text-[#F33A6A] rounded-full flex items-center justify-center mx-auto border border-[#F33A6A]/20 shadow-sm animate-bounce">
                    <Check className="w-8 h-8 stroke-[3.5]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#1A1A1A]">Thank You!</h3>
                    <p className="text-slate-600 text-sm font-medium">
                      We will contact you on WhatsApp shortly to align on details.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 max-w-md mx-auto text-left">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Order Confirmed Summary:</p>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <p>👤 <strong>Client Name:</strong> {lastSubmittedLead?.fullName}</p>
                      <p>📞 <strong>WhatsApp Contact:</strong> +91 {lastSubmittedLead?.whatsappNumber}</p>
                      <p>🏢 <strong>Business Name:</strong> {lastSubmittedLead?.businessName}</p>
                      <p>💳 <strong>Amount due at briefing:</strong> <strong className="text-[#1A1A1A] text-sm">₹{lastSubmittedLead?.totalPrice.toLocaleString('en-IN')}</strong></p>
                    </div>
                  </div>

                  {/* Double the commitment: Quick Action Button to speed up */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold text-slate-500">Want to start immediately? Bypass the queue:</p>
                    <a 
                      href={getSelfWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full max-w-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-4 px-6 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5 fill-current" />
                      <span>Ping us on WhatsApp Now</span>
                    </a>
                  </div>

                  <button 
                    onClick={handleResetForm}
                    className="text-slate-400 hover:text-slate-600 text-xs font-medium underline"
                  >
                    Submit another lead/different business config
                  </button>
                </div>
              )}

            </div>

            {/* Price detail column */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Trust block */}
              <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 border border-white/5 shadow-lg space-y-4">
                <h4 className="font-extrabold text-base text-white border-b border-white/5 pb-2">The OXIXO Promise</h4>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs md:text-sm font-bold text-white">No Hidden Retention Caps</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">The pricing you see here is fully transparent. Revisions are included.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs md:text-sm font-bold text-white">Full Rights Allocation</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">All generated posters, scripts, templates, and video files belong 100% to your brand.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs md:text-sm font-bold text-white">Priority Technical Support</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">Direct chat access to your campaign managers throughout active runtimes.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Secure seal */}
              <div className="border border-slate-100 bg-white rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-2 shadow-xs">
                <ShieldCheck className="w-10 h-10 text-slate-400" />
                <p className="text-xs font-bold text-slate-800">Verified AI Agency Partner</p>
                <p className="text-[10px] text-slate-400">We optimize ad budgets securely across Google, Meta, and TikTok ecosystems.</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section id="faq" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">GOT QUESTIONS?</span>
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mt-2 mb-4">
              Answers to Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm">
              Read below to find clarifications about our pipeline, assets, and WhatsApp briefing structure.
            </p>
          </div>

          <div className="space-y-4">
            
            {[
              {
                q: "What does AI-Powered mean in practice?",
                a: "It means we use highly advanced, photorealistic digital AI human character generators and professional voice synthesizers to produce premium visual ad video assets in minutes. We also leverage AI audience target segmentation modeling tools to refine your Meta Ads targets. This significantly lowers creation labor costs, which we pass directly as savings to you!"
              },
              {
                q: "Do I have to pay upfront to submit a lead?",
                a: "No! Submitting the form simply logs your interest and locks in the special discount price. We will contact you on WhatsApp to do a complete 15-minute alignment check first. You only make payment once you approve our proposed timeline and action plan."
              },
              {
                q: "Who provides the ad budget for the Meta campaigns?",
                a: "The client provides the ad budget directly inside their Meta Ads account. We do not charge fees based on a percentage of your ad spend, unlike traditional agencies. Our Meta Ads Management (₹5,000 individually, or included in the bundle) handles setup, pixel alignment, target setting, creative routing, and active optimization entirely."
              },
              {
                q: "Can I customize the bundle to remove a service?",
                a: "Absolutely! Simply toggle off the services you don't need in our custom price calculator. The price will dynamically adjust ala-carte. However, we highly suggest the Complete Growth Bundle (₹10,000) as the bulk discount is mathematically optimized for maximum startup value."
              },
              {
                q: "How fast will you reach out on WhatsApp?",
                a: "We actively monitor all incoming leads during business hours (9:00 AM to 8:00 PM IST) and usually reach out within 15 to 30 minutes of submission!"
              }
            ].map((item, index) => {
              const isOpen = !!faqOpen[index];
              return (
                <div key={index} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/40">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-5 text-left font-bold text-[#1A1A1A] text-sm md:text-base hover:bg-slate-50 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-50 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Footer & Secret Agency Owner Portal access link */}
      <footer className="bg-[#1A1A1A] text-white py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <img 
                  src="https://i.ibb.co/v4GvfMrr/Chat-GPT-Image-Jul-6-2026-07-57-53-AM.png" 
                  alt="OXIXO Logo" 
                  className="w-9 h-9 rounded object-contain bg-slate-950 p-1 border border-slate-800 shadow"
                  referrerPolicy="no-referrer"
                />
                <span className="font-extrabold text-lg tracking-wider text-white">OXIXO</span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm max-w-sm">
                Combining human design intelligence with state-of-the-art AI systems to yield consistent, compounding client revenue across standard marketing channels.
              </p>
              <p className="text-[11px] text-slate-500">
                Registered office: OXIXO Digital Growth, Level 4, Prestige Tech Park, Bangalore, India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-bold text-sm uppercase tracking-wider text-white mb-4">Ecosystem Modules</h5>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li><button onClick={() => scrollTo('services')} className="hover:text-[#D4AF37] transition-colors">Poster Illustration</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-[#D4AF37] transition-colors">AI Digital Characters</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-[#D4AF37] transition-colors">Performance Audits</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-[#D4AF37] transition-colors">SMM Distribution</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-[#D4AF37] transition-colors">Meta Targeting Optimization</button></li>
              </ul>
            </div>

            {/* Quick Contact info */}
            <div>
              <h5 className="font-bold text-sm uppercase tracking-wider text-white mb-4">Contact & Inquiries</h5>
              <p className="text-slate-400 text-xs leading-relaxed">
                🚀 Feel free to write to us on WhatsApp directly for partnership checks.
              </p>
              <p className="text-slate-400 text-xs mt-3">
                📧 <strong>Email:</strong>{' '}
                <a href="mailto:officialoxixo@gmail.com" className="text-[#D4AF37] hover:underline">
                  officialoxixo@gmail.com
                </a>
              </p>
              <p className="text-slate-400 text-xs">
                💬 <strong>WhatsApp support:</strong>{' '}
                <a 
                  href="https://wa.me/918590181381" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#D4AF37] hover:underline"
                >
                  +91 8590181381
                </a>
              </p>
              <p className="text-slate-400 text-xs mt-2 flex items-center gap-1.5">
                📸 <strong>Instagram:</strong>{' '}
                <a 
                  href="https://www.instagram.com/oxixoagency_/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#F33A6A] fill-current opacity-90" />
                  <span>@oxixoagency_</span>
                </a>
              </p>
            </div>

          </div>

          {/* Bottom Copyright and Secret Agency Panel link */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} OXIXO Agency. All Rights Reserved. Designed by OXIXO Tech Studio.</p>
            
            {/* Interactive Secret Lead Panel Access */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all px-3 py-1.5 rounded flex items-center gap-1.5 border border-white/5"
              >
                <Lock className="w-3 h-3 text-[#D4AF37]" />
                <span>{showAdminPanel ? "Hide Agency Portal" : "Agency Portal"}</span>
                {leads.length > 0 && (
                  <span className="bg-[#D4AF37] text-[#1A1A1A] font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {leads.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Hidden Agency Lead Management Admin Panel (Reveals dynamically) */}
          {showAdminPanel && (
            <div className="mt-8 bg-white text-[#1A1A1A] rounded-3xl border-2 border-[#D4AF37] p-6 md:p-8 shadow-2xl relative z-30 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#F33A6A]/10 text-[#F33A6A] border border-[#F33A6A]/20 text-[10px] font-bold uppercase py-0.5 px-2.5 rounded">
                      INTERNAL STAFF USE
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Synced to LocalStorage</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 mt-1">
                    OXIXO Incoming Leads Management System
                  </h4>
                </div>
                
                {/* Statistics Summary */}
                <div className="flex gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium uppercase tracking-wider text-[9px]">TOTAL CAPTURED</span>
                    <strong className="text-[#1A1A1A] text-lg font-black">{leads.length} leads</strong>
                  </div>
                  <div className="border-l border-slate-200 pl-4">
                    <span className="text-slate-400 block font-medium uppercase tracking-wider text-[9px]">POTENTIAL REVENUE</span>
                    <strong className="text-emerald-700 text-lg font-black">
                      ₹{leads.reduce((sum, l) => sum + l.totalPrice, 0).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Web3Forms Access Key Setup Card */}
              <div className="mb-6 bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs md:text-sm text-[#1A1A1A] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>Web3Forms Email Forwarding Configuration</span>
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      All lead submissions are configured to send directly to <strong className="text-slate-700">officialoxixo@gmail.com</strong>.
                      To activate live email forwarding, paste your Web3Forms Access Key below.
                    </p>
                  </div>
                  <div className="w-full md:w-auto flex items-center gap-2">
                    <input 
                      type="password"
                      value={web3FormsKey}
                      onChange={(e) => {
                        setWeb3FormsKey(e.target.value);
                        localStorage.setItem('oxixo_web3forms_key', e.target.value);
                      }}
                      placeholder="Paste Web3Forms Access Key..."
                      className="w-full md:w-64 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#D4AF37] font-mono text-[#1A1A1A]"
                    />
                    <a 
                      href="https://web3forms.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-white bg-[#D4AF37] hover:bg-[#C19C2B] py-1.5 px-3 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
                    >
                      <span>Get Free Key</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                {web3FormsKey ? (
                  <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Live Web3Forms Email Routing Active! Leads will be sent to officialoxixo@gmail.com instantly.</span>
                  </p>
                ) : (
                  <p className="text-[10px] text-rose-500 font-bold mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Live routing offline. Leads are only saved in your browser's local storage. Please get a free key to activate email alerts.</span>
                  </p>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-sm mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Search lead name, number, or business..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#D4AF37] text-[#1A1A1A]"
                />
              </div>

              {/* Leads Table / List */}
              {leads.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500">
                  <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-bold text-slate-800 text-sm">No submissions recorded yet</p>
                  <p className="text-xs mt-1">Submit the order form above to see your lead appear here instantly!</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Date / Time</th>
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">WhatsApp Contact</th>
                        <th className="py-3 px-4">Business / Website</th>
                        <th className="py-3 px-4">Package Select</th>
                        <th className="py-3 px-4 text-right">Quote</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads
                        .filter(l => 
                          l.fullName.toLowerCase().includes(adminSearch.toLowerCase()) ||
                          l.whatsappNumber.includes(adminSearch) ||
                          l.businessName.toLowerCase().includes(adminSearch.toLowerCase())
                        )
                        .map((lead) => {
                          const leadServices = lead.selectedServices.map(sid => {
                            const s = services.find(serv => serv.id === sid);
                            return s ? s.name : sid;
                          }).join(', ');

                          return (
                            <tr key={lead.id} className="hover:bg-[#D4AF37]/5 transition-all">
                              <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400 whitespace-nowrap">{lead.timestamp}</td>
                              <td className="py-3.5 px-4 font-bold text-slate-900">{lead.fullName}</td>
                              <td className="py-3.5 px-4 font-semibold text-slate-800">
                                <span className="inline-flex items-center gap-1">
                                  +91 {lead.whatsappNumber}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-600 max-w-[150px] truncate" title={lead.businessName}>{lead.businessName}</td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-block py-0.5 px-2 rounded-full text-[9px] font-bold ${
                                  lead.selectedPackageType === 'bundle' 
                                    ? 'bg-[#1A1A1A] text-[#D4AF37]' 
                                    : 'bg-[#F33A6A]/10 text-[#F33A6A]'
                                }`} title={leadServices}>
                                  {lead.selectedPackageType === 'bundle' ? '🎁 BUNDLE' : '⚡ CUSTOM'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right font-black text-slate-900">₹{lead.totalPrice.toLocaleString('en-IN')}</td>
                              <td className="py-3.5 px-4 text-center">
                                <div className="flex justify-center items-center gap-2">
                                  
                                  {/* Direct WhatsApp ping button */}
                                  <a 
                                    href={getWhatsAppContactLink(lead)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-1 px-2.5 rounded font-bold text-[10px] inline-flex items-center gap-1 border border-emerald-200 transition-all cursor-pointer"
                                    title="Draft WhatsApp Alignment Message"
                                  >
                                    <MessageSquare className="w-3 h-3 fill-current" />
                                    <span>Contact Client</span>
                                  </a>

                                  {/* Delete Lead Button */}
                                  <button 
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                                    title="Delete Lead Record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>

                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-5 text-[11px] text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>
                  The dashboard above lists lead submissions. Clicking <strong>Contact Client</strong> automatically prepares a dynamic WhatsApp API message incorporating the client's business name and selected service configuration for quick outreach.
                </span>
              </div>

            </div>
          )}

        </div>
      </footer>

      {/* 7-Second Lead Capture Popup Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-[#1A1A1A]/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white w-full max-w-md rounded-3xl border-2 border-[#D4AF37] overflow-hidden shadow-2xl relative text-[#1A1A1A] p-6 md:p-8"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {!modalIsSubmitted ? (
                <form onSubmit={handleModalFormSubmit} className="space-y-4 mt-2">
                  <div className="text-center pb-2">
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-[10px] font-bold uppercase py-1 px-3 rounded-full inline-flex items-center gap-1 mb-2.5">
                      <Sparkles className="w-3 h-3 text-[#D4AF37] fill-current" />
                      <span>Limited Special Launch Offer</span>
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                      🎉 Grab 60% Off Your Business Growth Bundle!
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Lock in our full suite of Posters, AI Videos, and Competitor Ads Research for just <strong className="text-slate-800 font-bold">₹10,000</strong> before the timer runs out!
                    </p>
                  </div>

                  {/* Urgency Counter inside the Popup */}
                  <div className="bg-[#1A1A1A] text-white p-2.5 rounded-xl border border-[#D4AF37]/30 text-center flex items-center justify-center gap-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Offer Expires In:</span>
                    <div className="flex gap-2 text-xs font-mono font-black text-[#D4AF37]">
                      <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                      <span>:</span>
                      <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                      <span>:</span>
                      <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {/* Full name field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Full Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={modalFullName}
                        onChange={(e) => setModalFullName(e.target.value)}
                        placeholder="e.g. Albin Joseph"
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#D4AF37] transition-all rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900 placeholder-slate-400 font-medium"
                      />
                    </div>

                    {/* WhatsApp number field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">WhatsApp Number <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+91</span>
                        <input
                          type="tel"
                          required
                          pattern="[6-9][0-9]{9}"
                          title="Please enter a valid 10-digit Indian mobile number starting with 6-9"
                          value={modalWhatsappNumber}
                          onChange={(e) => setModalWhatsappNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="8590181381"
                          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#D4AF37] transition-all rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none text-slate-900 font-semibold"
                        />
                      </div>
                    </div>

                    {/* Business Name field */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Business Name / Website <span className="text-slate-400 font-normal">(Optional)</span></label>
                      <input
                        type="text"
                        value={modalBusinessName}
                        onChange={(e) => setModalBusinessName(e.target.value)}
                        placeholder="e.g. My Clothing Brand"
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#D4AF37] transition-all rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-900 placeholder-slate-400 font-medium"
                      />
                    </div>
                  </div>

                  {modalSubmitError && (
                    <div className="text-xs text-rose-500 bg-rose-50 border border-rose-100 rounded-lg p-2.5 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{modalSubmitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={modalIsSubmitting}
                    className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold text-sm py-4 rounded-xl shadow-lg border border-[#D4AF37]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {modalIsSubmitting ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting Details...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit & Unlock 60% Discount</span>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-500 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      🎉 Special Offer Pricing Locked!
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed px-4">
                      Thank you <strong className="text-slate-800">{modalFullName}</strong>! Your 60% launch discount and details have been recorded successfully.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <p>🎁 <strong className="text-[#1A1A1A]">Package:</strong> Complete Growth Bundle (₹10,000)</p>
                    <p>💬 <strong className="text-[#1A1A1A]">WhatsApp Contact:</strong> +91 {modalWhatsappNumber}</p>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {/* Primary Green CTA Button */}
                    <a
                      href={getModalSelfWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-center text-sm cursor-pointer border-b-4 border-[#1E9E4F]"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Connect via WhatsApp Now</span>
                    </a>

                    {/* Secondary Close Button */}
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer border border-slate-200"
                    >
                      Close & Keep Browsing
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Immersive Lightbox Zoom Modal */}
      <AnimatePresence>
        {zoomedPosterUrl && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setZoomedPosterUrl(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setZoomedPosterUrl(null)}
                className="absolute -top-12 right-0 p-2 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full border border-slate-700 hover:text-[#D4AF37] transition-all cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 flex items-center justify-center p-2">
                <img 
                  src={zoomedPosterUrl} 
                  alt="Zoomed Poster Design"
                  className="max-w-full max-h-[75vh] object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom detail or helper text */}
              <p className="text-xs text-slate-400 font-medium text-center">
                💡 Tap anywhere outside the poster to exit full-screen view. All rights reserved by OXIXO.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Sticky WhatsApp Quick Chat Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <motion.a
          href="https://api.whatsapp.com/send?phone=918590181381&text=Hello%20OXIXO%20Team!%20I'd%20love%20to%20discuss%20growing%20my%20business%20with%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group transition-colors duration-300 border-2 border-white/20"
          title="Chat with OXIXO on WhatsApp"
        >
          {/* Subtle Radar/Pulsing Outer Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

          {/* WhatsApp Text Tooltip Slide Out */}
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-[#D4AF37]/30">
            Chat on WhatsApp 💬
          </span>

          <MessageSquare className="w-6 h-6 fill-current relative z-10" />
        </motion.a>
      </div>

    </div>
  );
}

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, UploadCloud, ArrowRight, Zap, Target, BookOpen, Clock, HeartHandshake, FileCheck } from 'lucide-react';
import { Logo } from '../components/Logo';

export function Company({ onOpenModal }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const pillars = [
    {
      title: 'Day-One Foundation',
      description: 'We build your core digital plumbing so you can focus entirely on scaling your business.',
      icon: <Building2 className="w-8 h-8 text-rubicule-red" />
    },
    {
      title: 'Cross-Domain Intelligence',
      description: 'Solutions designed with a generalist’s eye—merging technical logic with visual design and educational clarity.',
      icon: <BookOpen className="w-8 h-8 text-rubicule-red" />
    },
    {
      title: 'AI-Powered Leverage',
      description: 'Utilizing an advanced AI workflow to write, refine, and deploy code at unprecedented speeds.',
      icon: <Zap className="w-8 h-8 text-rubicule-red" />
    },
    {
      title: 'Frictionless Design',
      description: 'Interfaces built for declining attention spans, prioritizing speed, simplicity, and user patience.',
      icon: <Target className="w-8 h-8 text-rubicule-red" />
    },
    {
      title: 'Zero-Curve Adoption',
      description: 'Intuitive workflows that require minimal training, designed for the reality of fast-paced operations.',
      icon: <Clock className="w-8 h-8 text-rubicule-red" />
    },
    {
      title: 'Universal Accessibility',
      description: 'Bridging the digital literacy gap with tools equally powerful for the C-suite and effortless for frontline staff.',
      icon: <HeartHandshake className="w-8 h-8 text-rubicule-red" />
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-rubicule-gray selection:bg-rubicule-red selection:text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-rubicule-charcoal mb-6">
            The Digital Utility for <span className="text-rubicule-red">Modern Business</span>
          </h1>
        </motion.div>
      </div>

      {/* Section 1: About Rubicule */}
      <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32">
        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-xl border border-gray-100 mb-20">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg text-gray-600 max-w-none"
            >
              <div className="flex flex-col items-center justify-center mb-10">
                <Logo className="w-48 h-48 mb-6" />
                <span className="font-sans font-bold text-5xl tracking-tight text-rubicule-charcoal">RUBICULE</span>
              </div>
              
              <h3 className="text-2xl font-bold text-rubicule-charcoal mb-4">About Rubicule</h3>
              <p>
                At Rubicule, we view software not as a luxury or an afterthought, but as the fundamental utility of modern enterprise. Just as a physical facility cannot operate without electricity or plumbing, a modern business cannot scale without a seamless digital infrastructure. We exist to bridge that gap from day one. Our mission is to build the operational plumbing that keeps your business organized, automated, and informed from the ground up.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg text-gray-600 max-w-none"
            >
              <h3 className="text-2xl font-bold text-rubicule-charcoal mb-4">The Multidisciplinary Advantage</h3>
              <p>
                The future of problem-solving belongs to agile, multidisciplinary intelligence. The most effective technological solutions are not built in a vacuum; they require an understanding of user psychology, visual aesthetics, educational flow, and performance under pressure.
              </p>
              <p>
                Our architectural approach is informed by a diverse, cross-domain background—spanning graphic design, English education, curriculum development, and high-performance athletic coaching. This versatile, generalist mindset allows us to see the bigger picture, designing software that doesn't just function, but intuitively guides and empowers the user.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-rubicule-charcoal mb-4">Enterprise Rigor. Hyper-Agile Execution.</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Rubicule’s technical foundation is rooted in years of global corporate experience. Having served as technical consultants, full-stack developers, and project managers for multinational clients across the globe, we understand the exact structural integrity required for enterprise-grade solutions.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  Today, Rubicule operates as a highly leveraged, modern powerhouse. By fusing our deep engineering expertise with a robust fleet of cutting-edge AI models that handle the heavy lifting, we deliver the vast capabilities of a large-scale traditional agency, but with the unparalleled speed, precision, and agility of an elite task force.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-rubicule-charcoal mb-4">Product Design Philosophy: Engineered for Focus</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  In an era defined by shrinking attention spans and relentless digital noise, enterprise software cannot afford to be a cognitive burden. We recognize that patience is a finite resource in fast-paced operational environments.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  That is why our design philosophy is fiercely protective of the user’s time and focus. We engineer every platform prioritized entirely around ease of use, absolute simplicity, and intuitive friendliness, ensuring your team spends less time navigating clunky interfaces and more time executing their core tasks.
                </p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg text-gray-600 max-w-none pt-8 border-t border-gray-100"
            >
              <h3 className="text-2xl font-bold text-rubicule-charcoal mb-4">Universal Usability</h3>
              <p>
                A system is only as powerful as the people who can actually use it. We design with a deep empathy for the varying levels of digital literacy across an entire organization. From the frontline operational worker to the CEO in the boardroom, Rubicule’s interfaces are built to be universally accessible. By stripping away steep learning curves and unnecessary friction, we deliver sophisticated technology in a highly approachable package, empowering every single user to engage with our tools confidently from day one.
              </p>
            </motion.div>

          </div>
        </div>

        {/* Key Pillars */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-rubicule-charcoal">Key Pillars</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all hover:border-rubicule-red/20 group"
              >
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-rubicule-charcoal mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Careers */}
      <div id="careers" className="bg-white py-24 scroll-mt-20 border-y border-gray-100 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-rubicule-charcoal mb-6">Join the Force</h2>
            <p className="text-xl text-gray-600 mb-10">
              We are not currently hiring for any open positions. However, we are always open to connecting with talented, multidisciplinary individuals. Feel free to get in touch or drop your resume for future opportunities.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 max-w-xl mx-auto">
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
                <FileCheck className="w-10 h-10 text-rubicule-red" />
              </div>
              <h4 className="text-xl font-bold text-rubicule-charcoal mb-2">Drop your resume</h4>
              <p className="text-gray-500 mb-8">Send us your CV and portfolio. We'll reach out if a role opens up.</p>
              <button 
                onClick={onOpenModal}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-rubicule-charcoal hover:bg-gray-900 text-white font-bold transition-all flex items-center justify-center gap-3 mx-auto"
              >
                <UploadCloud className="w-5 h-5" />
                Upload Resume
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 3: Blog */}
      <div id="blog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-16 md:p-24 border border-gray-200 text-center relative overflow-hidden">
          
          {/* Animated Background Bits */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-16 h-16 rounded-full border border-gray-300 pointer-events-none"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-12 right-20 w-24 h-24 rounded-full border border-rubicule-red/20 pointer-events-none"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/4 right-1/4 w-8 h-8 bg-rubicule-red/10 rounded-full pointer-events-none"
          />
          <motion.div 
            animate={{ x: [0, 30, 0], opacity: [0.1, 0.4, 0.1] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gray-200 rounded-full pointer-events-none"
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-400 mb-4">Our Blog</h2>
            <div className="inline-block px-6 py-2 bg-white/50 backdrop-blur-md rounded-full border border-gray-200 text-rubicule-red font-bold tracking-wide uppercase text-sm mb-6">
              Coming Soon
            </div>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              Keep a watch out for this area. We'll be sharing insights on modern enterprise architecture, agile development, and multidisciplinary design soon.
            </p>
          </motion.div>
        </div>
      </div>

    </div>
  );
}

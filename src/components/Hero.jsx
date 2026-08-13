import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero_dashboard_ai.jpg';

export function Hero({ onOpenModal }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background abstract elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-rubicule-red to-rubicule-crimson blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-rubicule-red text-sm font-semibold mb-8 border border-red-100"
          >
            <Sparkles className="w-4 h-4" />
            <span>Next-Generation B2B Automation</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-rubicule-charcoal mb-8"
          >
            Intelligent Software for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rubicule-red to-rubicule-crimson">
              Scaling Businesses
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Bridge the gap between custom AI solutions and ready-to-deploy scalable products. We build the engine that drives your enterprise forward.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/architecture" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-rubicule-red hover:bg-rubicule-crimson text-white font-semibold text-lg transition-all shadow-[0_0_40px_-10px_rgba(237,28,36,0.5)] hover:shadow-[0_0_60px_-15px_rgba(237,28,36,0.7)] flex items-center justify-center gap-2 group">
              Custom AI & Integrations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/products" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-gray-50 text-rubicule-charcoal font-semibold text-lg transition-all border border-gray-200 shadow-sm flex items-center justify-center gap-2 group">
              Explore Product Suite
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-5xl mx-auto rounded-2xl p-2 bg-white/40 backdrop-blur-3xl border border-white/60 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent z-10 pointer-events-none rounded-2xl" />
          <img 
            src={heroImage} 
            alt="AI Dashboard showing neural network nodes intersecting with software UI" 
            className="w-full h-auto rounded-xl object-cover shadow-sm border border-gray-100/50"
          />
        </motion.div>
      </div>
    </section>
  );
}

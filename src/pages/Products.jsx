import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SiFedex, SiSap, SiShopify, SiStripe, SiRazorpay, SiZoho, SiGooglegemini, SiWhatsapp, SiSage } from 'react-icons/si';
import { FaSalesforce } from 'react-icons/fa';
import { GrOracle } from 'react-icons/gr';
import { TbBrandAmazon, TbBrandTwilio } from 'react-icons/tb';
import { RiClaudeFill, RiOpenaiFill } from 'react-icons/ri';

import erpImg from '../assets/products/erp_dashboard.jpg';
import crmImg from '../assets/products/crm_dashboard.jpg';
import hrmsImg from '../assets/products/hrms_dashboard.jpg';
import payrollImg from '../assets/products/payroll_dashboard.jpg';
import amsImg from '../assets/products/ams_dashboard.jpg';

const productsList = [
  {
    id: 'erp',
    title: 'Enterprise Resource Planning (ERP)',
    description: 'Designed for industrial sectors to maintain absolute control over the production pipeline.',
    features: [
      'Track complex inventories across warehouses',
      'Monitor end-to-end lead cycles',
      'Manage automated task queues',
      'Track assembly line elements & floor time'
    ],
    image: erpImg,
    reversed: false,
  },
  {
    id: 'crm',
    title: 'Customer Relationship Management (CRM)',
    description: 'A powerful engine to drive your sales and retain customer relationships at scale.',
    features: [
      'Design marketing campaigns & promotions',
      'Advanced lead generation funnels',
      'Omnichannel communication',
      'Real-time sales analytics'
    ],
    image: crmImg,
    reversed: true,
  },
  {
    id: 'hrms',
    title: 'Human Resource Management (HRMS)',
    description: 'Empower your workforce with modern tools that simplify daily HR operations.',
    features: [
      'Automated attendance tracking',
      'Leave application & approval workflows',
      'Performance metric evaluations',
      'Assign and track daily duties'
    ],
    image: hrmsImg,
    reversed: false,
  },
  {
    id: 'payroll',
    title: 'Payroll & Finance',
    description: 'Ensure accurate, timely, and compliant financial processing for your entire workforce.',
    features: [
      'Automated salary calculations & payouts',
      'Track employee advances & deductions',
      'Manage incentives and bonuses',
      'Comprehensive financial reporting'
    ],
    image: payrollImg,
    reversed: true,
  },
  {
    id: 'ams',
    title: 'Academy Management System (AMS)',
    description: 'A specialized hybrid CRM/ERP solution tailored perfectly for schools, colleges, and sports academies.',
    features: [
      'Manage student registrations & program tracking',
      'Detailed coach/trainer profiles with admin control',
      'Automate fee structures, invoices, and accounting',
      'Promotion campaigns & due invoice reminders via Twilio SMS',
      'Manage staff salaries and payouts from a unified dashboard'
    ],
    image: amsImg,
    reversed: false,
    isSpecial: true,
  }
];

export function Products({ onOpenModal }) {
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

  return (
    <div className="pt-32 pb-24 min-h-screen bg-rubicule-gray selection:bg-rubicule-red selection:text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-rubicule-charcoal mb-6">
            Explore the <span className="text-rubicule-red">Product Suite</span>
          </h1>
          <p className="text-xl text-gray-600">
            A deep dive into our powerful enterprise solutions. We build robust tools so you can focus on scaling your operations.
          </p>
        </motion.div>
      </div>
      
      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {productsList.map((product, index) => (
          <div 
            key={product.id} 
            id={product.id}
            className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center scroll-mt-32 ${product.reversed ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: product.reversed ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              {product.isSpecial && (
                <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-rubicule-red font-semibold text-sm mb-4 border border-red-100">
                  Hybrid Specialized Solution
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-rubicule-charcoal mb-4">
                {product.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {product.description}
              </p>
              
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-rubicule-red shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Image Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative rounded-[2rem] p-3 bg-white shadow-2xl border border-gray-100/80 group">
                {/* Decorative glow */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${product.isSpecial ? 'from-rubicule-red/20 to-purple-500/10' : 'from-gray-200 to-transparent'} rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <img 
                  src={product.image} 
                  alt={`${product.title} dashboard interface`}
                  className="w-full h-auto rounded-[1.5rem] object-cover shadow-inner relative z-10"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="border-t border-gray-200 pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-rubicule-charcoal mb-4">Seamless Integrations</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Integrate with the platforms you already use to achieve a complete, unified overview of your entire business operations.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <SiFedex className="w-16 h-16 hover:text-[#4d148c] transition-colors cursor-pointer" />
            <FaSalesforce className="w-16 h-16 hover:text-[#00a1e0] transition-colors cursor-pointer" />
            <RiOpenaiFill className="w-16 h-16 hover:text-black transition-colors cursor-pointer" />
            <SiSap className="w-16 h-16 hover:text-[#008fd3] transition-colors cursor-pointer" />
            <SiStripe className="w-16 h-16 hover:text-[#6772e5] transition-colors cursor-pointer" />
            <SiRazorpay className="w-16 h-16 hover:text-[#02042b] transition-colors cursor-pointer" />
            <SiZoho className="w-16 h-16 hover:text-[#d32f2f] transition-colors cursor-pointer" />
            
            <div className="font-bold text-2xl tracking-tighter hover:text-[#003366] transition-colors cursor-pointer flex items-center justify-center w-16 h-16">ServiceNow</div>
            
            <GrOracle className="w-16 h-16 hover:text-[#f80000] transition-colors cursor-pointer" />
            <SiGooglegemini className="w-16 h-16 hover:text-[#1a73e8] transition-colors cursor-pointer" />
            <SiSage className="w-16 h-16 hover:text-[#00d639] transition-colors cursor-pointer" />
            
            <div className="font-bold text-xl tracking-tight hover:text-[#f58220] transition-colors cursor-pointer flex items-center justify-center w-16 h-16">WheelsEye</div>
            
            <SiWhatsapp className="w-16 h-16 hover:text-[#25D366] transition-colors cursor-pointer" />
            <SiShopify className="w-16 h-16 hover:text-[#96bf48] transition-colors cursor-pointer" />
            <TbBrandAmazon className="w-16 h-16 hover:text-[#ff9900] transition-colors cursor-pointer" />
            <RiClaudeFill className="w-16 h-16 hover:text-[#d97757] transition-colors cursor-pointer" />
            <TbBrandTwilio className="w-16 h-16 hover:text-[#f22f46] transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

    </div>
  );
}

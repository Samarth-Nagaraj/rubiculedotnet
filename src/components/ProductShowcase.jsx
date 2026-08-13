import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ipadMockup from '../assets/ipad_software_mockup.jpg';

const products = [
  {
    id: 'erp',
    title: 'Enterprise Resource Planning',
    shortTitle: 'ERP',
    features: ['Real-time inventory tracking', 'Financial reporting & analytics', 'Supply chain automation'],
    description: 'A unified system designed to manage all your core business processes seamlessly. Gain complete visibility into your operations.',
  },
  {
    id: 'crm',
    title: 'Customer Relationship Management',
    shortTitle: 'CRM',
    features: ['Automated lead scoring', 'Sales pipeline visualization', 'Omnichannel support ticketing'],
    description: 'Build stronger customer relationships and drive sales growth with intelligent insights and automated follow-ups.',
  },
  {
    id: 'hrms',
    title: 'Human Resource Management',
    shortTitle: 'HRMS',
    features: ['Automated onboarding workflows', 'Performance review cycles', 'Employee self-service portal'],
    description: 'Empower your workforce with modern tools. Manage talent, track performance, and streamline HR operations effortlessly.',
  },
  {
    id: 'payroll',
    title: 'Payroll & Compliance',
    shortTitle: 'Payroll',
    features: ['Automated tax calculations', 'Multi-currency support', 'Direct deposit integrations'],
    description: 'Ensure accurate, timely, and compliant payroll processing for your entire global workforce with zero manual errors.',
  },
  {
    id: 'ams',
    title: 'Academy Management System',
    shortTitle: 'AMS',
    features: ['Manage student & member registrations', 'Automate fee structures & invoices', 'Twilio SMS promotions'],
    description: 'A specialized hybrid solution perfectly tailored for schools, colleges, and sports academies to manage programs and staff.',
  }
];

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(products[0].id);

  const activeProduct = products.find(p => p.id === activeTab);

  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-rubicule-charcoal mb-4"
          >
            Ready-to-Deploy Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Explore our modular product suite. Use them individually or connect them seamlessly.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Tabs & Content */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex flex-wrap gap-2">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setActiveTab(product.id)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    activeTab === product.id 
                      ? 'bg-rubicule-red text-white shadow-[0_0_20px_-5px_rgba(237,28,36,0.6)]' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {product.shortTitle}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 p-8 rounded-3xl border border-gray-100"
              >
                <Link to={`/products#${activeProduct.id}`} className="group inline-flex items-center gap-2 mb-4">
                  <h3 className="text-2xl font-bold text-rubicule-charcoal group-hover:text-rubicule-red transition-colors">
                    {activeProduct.title}
                  </h3>
                  <svg className="w-5 h-5 text-rubicule-red opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <p className="text-gray-600 mb-8">{activeProduct.description}</p>
                
                <ul className="space-y-4">
                  {activeProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-rubicule-red shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* iPad Mockup Display */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[2rem] p-4 bg-gray-100 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-rubicule-red/10 to-transparent rounded-[2rem]" />
              <img 
                src={ipadMockup} 
                alt={`${activeProduct.shortTitle} interface on iPad`}
                className="w-full h-auto rounded-[1.5rem] object-cover shadow-inner relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

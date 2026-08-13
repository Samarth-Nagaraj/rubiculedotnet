import { motion } from 'framer-motion';
import { Network, Blocks, Workflow, Cpu, Users, BarChart3, Receipt, Briefcase } from 'lucide-react';

const pillars = [
  {
    id: 'bespoke',
    title: 'Bespoke Automation & Integrations',
    description: 'We build end-to-end automated workflows with custom logic, AI, and complex API integrations tailored specifically for your enterprise architecture.',
    icon: Network,
    features: [
      { icon: Cpu, text: 'Custom AI Models' },
      { icon: Workflow, text: 'End-to-End Workflows' },
      { icon: Blocks, text: 'API Orchestration' },
    ],
    color: 'from-rubicule-red to-rubicule-crimson',
    bg: 'bg-white',
    text: 'text-rubicule-charcoal'
  },
  {
    id: 'products',
    title: 'Ready-to-Deploy Suite',
    description: 'Accelerate your growth with our robust ecosystem of scalable business products including ERP, CRM, HRMS, and Payroll solutions.',
    icon: Blocks,
    features: [
      { icon: Receipt, text: 'ERP & Payroll' },
      { icon: Users, text: 'CRM & Sales' },
      { icon: Briefcase, text: 'HRMS Solutions' },
    ],
    color: 'from-gray-800 to-gray-950',
    bg: 'bg-rubicule-charcoal',
    text: 'text-white'
  }
];

export function TwinPillars() {
  return (
    <section id="enterprise" className="py-24 bg-rubicule-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-rubicule-charcoal mb-4"
          >
            The Twin Pillars of Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Whether you need a custom-built AI automation engine or a ready-made enterprise suite, we have the exact tools for your success.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`rounded-3xl p-8 md:p-12 ${pillar.bg} ${pillar.text} shadow-xl border border-gray-100 relative overflow-hidden group`}
            >
              {/* Subtle background glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${pillar.color} opacity-5 blur-3xl rounded-full transition-opacity group-hover:opacity-10`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${pillar.color} shadow-lg`}>
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{pillar.title}</h3>
                <p className={`text-lg mb-8 ${pillar.id === 'products' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {pillar.description}
                </p>
                
                <div className="space-y-4">
                  {pillar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${pillar.id === 'products' ? 'bg-white/10' : 'bg-gray-50'}`}>
                        <feature.icon className={`w-5 h-5 ${pillar.id === 'products' ? 'text-white' : 'text-rubicule-red'}`} />
                      </div>
                      <span className="font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

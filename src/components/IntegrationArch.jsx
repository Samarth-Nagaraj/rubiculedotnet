import { motion } from 'framer-motion';
import { Database, Cloud, Server, Share2, Layers } from 'lucide-react';
import { SiGooglegemini, SiStripe, SiRazorpay, SiWhatsapp, SiZoho } from 'react-icons/si';
import { RiOpenaiFill } from 'react-icons/ri';
import { TbBrandTwilio } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export function IntegrationArch() {
  const nodes = [
    { icon: Database, label: "Legacy DBs", delay: 0 },
    { icon: Cloud, label: "Cloud APIs", delay: 0.2 },
    { icon: Server, label: "On-Prem Sys", delay: 0.4 },
    { icon: Layers, label: "3rd Party Apps", delay: 0.6 }
  ];

  const integrationLogos = [
    { icon: RiOpenaiFill, name: "OpenAI" },
    { icon: SiGooglegemini, name: "Gemini" },
    { icon: SiStripe, name: "Stripe" },
    { icon: SiRazorpay, name: "RazorPay" },
    { icon: SiWhatsapp, name: "WhatsApp" },
    { icon: TbBrandTwilio, name: "Twilio" },
    { icon: SiZoho, name: "Zoho & CRMs" },
  ];

  return (
    <section id="integrations" className="py-24 bg-rubicule-charcoal relative overflow-hidden">
      {/* Dark background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-rubicule-charcoal to-rubicule-charcoal" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Seamless <span className="text-rubicule-red">Integrations</span> & Agentic Models
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 mb-6"
            >
              We don't just provide software; we architect the data pipelines that connect your entire business. Using intelligent AI nodes, we route, process, and automate data flow across every department using an advanced <strong>agentic model of automated solutions</strong>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-md text-gray-400 mb-8"
            >
              We integrate natively with Claude, OpenAI, Gemini, third-party APIs, payment gateways (RazorPay, Stripe), communication platforms (WhatsApp, Twilio), Zoho, and other major CRMs.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 items-center mb-8 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50"
            >
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider w-full mb-2">Supported Technologies</span>
              {integrationLogos.map((logo, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <logo.icon className="w-7 h-7 text-gray-400 group-hover:text-rubicule-red transition-colors" />
                  <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute mt-8">{logo.name}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <span className="text-gray-400 font-bold text-lg group-hover:text-rubicule-red transition-colors">...</span>
                <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity absolute mt-8">And More</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <Link to="/architecture" className="px-6 py-3 rounded-xl bg-rubicule-red hover:bg-rubicule-crimson text-white font-medium transition-colors shadow-[0_0_20px_-5px_rgba(237,28,36,0.6)]">
                View Architecture Docs
              </Link>
            </motion.div>
          </div>

          {/* Visual Architecture Diagram */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Center Node (Rubicule AI Engine) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute z-20 w-32 h-32 bg-gradient-to-br from-rubicule-red to-rubicule-crimson rounded-2xl shadow-[0_0_60px_-10px_rgba(237,28,36,0.8)] flex items-center justify-center"
            >
              <Share2 className="w-12 h-12 text-white" />
              <div className="absolute -bottom-8 text-white font-bold tracking-widest text-sm text-center">AI ENGINE</div>
            </motion.div>

            {/* Orbiting Nodes */}
            {nodes.map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + node.delay }}
                className="absolute z-10"
                style={{
                  transform: `rotate(${i * 90}deg) translateX(160px) rotate(-${i * 90}deg)`
                }}
              >
                {/* Glowing connection lines */}
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -z-10 w-40 h-[2px] bg-gradient-to-r from-rubicule-red to-transparent origin-left opacity-60" style={{ transform: `rotate(${180}deg)` }}>
                  <motion.div 
                    animate={{ x: [-160, 0], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: node.delay }}
                    className="w-10 h-full bg-white blur-[2px]"
                  />
                </div>

                <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-xl shadow-lg flex items-center justify-center relative backdrop-blur-md">
                  <node.icon className="w-6 h-6 text-gray-300" />
                  <div className="absolute -bottom-6 w-max text-gray-400 text-xs font-medium">{node.label}</div>
                </div>
              </motion.div>
            ))}
            
            {/* Background decorative rings */}
            <div className="absolute w-[320px] h-[320px] border border-gray-700/50 rounded-full" />
            <div className="absolute w-[450px] h-[450px] border border-gray-700/30 rounded-full border-dashed" />
          </div>

        </div>
      </div>
    </section>
  );
}

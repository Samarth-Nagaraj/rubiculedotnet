import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Network, Server, Workflow, 
  Search, BrainCircuit
} from 'lucide-react';

export function Architecture() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-rubicule-gray selection:bg-rubicule-red selection:text-white overflow-hidden">
      {/* 1. Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-rubicule-charcoal mb-4 leading-tight">
                Custom AI & <span className="text-rubicule-red">Integrations</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-500">
                Bridging the AI "Last Mile"
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Most off-the-shelf artificial intelligence tools and generic integrations look incredible in a controlled demo, but they fall apart the moment they touch complex, real-world enterprise data. This is the "last mile" gap. 
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Rubicule, we know that true digital transformation cannot be bought in a box. It must be engineered for your specific reality. We utilize a Forward Deployed Engineering (FDE) model. Instead of writing code from a distance based on abstract, theoretical requirements, we embed our technical expertise directly into your business environment. We bridge the gap between what advanced technology can do and what your business actually needs it to do, turning AI potential into measurable operational value.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square w-full max-w-lg mx-auto"
          >
            {/* 3D Abstract Graphic Placeholder */}
            <div className="absolute inset-0 bg-white/50 backdrop-blur-2xl border border-gray-200 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] flex items-center justify-center">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-[0.15]" 
                style={{ backgroundImage: 'radial-gradient(#1F2937 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} 
              />
              {/* Geometric Shapes */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-72 h-72 border-[16px] border-rubicule-red/10 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute w-56 h-56 border-4 border-rubicule-red/20 rounded-full"
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-36 h-36 bg-gradient-to-tr from-rubicule-red to-[#b30e14] rounded-2xl opacity-95 shadow-2xl shadow-rubicule-red/40 flex items-center justify-center"
                >
                  <Network className="w-16 h-16 text-white opacity-90" />
                </motion.div>
                
                {/* Floating Nodes */}
                <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[20%] left-[20%] w-5 h-5 bg-rubicule-charcoal rounded-full shadow-lg" />
                <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-[25%] right-[20%] w-8 h-8 bg-rubicule-red rounded-full shadow-lg shadow-rubicule-red/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. The Embedded Advantage (Bento Box Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-rubicule-charcoal mb-6">The Embedded Advantage</h2>
          <p className="text-xl text-gray-600">
            Every business has unique legacy systems, operational bottlenecks, and workflow constraints. Our custom software is built to adapt to you, not the other way around.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Context Before Code",
              desc: "You cannot fix what you do not understand. We start by learning how your teams actually operate, mapping your workflows and identifying the friction points that slow your business down.",
              icon: <Search className="w-8 h-8 text-rubicule-red" />,
              delay: 0.1
            },
            {
              title: "Bespoke Architecture",
              desc: "We translate ambiguous business challenges into custom AI workflows, designing solutions that reflect your real-world environment rather than forcing a one-size-fits-all product onto your team.",
              icon: <Workflow className="w-8 h-8 text-rubicule-red" />,
              delay: 0.2
            },
            {
              title: "Production-Ready Deployment",
              desc: "We ensure our integrations and custom applications hold up flawlessly under real, high-stakes operational conditions.",
              icon: <Server className="w-8 h-8 text-rubicule-red" />,
              delay: 0.3
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: card.delay }}
              className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-rubicule-red/30 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rubicule-red/0 to-transparent group-hover:via-rubicule-red/50 transition-all duration-500" />
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-rubicule-charcoal mb-4">{card.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed flex-grow">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. The Blueprint for Measurable Value (Premium Timeline) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-40">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <h2 className="text-3xl md:text-5xl font-bold text-rubicule-charcoal">Our Blueprint for Measurable Value</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Glowing Track (Desktop: Horizontal, Mobile: Vertical) */}
          <div className="absolute top-8 lg:top-1/2 left-8 lg:left-0 lg:w-full w-2 lg:h-2 h-full bg-gray-200/50 lg:-translate-y-1/2 rounded-full overflow-hidden shadow-inner">
            <motion.div 
               initial={{ height: 0, width: 0 }}
               whileInView={{ height: '100%', width: '100%' }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="bg-gradient-to-b lg:bg-gradient-to-r from-rubicule-red/20 via-rubicule-red to-rubicule-red/20 w-full h-full shadow-[0_0_15px_rgba(237,28,36,0.5)]"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {[
              {
                step: "01",
                title: "Deep Dive & Discovery",
                desc: "We review your existing systems and spend time understanding the pain points of your frontline workers and executives alike."
              },
              {
                step: "02",
                title: "Rapid Prototyping",
                desc: "We build and validate early versions quickly, so the value becomes visible in days or weeks, rather than waiting months for a bloated deployment cycle."
              },
              {
                step: "03",
                title: "Seamless Integration",
                desc: "Whether it involves configuring data pipelines or connecting modern AI to legacy ERPs, we make the technology fit smoothly into your current infrastructure."
              },
              {
                step: "04",
                title: "Team Empowerment",
                desc: "A solution only creates value when people can use it confidently. Drawing on our deep background in curriculum design and education, we ensure the adoption process is frictionless and grounded in your team's actual daily tasks."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15 }}
                className="relative pl-24 lg:pl-0 group"
              >
                {/* Node */}
                <div className="absolute left-0 lg:left-1/2 top-0 lg:-top-20 lg:-translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10">
                  {/* Outer Glass Ring */}
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full border border-white/80 shadow-lg group-hover:border-rubicule-red/50 transition-colors duration-500" />
                  {/* Glowing Center */}
                  <div className="w-6 h-6 bg-rubicule-red rounded-full shadow-[0_0_15px_rgba(237,28,36,0.6)] group-hover:scale-125 transition-transform duration-500 animate-pulse" />
                </div>
                
                {/* Content Card */}
                <div className="lg:mt-12 relative h-full">
                  {/* Large Watermark Number */}
                  <div className="absolute -top-8 -left-4 lg:left-1/2 lg:-translate-x-1/2 text-[100px] leading-none font-black text-gray-200/50 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:text-rubicule-red/10">
                    {item.step}
                  </div>
                  
                  <div className="relative z-10 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-xl group-hover:shadow-2xl group-hover:border-rubicule-red/20 transition-all duration-300 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-rubicule-charcoal mb-4 group-hover:text-rubicule-red transition-colors duration-300 relative z-10">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm relative z-10 flex-grow">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. The Rubicule Task Force (Bottom Section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden border border-gray-800 shadow-2xl">
          
          {/* Glowing API Node Background Element */}
          <div className="absolute -right-32 -bottom-32 w-[600px] h-[600px] bg-rubicule-red/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden lg:block scale-150 translate-x-1/4">
            <BrainCircuit className="w-[800px] h-[800px] text-white" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rubicule-red/10 border border-rubicule-red/20 text-rubicule-red font-bold text-sm tracking-wide uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-rubicule-red animate-pulse" />
              Forward Deployed Engineering
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">The Rubicule Task Force</h2>
            
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Traditional software implementation relies on massive, slow-moving consulting teams. Rubicule operates as a highly leveraged, multidisciplinary powerhouse. 
              </p>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Fusing deep corporate engineering rigor with a robust fleet of advanced AI models, we operate with the speed and precision of an elite task force. We don't just write production-grade code; we design intuitive user interfaces and architect seamless workflows, bringing a generalist’s broad vision to hyper-specific technical problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

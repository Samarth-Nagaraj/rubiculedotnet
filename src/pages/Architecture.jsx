import React from 'react';
import { motion } from 'framer-motion';

export function Architecture() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-rubicule-charcoal relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-rubicule-charcoal to-rubicule-charcoal" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Architecture <span className="text-rubicule-red">Documentation</span>
          </h1>
          <p className="text-xl text-gray-400">
            Discover the agentic model of automated solutions running inside our intelligent AI engine.
          </p>
        </motion.div>
        
        {/* Placeholder content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-xl p-12 rounded-[2rem] border border-gray-800 shadow-2xl min-h-[400px] flex items-center justify-center"
        >
          <p className="text-gray-500 font-medium text-lg">System Architecture Diagrams & API Docs Loading...</p>
        </motion.div>
      </div>
    </div>
  );
}

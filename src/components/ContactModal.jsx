import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar } from 'lucide-react';

export function ContactModal({ isOpen, onClose }) {
  const [step, setStep] = useState('initial'); // 'initial', 'form', 'calendar'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-rubicule-charcoal">
                  Let's Build Together
                </h2>
                <button 
                  onClick={onClose}
                  className="p-2 bg-white rounded-full text-gray-400 hover:text-rubicule-red hover:bg-red-50 transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-8">
                {step === 'initial' && (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-6 text-center">How would you like to proceed?</p>
                    <button 
                      onClick={() => setStep('form')}
                      className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-rubicule-red/30 hover:bg-red-50 transition-all flex items-center gap-4 group text-left"
                    >
                      <div className="bg-rubicule-red/10 p-3 rounded-lg group-hover:bg-rubicule-red transition-colors">
                        <Send className="w-6 h-6 text-rubicule-red group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-rubicule-charcoal text-lg">Send us a message</h4>
                        <p className="text-sm text-gray-500">Briefly describe your needs and we'll reply shortly.</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setStep('calendar')}
                      className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-rubicule-red/30 hover:bg-red-50 transition-all flex items-center gap-4 group text-left"
                    >
                      <div className="bg-rubicule-red/10 p-3 rounded-lg group-hover:bg-rubicule-red transition-colors">
                        <Calendar className="w-6 h-6 text-rubicule-red group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-rubicule-charcoal text-lg">Book a Demo</h4>
                        <p className="text-sm text-gray-500">Schedule a direct call with our product experts.</p>
                      </div>
                    </button>
                  </div>
                )}

                {step === 'form' && (
                  <form className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rubicule-red focus:ring-2 focus:ring-rubicule-red/20 outline-none transition-all" placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
                      <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rubicule-red focus:ring-2 focus:ring-rubicule-red/20 outline-none transition-all resize-none" placeholder="Tell us about your automation or software needs..."></textarea>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep('initial')} className="px-6 py-3 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Back</button>
                      <button type="button" className="flex-1 bg-rubicule-red hover:bg-rubicule-crimson text-white rounded-lg font-semibold transition-colors">Submit Request</button>
                    </div>
                  </form>
                )}

                {step === 'calendar' && (
                  <div className="text-center animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 mx-auto flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-rubicule-charcoal text-lg mb-2">Calendar Integration</h4>
                      <p className="text-gray-500 text-sm">Here we would embed a Calendly widget or redirect to a booking page.</p>
                    </div>
                    <button type="button" onClick={() => setStep('initial')} className="px-6 py-2 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Go Back</button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

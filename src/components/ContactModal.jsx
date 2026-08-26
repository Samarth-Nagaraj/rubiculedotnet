import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar, CheckCircle2, Loader2, UploadCloud } from 'lucide-react';

export function ContactModal({ isOpen, onClose, initialStep = 'initial' }) {
  const [step, setStep] = useState('initial'); // 'initial', 'form', 'resume', 'calendar', 'submitting', 'success', 'error'
  const [submitType, setSubmitType] = useState('contact'); // 'contact' or 'resume'
  const [formData, setFormData] = useState({ name: '', email: '', message: '', linkedin: '', portfolio: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setFormData({ name: '', email: '', message: '', linkedin: '', portfolio: '' });
      setErrorMessage('');
      setSubmitType(initialStep === 'resume' ? 'resume' : 'contact');
    }
  }, [isOpen, initialStep]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('initial');
      setFormData({ name: '', email: '', message: '', linkedin: '', portfolio: '' });
      setErrorMessage('');
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (submitType === 'contact' && (!formData.email || !formData.message)) return;
    if (submitType === 'resume' && (!formData.name || !formData.email || !formData.linkedin)) return;

    setStep('submitting');
    
    const endpoint = submitType === 'resume' ? '/api/resume' : '/api/contact';
    const body = submitType === 'resume' 
      ? { name: formData.name, email: formData.email, linkedin: formData.linkedin, portfolio: formData.portfolio }
      : { email: formData.email, message: formData.message };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (!res.ok) {
        let errorMsg = `Server Error (${res.status})`;
        try {
          const result = await res.json();
          errorMsg = result.error || errorMsg;
        } catch (e) {
          // Keep default
        }
        setStep('error');
        setErrorMessage(errorMsg);
        return;
      }

      setStep('success');
    } catch (err) {
      setStep('error');
      setErrorMessage('Network error. Please check your connection.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]"
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
                <h2 className="text-xl font-bold text-rubicule-charcoal">
                  {submitType === 'resume' ? 'Join the Force' : "Let's Build Together"}
                </h2>
                <button 
                  onClick={handleClose}
                  className="p-2 bg-white rounded-full text-gray-400 hover:text-rubicule-red hover:bg-red-50 transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                {step === 'initial' && (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-6 text-center">How would you like to proceed?</p>
                    <button 
                      onClick={() => { setStep('form'); setSubmitType('contact'); }}
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
                      onClick={() => { setStep('resume'); setSubmitType('resume'); }}
                      className="w-full p-4 rounded-xl border-2 border-gray-100 hover:border-rubicule-red/30 hover:bg-red-50 transition-all flex items-center gap-4 group text-left"
                    >
                      <div className="bg-rubicule-red/10 p-3 rounded-lg group-hover:bg-rubicule-red transition-colors">
                        <UploadCloud className="w-6 h-6 text-rubicule-red group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-rubicule-charcoal text-lg">Submit Resume</h4>
                        <p className="text-sm text-gray-500">Apply to join our multidisciplinary team.</p>
                      </div>
                    </button>
                  </div>
                )}

                {(step === 'form' || (submitType === 'contact' && (step === 'submitting' || step === 'error'))) && (
                  <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={step === 'submitting'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rubicule-red focus:ring-2 focus:ring-rubicule-red/20 outline-none transition-all disabled:opacity-50" 
                        placeholder="you@company.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
                      <textarea 
                        rows="4" 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        disabled={step === 'submitting'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rubicule-red focus:ring-2 focus:ring-rubicule-red/20 outline-none transition-all resize-none disabled:opacity-50" 
                        placeholder="Tell us about your automation or software needs..."
                      ></textarea>
                    </div>
                    
                    {step === 'error' && (
                      <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-lg">{errorMessage}</p>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button type="button" disabled={step === 'submitting'} onClick={() => setStep('initial')} className="px-6 py-3 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50">Back</button>
                      <button type="submit" disabled={step === 'submitting'} className="flex-1 bg-rubicule-red hover:bg-rubicule-crimson text-white rounded-lg font-semibold transition-colors disabled:opacity-70 flex justify-center items-center gap-2">
                        {step === 'submitting' ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                        ) : 'Submit Request'}
                      </button>
                    </div>
                  </form>
                )}
                
                {(step === 'resume' || (submitType === 'resume' && (step === 'submitting' || step === 'error'))) && (
                  <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={step === 'submitting'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rubicule-red focus:ring-2 focus:ring-rubicule-red/20 outline-none transition-all disabled:opacity-50" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={step === 'submitting'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rubicule-red focus:ring-2 focus:ring-rubicule-red/20 outline-none transition-all disabled:opacity-50" 
                        placeholder="you@email.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                      <input 
                        type="url" 
                        required
                        value={formData.linkedin}
                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        disabled={step === 'submitting'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rubicule-red focus:ring-2 focus:ring-rubicule-red/20 outline-none transition-all disabled:opacity-50" 
                        placeholder="https://linkedin.com/in/..." 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio / Personal Site (Optional)</label>
                      <input 
                        type="url" 
                        value={formData.portfolio}
                        onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                        disabled={step === 'submitting'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rubicule-red focus:ring-2 focus:ring-rubicule-red/20 outline-none transition-all disabled:opacity-50" 
                        placeholder="https://..." 
                      />
                    </div>
                    
                    {step === 'error' && (
                      <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-lg">{errorMessage}</p>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button type="button" disabled={step === 'submitting'} onClick={() => setStep('initial')} className="px-6 py-3 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50">Back</button>
                      <button type="submit" disabled={step === 'submitting'} className="flex-1 bg-rubicule-red hover:bg-rubicule-crimson text-white rounded-lg font-semibold transition-colors disabled:opacity-70 flex justify-center items-center gap-2">
                        {step === 'submitting' ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                        ) : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                )}

                {step === 'success' && (
                  <div className="text-center animate-in fade-in zoom-in duration-300 space-y-4 py-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-rubicule-charcoal">
                      {submitType === 'resume' ? 'Application Received!' : 'Message Received!'}
                    </h3>
                    <p className="text-gray-500">
                      {submitType === 'resume' 
                        ? "Thank you for applying. We'll review your profile and reach out if there's a fit." 
                        : "Thank you for reaching out. Our team will get back to you shortly."}
                    </p>
                    <button 
                      onClick={handleClose}
                      className="mt-6 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      Close
                    </button>
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

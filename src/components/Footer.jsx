import { Logo } from './Logo';
import { ArrowRight, MessageCircle, Share2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer({ onOpenModal }) {
  return (
    <footer className="bg-gray-950 pt-24 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pre-footer CTA */}
        <div className="bg-gradient-to-br from-rubicule-charcoal to-gray-900 rounded-3xl p-10 md:p-16 mb-20 border border-gray-800 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rubicule-red opacity-10 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to scale your enterprise?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Join the forward-thinking companies that rely on Rubicule for intelligent automation and powerful enterprise suites.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => onOpenModal()} className="px-8 py-4 rounded-xl bg-rubicule-red hover:bg-rubicule-crimson text-white font-semibold text-lg transition-colors">
              Talk to an Expert
            </button>
            {/* <button onClick={() => onOpenModal()} className="px-8 py-4 rounded-xl bg-transparent hover:bg-gray-800 text-white font-semibold text-lg transition-colors border border-gray-700">
              Request a Demo
            </button> */}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="w-8 h-8" />
              <span className="font-sans font-bold text-xl tracking-tight text-white">RUBICULE</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-sm">
              Intelligent software solutions bridging custom AI integrations with robust ready-to-deploy products.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              <li><Link to="/products#erp" className="text-gray-400 hover:text-rubicule-red transition-colors text-sm">ERP Software</Link></li>
              <li><Link to="/products#crm" className="text-gray-400 hover:text-rubicule-red transition-colors text-sm">CRM Platform</Link></li>
              <li><Link to="/products#hrms" className="text-gray-400 hover:text-rubicule-red transition-colors text-sm">HRMS Solutions</Link></li>
              <li><Link to="/products#payroll" className="text-gray-400 hover:text-rubicule-red transition-colors text-sm">Payroll Systems</Link></li>
              <li><Link to="/products#ams" className="text-gray-400 hover:text-rubicule-red transition-colors text-sm">Academy Management System</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/company#about" className="text-gray-400 hover:text-rubicule-red transition-colors text-sm">About Us</Link></li>
              <li><Link to="/company#careers" className="text-gray-400 hover:text-rubicule-red transition-colors text-sm">Careers</Link></li>
              <li><Link to="/company#blog" className="text-gray-400 hover:text-rubicule-red transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest tech and features.</p>
            <div className="flex gap-2">
              <div className="bg-gray-900 border border-gray-800 text-gray-500 rounded-lg px-4 py-2 w-full italic">
                Stay tuned...
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 Rubicule. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ onOpenModal }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="font-sans font-bold text-2xl tracking-tight text-rubicule-charcoal">RUBICULE</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#enterprise" className="text-sm font-medium text-gray-600 hover:text-rubicule-red transition-colors">Custom Enterprise</a>
            <Link to="/products" className="text-sm font-medium text-gray-600 hover:text-rubicule-red transition-colors">Products</Link>
            <Link to="/company" className="text-sm font-medium text-gray-600 hover:text-rubicule-red transition-colors">Company</Link>
            <Link to="/architecture" className="text-sm font-medium text-gray-600 hover:text-rubicule-red transition-colors">Integrations</Link>
            <button onClick={onOpenModal} className="bg-rubicule-charcoal hover:bg-rubicule-red text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
              Contact Us
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <a href="/#enterprise" className="block text-base font-medium text-gray-600" onClick={() => setIsOpen(false)}>Custom Enterprise</a>
            <Link to="/products" className="block text-base font-medium text-gray-600" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/company" className="block text-base font-medium text-gray-600" onClick={() => setIsOpen(false)}>Company</Link>
            <Link to="/architecture" className="block text-base font-medium text-gray-600" onClick={() => setIsOpen(false)}>Integrations</Link>
            <button onClick={() => { setIsOpen(false); onOpenModal(); }} className="w-full text-left bg-rubicule-red text-white px-4 py-2.5 rounded-lg font-medium">
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

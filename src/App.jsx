import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Architecture } from './pages/Architecture';
import { Company } from './pages/Company';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('initial');

  const openModal = (step = 'initial') => {
    setModalStep(step);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-rubicule-gray selection:bg-rubicule-red selection:text-white overflow-x-hidden">
        <Navbar onOpenModal={openModal} />
        <Routes>
          <Route path="/" element={<Home onOpenModal={openModal} />} />
          <Route path="/products" element={<Products onOpenModal={openModal} />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/company" element={<Company onOpenModal={openModal} />} />
        </Routes>
        <Footer onOpenModal={openModal} />
        
        <ContactModal isOpen={isModalOpen} onClose={closeModal} initialStep={modalStep} />
      </div>
    </Router>
  );
}

export default App;

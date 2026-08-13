import React from 'react';
import { Hero } from '../components/Hero';
import { TwinPillars } from '../components/TwinPillars';
import { ProductShowcase } from '../components/ProductShowcase';
import { IntegrationArch } from '../components/IntegrationArch';

export function Home({ onOpenModal }) {
  return (
    <main>
      <Hero onOpenModal={onOpenModal} />
      <TwinPillars />
      <ProductShowcase />
      <IntegrationArch />
    </main>
  );
}

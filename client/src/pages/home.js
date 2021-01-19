import React from 'react';
import About from '../components/about/About';
import { Faqs } from '../components/accordion/Accordion';
import Discover from '../components/discover/Discover';
import Hero from '../components/hero/Hero';
import Services from '../components/services/Services';


export default function Home() {
  return (
    <>
      <Hero />
      <About/>
      <Discover/>
      <Services/>
      <Faqs/>
    
    </>
  );
}

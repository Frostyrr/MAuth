import React from 'react';
import Navbar from '../components/ui/Navbar';
import Hero from '../sections/Hero';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar rendered exclusively on Home page */}
      <Navbar />

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col justify-center">
        <Hero />
      </main>
    </div>
  );
};

export default Home;
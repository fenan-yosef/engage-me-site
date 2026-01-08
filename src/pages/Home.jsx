import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import FloatingButtons from '../components/FloatingButtons';
import '../styles/home.css';

function Home() {
  return (
    <main className="home">
      <h1>Welcome to EngageMe</h1>
      <ImageCarousel />
      <FloatingButtons />
    </main>
  );
}

export default Home;

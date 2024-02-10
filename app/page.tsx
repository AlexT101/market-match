'use client';

import "../styles/index.css";
import Arrow from '../components/Arrow';
import Stock from '../components/Stock';

export default function Home() {
  const swipeLeft = () => {
    console.log("swipe left");
  }
  const swipeRight = () => {
    console.log("swipe right");
  }

  return (
    <main className="container">
      <Arrow name="left" onClick={swipeLeft}/>
      <Stock/>
      <Arrow name="right" onClick={swipeRight}/>
    </main>
  );
}

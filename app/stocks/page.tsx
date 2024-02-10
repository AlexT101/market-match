'use client';

import "styles/index.css";
import Arrow from 'components/Arrow';
import Stock from 'components/Stock';
import History from 'components/History';
import Generate from 'components/Generate';

import { getStock } from 'utils/Utils';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window != undefined) {
      document.onkeydown = arrowChecker;
    }
  }, []);

  function arrowChecker(e: any) {
    e = e || window.event;
    if (e.keyCode == '37') {
      swipeLeft();
      var element = document.getElementById("left");
      element?.classList.remove("lighten");
      setTimeout(() => {
        element?.classList.add("lighten");
      }, 0);
    }
    else if (e.keyCode == '39') {
      swipeRight();
      var element = document.getElementById("right");
      element?.classList.remove("lighten");
      setTimeout(() => {
        element?.classList.add("lighten");
      }, 0);
    }
  }

  const swipeLeft = () => {
    var element = document.getElementById("stock");
    element?.classList.remove("tiltLeft");
    element?.classList.remove("tiltRight");
    setTimeout(() => {
      element?.classList.add("tiltLeft");
    }, 0);
    console.log("swipe left");
    getStock();
  }

  const swipeRight = () => {
    var element = document.getElementById("stock");
    element?.classList.remove("tiltLeft");
    element?.classList.remove("tiltRight");
    setTimeout(() => {
      element?.classList.add("tiltRight");
    }, 0);
    console.log("swipe right");
    getStock();
  }

  return (
    <main className="container">
      <div className="desktopArrows">
        <Arrow name="left" onClick={swipeLeft} />
      </div>
      <Stock />
      <div className="desktopArrows">
        <Arrow name="right" onClick={swipeRight} />
      </div>
      <div className="mobileArrows">
        <Arrow name="left" onClick={swipeLeft} />
        <Arrow name="right" onClick={swipeRight} />
      </div>
      <History />
      <Generate />
    </main>
  );
}

'use client';

import "styles/index.css";
import Arrow from 'components/Arrow';
import Stock from 'components/Stock';
import History from 'components/History';
import Generate from 'components/Generate';

import { getStock } from 'utils/Utils';
import { useEffect } from 'react';
import { useStore } from 'utils/Data';

export default function Home() {
  const { currentStock, setCurrentStock, addStock, clearStocks, stocks } = useStore();

  async function fetchNewStock() {
    const stock = await getStock("");
      await setCurrentStock(stock);
  }

  async function loadStock() {
    const cur = await currentStock;
    if (cur == null || cur.ticker == "") {
      fetchNewStock();
    } else {
      setCurrentStock(cur);
    }
    console.log(cur);
  }


  useEffect(() => {
    if (typeof window != undefined) {
      document.onkeydown = arrowChecker;
    }
    loadStock();
  }, []);

  function arrowChecker(e: any) {
    e = e || window.event;
    if (e.keyCode == '37') {
      swipeLeft();
      fetchNewStock();
      var element = document.getElementById("left");
      element?.classList.remove("lighten");
      setTimeout(() => {
        element?.classList.add("lighten");
      }, 0);
    }
    else if (e.keyCode == '39') {
      swipeRight();
      fetchNewStock();
      var element = document.getElementById("right");
      element?.classList.remove("lighten");
      setTimeout(() => {
        element?.classList.add("lighten");
      }, 0);
    }
  }

  const swipeLeft = () => {
    if (!stocks.find((stock) => stock.ticker == currentStock.ticker)) {
      currentStock.swipe = "left";
      currentStock.time = new Date();
      addStock(currentStock);
    }
    var element = document.getElementById("stock");
    element?.classList.remove("tiltLeft");
    element?.classList.remove("tiltRight");
    setTimeout(() => {
      element?.classList.add("tiltLeft");
    }, 0);
    console.log("swipe left");
  }

  const swipeRight = () => {
    if (!stocks.find((stock) => stock.ticker == currentStock.ticker)) {
      currentStock.swipe = "right";
      currentStock.time = new Date();
      addStock(currentStock);
    }
    var element = document.getElementById("stock");
    element?.classList.remove("tiltLeft");
    element?.classList.remove("tiltRight");
    setTimeout(() => {
      element?.classList.add("tiltRight");
    }, 0);
    console.log("swipe right");
  }

  return (
    <main className="container">
      <div className="desktopArrows">
        <Arrow name="left" onClick={swipeLeft} />
      </div>
      <Stock name={currentStock.name_data} ticker={currentStock.ticker} description={currentStock.description_data} sector={currentStock.sector_data} marketcap={currentStock.marketcap_data} pe={currentStock.pe_data} volume={currentStock.consolidatedvolume_data} open={currentStock.marketOpen_data} close={currentStock.previousClose_data} size={currentStock.size_data} graph={currentStock.graph_data} intraday={currentStock.intraday_data}/>
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

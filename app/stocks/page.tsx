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
  const { currentStock, setCurrentStock, addStock, clearCurrentStock, clearStocks, stocks } = useStore();

  useEffect(() => {
    console.log(currentStock);
    console.log(currentStock.ticker);
  }, []);

  async function fetchFirstStock() {
    const stock = await getStock("", false);
    await setCurrentStock(stock);
  }

  async function fetchNewStock(swipe: boolean) {
    const ticker = await currentStock.ticker;
    clearCurrentStock();
    const stock = await getStock(ticker, swipe);
    await setCurrentStock(stock);
  }

  async function loadStock() {
    const cur = await currentStock;
    if (cur == null || cur.ticker == "") {
      fetchFirstStock();
    } else {
      setCurrentStock(cur);
    }
  }

  useEffect(() => {
    loadStock();
  }, [])


  useEffect(() => {
    if (typeof window != undefined) {
      document.onkeydown = arrowChecker;
    }
  }, [currentStock]);

  function arrowChecker(e: any) {
    e = e || window.event;
    if (currentStock.ticker != null && currentStock.ticker != "") {
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
  }

  async function swipeLeft() {
    if (!stocks.find((stock) => stock.ticker == currentStock.ticker)) {
      currentStock.swipe = "left";
      currentStock.time = new Date();
      addStock(currentStock);
      fetchNewStock(false);
    }
    var element = document.getElementById("stock");
    element?.classList.remove("tiltLeft");
    element?.classList.remove("tiltRight");
    setTimeout(() => {
      element?.classList.add("tiltLeft");
    }, 0);
  }

  async function swipeRight() {
    if (!stocks.find((stock) => stock.ticker == currentStock.ticker)) {
      currentStock.swipe = "right";
      currentStock.time = new Date();
      addStock(currentStock);
      fetchNewStock(true);
    }
    var element = document.getElementById("stock");
    element?.classList.remove("tiltLeft");
    element?.classList.remove("tiltRight");
    setTimeout(() => {
      element?.classList.add("tiltRight");
    }, 0);
  }

  return (
    <main className="container">
      <div className="desktopArrows">
        <Arrow name="left" onClick={swipeLeft} disabled={currentStock.ticker == "" || currentStock.ticker == null} />
      </div>
      <Stock name={currentStock.name_data} ticker={currentStock.ticker} description={currentStock.description_data} sector={currentStock.sector_data} marketcap={currentStock.marketcap_data} pe={currentStock.pe_data} volume={currentStock.consolidatedvolume_data} open={currentStock.marketOpen_data} close={currentStock.previousClose_data} size={currentStock.size_data} graph={currentStock.graph_data} intraday={currentStock.intraday_data} />
      <div className="desktopArrows">
        <Arrow name="right" onClick={swipeRight} disabled={currentStock.ticker == "" || currentStock.ticker == null} />
      </div>
      <div className="mobileArrows">
        <Arrow name="left" onClick={swipeLeft} disabled={currentStock.ticker == "" || currentStock.ticker == null} />
        <Arrow name="right" onClick={swipeRight} disabled={currentStock.ticker == "" || currentStock.ticker == null} />
      </div>
      <History />
      <Generate />
    </main>
  );
}

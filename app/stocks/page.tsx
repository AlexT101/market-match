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

  //Function to get the very first stock
  async function fetchFirstStock() {
    const stock = await getStock("", false);
    await setCurrentStock(stock);
  }

  //Function to get a new stock based on the swipe result of the previous
  async function fetchNewStock(swipe: boolean) {
    const ticker = await currentStock.ticker;
    clearCurrentStock();
    const stock = await getStock(ticker, swipe);
    await setCurrentStock(stock);
  }

  //Load the first stock
  async function loadStock() {
    const cur = await currentStock;
    if (cur == null || cur.ticker == "") {
      fetchFirstStock();
    }
  }
  useEffect(() => {
    loadStock();
  }, [])


  //Event listener for left and right arrow keys to be used as swipes
  useEffect(() => {
    if (typeof window != undefined) {
      document.onkeydown = arrowChecker;
    }
  }, [currentStock]);

  //Function to check if the left or right arrow keys are pressed
  function arrowChecker(e: any) {
    e = e || window.event;

    //Make sure current stock isn't empty
    if (currentStock.ticker != null && currentStock.ticker != "") {

      //Get left key press
      if (e.keyCode == '37') {
        swipeLeft();

        //Animate left button
        var element = document.getElementById("left");
        element?.classList.remove("lighten");
        setTimeout(() => {
          element?.classList.add("lighten");
        }, 0);
      }

      //Get right key press
      else if (e.keyCode == '39') {
        swipeRight();

        //Animate right button
        var element = document.getElementById("right");
        element?.classList.remove("lighten");
        setTimeout(() => {
          element?.classList.add("lighten");
        }, 0);
      }
    }
  }

  //Reject current stock
  async function swipeLeft() {
    if (!stocks.find((stock) => stock.ticker == currentStock.ticker)) {
      currentStock.swipe = "left";
      currentStock.time = new Date();
      addStock(currentStock);
      fetchNewStock(false);
    }

    //Tilt stock left
    var element = document.getElementById("stock");
    element?.classList.remove("tiltLeft");
    element?.classList.remove("tiltRight");
    setTimeout(() => {
      element?.classList.add("tiltLeft");
    }, 0);
  }

  //Accept current stock
  async function swipeRight() {
    if (!stocks.find((stock) => stock.ticker == currentStock.ticker)) {
      currentStock.swipe = "right";
      currentStock.time = new Date();
      addStock(currentStock);
      fetchNewStock(true);
    }

    //Tilt right
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
      <Stock name={currentStock.name_data} ticker={currentStock.ticker} description={currentStock.description_data} sector={currentStock.sector_data} marketcap={currentStock.marketcap_data} pe={currentStock.pe_data} volume={currentStock.consolidatedvolume_data} open={currentStock.marketOpen_data} close={currentStock.previousClose_data} size={currentStock.size_data} graph={currentStock.graph_data} intraday={currentStock.intraday_data} sentiment={currentStock.sentiment}/>
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

import '../styles/index.css';
import { ScrollArea } from '@mantine/core';

import HistoryCard from '../components/HistoryCard';
import { useStore } from 'utils/Data';
import { useState, useEffect } from 'react';
import { parseStocks } from 'utils/Utils';

const History = () => {
    const { stocks } = useStore();

    //Load displayable stocks
    const [simpleStock, setSimpleStock] = useState<any>([]);
    
    async function loadSimpleStocks(){
        const simpleStock = (await parseStocks(stocks));
        await setSimpleStock(simpleStock);
    }

    useEffect(()=>{
        loadSimpleStocks();
    },[stocks]);

    return (
        <ScrollArea className={"historyScroll" + ((simpleStock.length > 1) ? " fade" : "")}>
            <div className="historyContainer">
                {simpleStock.map((item:any) => (
                    <HistoryCard key={item.ticker} name={item.name} time={item.time} price={"$" + item.price} direction={item.swipe} />
                ))}
            </div>
        </ScrollArea>
    )
}

export default History;
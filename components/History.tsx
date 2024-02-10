import '../styles/index.css';
import { ScrollArea } from '@mantine/core';

import HistoryCard from '../components/HistoryCard';

const data = [
    {
        name: "Alphabet, Inc",
        time: "12:05PM",
        price: "$120.65",
        direction: "left",
    },
    {
        name: "Meta",
        time: "12:05PM",
        price: "$60.32",
        direction: "right",
    },
    {
        name: "Apple, Inc",
        time: "12:05PM",
        price: "$302.50",
        direction: "left",
    },
    {
        name: "Alphabet, Inc",
        time: "12:05PM",
        price: "$120.65",
        direction: "left",
    },
    {
        name: "Meta",
        time: "12:05PM",
        price: "$60.32",
        direction: "right",
    },
    {
        name: "Apple, Inc",
        time: "12:05PM",
        price: "$302.50",
        direction: "left",
    },
    {
        name: "Alphabet, Inc",
        time: "12:05PM",
        price: "$120.65",
        direction: "left",
    },
    {
        name: "Meta",
        time: "12:05PM",
        price: "$60.32",
        direction: "right",
    },
    {
        name: "Apple, Inc",
        time: "12:05PM",
        price: "$302.50",
        direction: "left",
    },

];

const History = () => {
    return (
        <ScrollArea className={"historyScroll" + ((data.length > 1) ? " fade" : "")}>
            <div className="historyContainer">
                {data.map((item, index) => (
                    <HistoryCard key={index} name={item.name} time={item.time} price={item.price} direction={item.direction} />
                ))}
            </div>
        </ScrollArea>
    )
}

export default History;
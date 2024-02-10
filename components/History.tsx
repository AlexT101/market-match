import '../styles/index.css';
import { Text } from '@mantine/core';

import HistoryCard from '../components/HistoryCard';

const History = () => {
    return (
        <div className="historyContainer">
            <HistoryCard name="Alphabet, Inc" time="12:05PM" price="$120.65" direction="left"/>
            <HistoryCard name="Meta" time="12:02PM" price="$60.37" direction="right"/>
            <HistoryCard name="Target" time="12:00PM" price="125.20" direction="left"/>

        </div>
    )
}

export default History;
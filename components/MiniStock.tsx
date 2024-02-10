import '../styles/index.css';
import { Text } from '@mantine/core';
import { Sparkline } from '@mantine/charts';

interface MiniStockProps {
    name: string,
    ticker: string,
    data: number[]
}

const MiniStock = ({name, ticker, data} : MiniStockProps) => {
    return (
        <div className="miniStock">
            <div className="miniStockStack">
                <Text size="sm" c="dimmed">{ticker}</Text>
                <Text>{name}</Text>
            </div>
            <Sparkline
                w={120}
                h={60}
                data={data}
                curveType="linear"
                color="indigo.6"
                fillOpacity={0.7}
                strokeWidth={2}
            />
        </div>
    );
}

export default MiniStock;
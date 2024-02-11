import '../styles/index.css';
import { Text } from '@mantine/core';
import { Sparkline } from '@mantine/charts';

interface MiniStockProps {
    name: string,
    ticker: string,
    data: number[],
    amount: string,
}

const MiniStock = ({name, ticker, data, amount} : MiniStockProps) => {
    return (
        <div className="miniStock">
            <div className="miniStockStack">
                <Text size="md" c="dimmed">{ticker + (amount == "" ? "" : " - $" + amount)}</Text>
                <Text size="lg">{name}</Text>
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
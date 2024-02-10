import '../styles/index.css';
import { Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';


interface HistoryCardProps {
    name: string,
    time: string,
    price: string,
    direction: string;
}

const HistoryCard = ({ name, time, price, direction }: HistoryCardProps) => {
    return (
        <div className={"historyCard " + direction}>
            <div className="historyIcon">
                {direction == "left" ?
                    <IconChevronLeft size={24} />
                    :
                    <IconChevronRight size={24} />
                }
            </div>
            <div className="historyTextStack">
                <Text size="md">{name}</Text>
                <Text size="sm" c="dimmed">{time}</Text>
            </div>
            <Text className="historyPrice" size="md">{price}</Text>
        </div>
    )
}

export default HistoryCard;
import '../styles/index.css';
import { Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';


interface HistoryCardProps {
    name: string,
    time: Date,
    price: string,
    direction: string;
}

const getTime = (date: Date) => {
    return (date.getHours() % 12) + ":" + date.getMinutes() + " " + (date.getHours() > 12 ? "PM" : "AM");
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
                <Text size="sm" c="dimmed">{getTime(time)}</Text>
            </div>
            <Text className="historyPrice" size="md">{price}</Text>
        </div>
    )
}

export default HistoryCard;
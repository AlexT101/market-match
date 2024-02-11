import '../styles/index.css';
import { Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';


interface HistoryCardProps {
    name: string,
    time: Date,
    price: string,
    direction: string;
}

//Format the time correctly given date
const getTime = (date: Date) => {
    let hours = (String) (date.getHours() % 12 + 12);
    let minutes = (String) (date.getMinutes());
    if (hours.length == 1) hours = "0" + hours;
    if (minutes.length == 1) minutes = "0" + minutes;
    return hours + ":" + minutes + " " + (date.getHours() > 12 ? "PM" : "AM");
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
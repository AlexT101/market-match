import '../styles/index.css';
import { Card, Text, Badge, Button, Group, Tabs } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { useState } from 'react';
import { IconChartHistogram, IconInfoCircle } from '@tabler/icons-react';


const name = "Alphabet Inc.";
const ticker = "GOOG";
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const data = [
    {
        date: 'Mar 22',
        Price: 2890,
    },
    {
        date: 'Mar 23',
        Price: 2756,
    },
    {
        date: 'Mar 24',
        Price: 3322,
    },
    {
        date: 'Mar 25',
        Price: 3470,
    },
    {
        date: 'Mar 26',
        Price: 3129,
    },
];

const Stock = () => {
    const [dayRange, setDayRange] = useState<string | null>('first');
    const [opened, setOpened] = useState(false);

    return (
        <Card id="stock" className="stock" shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
                <Text fw={800} size="lg">{name}</Text>
                <Badge color="indigo.6" size="lg">{ticker}</Badge>
            </Group>
            <Text size="sm" c="dimmed">$150.22&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Tech Sector</Text>
            <Card.Section>
                {opened ? (
                    <Group className="stockSection data">
                        <Text>
                            Breakdown
                        </Text>
                        <Text size="sm" c="dimmed">
                            Previous Close: 147.22<br />
                            Open: 147.95<br />
                            Bid: 150.10 x 1000<br />
                            Ask: 150.18 x 900<br />
                            Market Cap (intraday): 1.858T<br />
                            Volume: 21,822,453<br/>
                            PE Ratio: 25.90<br/>
                            1y Target Est: 161.00
                        </Text>
                    </Group>
                ) : (
                    <Group className="stockSection chart">
                        <div className="stockChartTabs">
                            <Text size="xs" c="dimmed">RANGE</Text>
                            <Tabs value={dayRange} onChange={setDayRange}>
                                <Tabs.List>
                                    <Tabs.Tab value="first" color="indigo.6">1D</Tabs.Tab>
                                    <Tabs.Tab value="second" color="indigo.6">5D</Tabs.Tab>
                                    <Tabs.Tab value="third" color="indigo.6">1M</Tabs.Tab>
                                    <Tabs.Tab value="fourth" color="indigo.6">3M</Tabs.Tab>
                                </Tabs.List>
                            </Tabs>
                        </div>
                        <AreaChart
                            h={200}
                            data={data}
                            dataKey="date"
                            series={[
                                { name: 'Price', color: 'indigo.6' },
                            ]}
                            curveType="linear"
                        />
                    </Group>
                )}
            </Card.Section>
            <Button className="toggle" onClick={() => { setOpened(!opened) }}>
                {opened ? (
                    <IconChartHistogram size={18} />
                ) : (
                    <IconInfoCircle size={22} />
                )}
            </Button>

            <Text size="sm" c="dimmed">
                {description}
            </Text>

            <Button color="indigo.6" fullWidth mt="md" radius="md" component="a" href={"https://finance.yahoo.com/quote/"+ticker} target="_blank" rel="noopener noreferrer">
                Yahoo Finance Page
            </Button>
        </Card>
    )
}

export default Stock;
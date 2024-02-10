import '../styles/index.css';
import { Card, Text, Badge, Button, Group, Tabs } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { useState } from 'react';

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

    return (
        <Card className="stock" shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
                <Text fw={800} size="lg">Alphabet Inc.</Text>
                <Badge color="indigo.6" size="lg">GOOG</Badge>
            </Group>
            <Text size="sm" c="dimmed">$150.22&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Tech Sector</Text>
            <Card.Section>
                <Group className="stockChart">
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
            </Card.Section>

            <Text size="sm" c="dimmed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>

            <Button color="indigo.6" fullWidth mt="md" radius="md">
                More About This Stock
            </Button>
        </Card>
    )
}

export default Stock;
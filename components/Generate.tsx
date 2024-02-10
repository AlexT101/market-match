import '../styles/index.css';
import { Card, Text, Button, Select } from '@mantine/core';

const Generate = () => {
    return (
        <Card className="box generate" shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={800} size="lg">Stock Report</Text>
            <Text size="sm" c="dimmed">Your personalized stock portfolio, based on your preferences and swipes.</Text>
            <div className="stockCount">
                <Select data={['5', '10', '15']} placeholder="Select " radius="md" className="stockCountLimiter" />
                <Text size="sm" className="stockCountLimiter">Stocks Total</Text>

            </div>
            <Button color="indigo.6" fullWidth mt="md" radius="md" component="a" href="/report">
                Generate Your Report
            </Button>
        </Card>
    )
}

export default Generate;
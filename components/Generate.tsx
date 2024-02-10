import '../styles/index.css';
import { Text, Button, Select, Group } from '@mantine/core';

const Generate = () => {
    return (
        <div className="generateBox">
            <Text><b>Stock Report</b></Text>
            <Text size="sm" c="dimmed">Your personalized stock portfolio, based on your preferences and swipes.</Text>
            <div className="stockCount">
                <Select data={['5', '10', '15']} placeholder="Select " radius="md" className="stockCountLimiter"/>
                <Text size="sm" className="stockCountLimiter">Stocks Total</Text>

            </div>
            <Button color="indigo.6" fullWidth mt="md" radius="md">
                Generate Your Report
            </Button>
        </div>
    )
}

export default Generate;
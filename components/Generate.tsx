import '../styles/index.css';
import { Card, Text, Button, Select } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useStore } from 'utils/Data';
import { useForm } from '@mantine/form';

const Generate = () => {
    const { results, setResults } = useStore();

    const form = useForm({
        initialValues: {
            count: '5'
        }
    });

    useEffect(() => {  
        setResults(parseInt(form.values.count));
    }, [form.values.count]);

    return (
        <Card className="box generate" shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={800} size="xl" className="boxTitle">Stock Report</Text>
            <Text size="md" c="dimmed">Your personalized stock portfolio, based on your swipes.</Text>
            <div className="stockCount">
                <Select data={['5', '10', '15']} defaultValue="5" placeholder="Select " radius="md" size="md" className="stockCountLimiter" {...form.getInputProps('count')} />
                <Text size="md" className="stockCountLimiter">Stocks Total</Text>

            </div>
            <Button color="indigo.6" fullWidth mt="md" radius="md" size="md" component="a" href="/report">
                Generate Your Report
            </Button>
        </Card>
    )
}

export default Generate;
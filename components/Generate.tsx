import '../styles/index.css';
import { Card, Text, Button, Select } from '@mantine/core';
import { useEffect } from 'react';
import { useStore } from 'utils/Data';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';

const Generate = () => {
    const router = useRouter();
    const { setResults, setInvestment } = useStore();

    //Form values for generate type
    const form = useForm({
        initialValues: {
            count: '25',
            invest: '$500'
        }
    });

    //Update store based on form submit
    useEffect(() => {
        setResults(parseInt(form.values.count));
        setInvestment(form.values.invest);
    }, [form.values]);

    return (
        <Card className="box generate" shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={800} size="xl" className="boxTitle">Stock Report</Text>
            <Text size="md" c="dimmed">Your personalized stock portfolio, based on your swipes.</Text>
            <div className="stockCount">
                <Select data={['10', '25', '50', '100']} defaultValue="25" placeholder="Select " radius="md" size="md" className="stockCountLimiter" {...form.getInputProps('count')} />
                <Text size="md" className="stockCountLimiter">Stocks Total</Text>
            </div>
            <div className="stockCount">
                <Select data={['$500', '$1000', '$2000', '$5000']} defaultValue="$500" placeholder="Amount" radius="md" size="md" className="stockCountLimiter" {...form.getInputProps('invest')} />

                <Text size="md">Investment</Text>
            </div>
            <Button color="indigo.6" fullWidth mt="md" radius="md" size="md" component="a" href="/report" onClick={(event) => {
                event.preventDefault();
                router.push("/report");
            }}>
                Generate Your Report
            </Button>
        </Card>
    )
}

export default Generate;
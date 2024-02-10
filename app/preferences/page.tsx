'use client';

import 'styles/index.css';
import { Card, Text, TextInput, Select, MultiSelect, Checkbox, Button, Overlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

const Preferences = () => {

    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
        initialValues: {
            sector: [],
            risk: [],
            age: [],
            size: [],
            dividends: false
        }
    });

    const submitPreferences = () => {
        setSubmitted(true);
        console.log(form.values);
    }

    return (
        <main className="preferenceContainer">
            <Card className="preferenceBox" shadow="sm" padding="xl" radius="md" withBorder>
                <Text fw={800} size="xl">Preferences</Text>
                <Text size="md" c="dimmed">This data will be used to generate a list of stocks tailored to your preferences.</Text>
                <MultiSelect size="md" data={['Energy', 'Materials', 'Industrials', 'Utilities', 'Healthcare', 'Financials', 'Consumer Discretionary', 'Consumer Staples', 'Information Technology', 'Communication Services', 'Real Estate']} className="fullWidth" label="Sector" placeholder="Select" radius="md"  {...form.getInputProps('sector')} />
                <MultiSelect size="md" data={['Low Risk', 'Medium Risk', 'High Risk']} className="fullWidth" label="Risk Level" placeholder="Select" radius="md"  {...form.getInputProps('risk')} />
                <MultiSelect size="md" data={['0-5 Years', '6-10 Years', '10-20 Years', '21+ Years']} className="fullWidth" label="Company Age" placeholder="Select" radius="md"  {...form.getInputProps('age')} />
                <MultiSelect size="md" data={['Small', 'Medium', 'Large']} className="fullWidth" label="Company Age" placeholder="Select" radius="md"  {...form.getInputProps('size')} />
                <Checkbox size="md" mt="sm" color="indigo.6" label="Limit to companies with dividends" {...form.getInputProps('dividends')} />
                <Button size="md" fullWidth color="indigo.6" mt="lg" radius="md" onClick={submitPreferences}>Submit Preferences</Button>
                {submitted &&
                    <Overlay color="rgb(36, 36, 36)" backgroundOpacity={0.90} className="preferencesOverlay">
                        <Text size="xl" c="white">Preferences Submitted!</Text>
                        <Button size="md" fullWidth color="indigo.6" mt="lg" radius="md" component="a" href="/">
                            Go To Home
                        </Button>
                    </Overlay>
                }
            </Card>
        </main>
    )
}

export default Preferences;
'use client';

import 'styles/index.css';
import { Card, Text, MultiSelect, Select, Button, Overlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useStore } from '../utils/Data';
import { sendPreferences } from '../utils/Utils';
import Icon from '../public/icon.svg';

const Preferences = () => {

    const { preferences, setPreferences } = useStore();

    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
        initialValues: {
            sector: [],
            risk: "",
            age: "",
            size: "",
        }
    });

    const submitPreferences = () => {
        setSubmitted(true);
        setPreferences(form.values);
        sendPreferences(form.values);
    }

    return (
        <main className="preferenceContainer">
            <div className="backgroundGradient"> 
            <img className="appIcon" src={Icon.src} width={48} height={48}/>
            <Text className="backgroundTitle">MarketMatch</Text>
            <Text className="backgroundSubtitle">Input your preferences, swipe left or right on some of the market's most popular investments, and get a curated list of stocks to research with our online web dashboard.</Text>
            </div>
            <Card className="preferenceBox" shadow="sm" padding="xl" radius="md" withBorder>
                <Text fw={800} size="xl">Preferences</Text>
                <Text size="md" c="dimmed">This data will be used to generate a list of S&P 500 stocks tailored to your preferences using machine learning matchmaking algorithms and recent stock market data.</Text>
                <MultiSelect size="md" data={['Manufacturing', 'Information', 'Utilities', 'Finance and Insurance', 'Administrative and Support and Waste Management and Remediation Services', 'Retail Trade', 'Transportation and Warehousing', 'Mining, Quarrying, and Oil and Gas Extraction', 'Professional, Scientific, and Technical Services', 'Accommodation and Food Services', 'Real Estate and Rental and Leasing', 'Wholesale Trade', 'Public Administration', 'Health Care and Social Assistance', 'Construction', 'Other Services (except Public Administration)']} className="fullWidth" label="Sector" placeholder="Select" radius="md"  {...form.getInputProps('sector')} />
                <Select size="md" data={['Low Risk (Conservative)', 'Medium Risk (Mix)', 'High Risk (Growth']} className="fullWidth" label="Risk Level" placeholder="Select" radius="md"  {...form.getInputProps('risk')} />
                <Select size="md" data={['Any', '5+ Years', '10+ Years', '20+ Years']} className="fullWidth" label="Company Age" placeholder="Select" radius="md"  {...form.getInputProps('age')} />
                <Select size="md" data={['Small', 'Medium', 'Large']} className="fullWidth" label="Company Size" placeholder="Select" radius="md"  {...form.getInputProps('size')} />
                <Button size="md" fullWidth color="indigo.6" mt="lg" radius="md" onClick={submitPreferences}>Submit Preferences</Button>
                {submitted &&
                    <Overlay color="rgb(36, 36, 36)" backgroundOpacity={0.90} className="preferencesOverlay">
                        <Text size="xl" c="white">Preferences Submitted!</Text>
                        <Button size="md" fullWidth color="indigo.6" mt="lg" radius="md" component="a" href="/stocks">
                            Go To Home
                        </Button>
                    </Overlay>
                }
            </Card>
        </main>
    )
}

export default Preferences;
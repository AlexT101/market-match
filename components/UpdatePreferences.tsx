import '../styles/index.css';
import { Card, Text, Button, Select } from '@mantine/core';

const UpdatePreferences = () => {
    return (
        <Card className="box updatePreferences" shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={800} size="xl" className="boxTitle">Update Preferences</Text>
            <Text size="md" c="dimmed">Change your preferences and get a new list of stocks to review.</Text>
            <Button color="indigo.6" fullWidth mt="md" radius="md" size="md" component="a" href="/">
                Go to Preferences
            </Button>
        </Card>
    )
}

export default UpdatePreferences;
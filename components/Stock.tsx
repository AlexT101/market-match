import '../styles/index.css';
import { Card, Text, Badge, Button, Group, Tabs, Textarea, ScrollArea, HoverCard, LoadingOverlay } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { useState } from 'react';
import { IconChartHistogram, IconInfoCircle, IconMessage } from '@tabler/icons-react';
import { getDataPoints, getBounds } from '../utils/Utils';

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

const possiblePrompts = [
    "Does this stock pay dividends?",
    "When was this company founded?",
    "What is the company's market cap?",
    "Who is the CEO of this company?",
    "Is this company in the S&P 500?",
    "What is the current price of this stock?",
    "Has the stock price increased or decreased in the past year?",
    "What is the dividend yield of this stock?",
    "What was the company's last reported earnings per share?",
    "Is this stock part of any major stock index like the S&P 500?",
    "What is the market capitalization of this company?",
    "What sector or industry does this company operate in?",
    "What are the possible risks associated with investing in this stock?",
    "What products or services does this company offer?",
    "Has the company been involved in any recent mergers or acquisitions?",
    "Does this company operate in any foreign markets?",
    "Does this company have any notable competitors?",
    "What are some similar stocks?",
    "What is the company's revenue?",
];

const getPrompt = () => {
    return possiblePrompts[Math.floor(Math.random() * possiblePrompts.length)];
}

interface StockProps {
    name: string,
    ticker: string,
    description: string,
    sector: string,
    marketcap: string,
    pe: string,
    volume: string,
    open: string,
    close: string,
    size: string,
    graph: any,
    intraday: any
}

const Stock = ({ name, ticker, description, sector, marketcap, pe, volume, open, close, size, graph, intraday }: StockProps) => {

    const getRange:any = () => {
        if (graph == null){
            return [];
        }
        if (dayRange == "first"){
            return getDataPoints(intraday);
        }else if (dayRange == "second"){
            return getDataPoints(graph.six_month).slice(0, 5);
        }else if (dayRange == "third"){
            return getDataPoints(graph.six_month).slice(0, 20);
        }else if (dayRange == "fourth"){
            return getDataPoints(graph.six_month).slice(0, 60);
        }
    }

    const [dayRange, setDayRange] = useState<string | null>('first'); //Day range of the graph
    const [opened, setOpened] = useState(0); //Which info section is opened (graph, info, ai)
    const [showAnswer, setShowAnswer] = useState(false); //Whether to display the question or answer for the ai section
    const [prompt, setPrompt] = useState(getPrompt()); //Example user prompt in the text area
    const [question, setQuestion] = useState(""); //User question for ai
    const [answer, setAnswer] = useState(""); //Ai answer to user question

    //Either exit out of the answer box or send the question
    const sendQuestion = () => {
        if (showAnswer) {
            setPrompt(getPrompt());
            setShowAnswer(false);
        } else {
            console.log(question);
            setAnswer(question);
            setQuestion("");
            setShowAnswer(true);
        }
    }

    return (
        <Card id="stock" className="stock" shadow="sm" padding="lg" radius="md" withBorder>
            <LoadingOverlay visible={name == null || name == ""} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{color:"indigo.6"}}/>
            <Group justify="space-between">
                <Text fw={800} size="xl">{name}</Text>
                <Badge color="indigo.6" size="xl">{ticker}</Badge>
            </Group>
            <Text size="md" c="dimmed">{open}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{sector} Sector</Text>
            <Card.Section>
                {opened == 0 ? (
                    <Group className="stockSection chart">
                        <div className="stockChartTabs">
                            <Text size="sm" c="dimmed">RANGE</Text>
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
                            data={getRange()}
                            withDots={false}
                            yAxisProps={{ domain: [graph != null ? getBounds(getRange())[0] * 0.99 : 0, graph != null ? getBounds(getRange())[1] * 1.01 : 400] }}
                            dataKey="date"
                            series={[
                                { name: 'Price', color: 'indigo.6' },
                            ]}
                            curveType="linear"
                            valueFormatter={((value: number) => "$"+(Math.round(value*100)/100).toString())}
                        />
                    </Group>
                ) : opened == 1 ? (
                    <Group className="stockSection data">
                        <Text>
                            Breakdown
                        </Text>
                        <Text size="sm" c="dimmed">
                            Name: {name}<br />
                            Ticker: {ticker}<br />
                            Marketcap: {marketcap}<br />
                            PE Ratio: {pe}<br />
                            Consolidated Volume: {volume}<br />
                            Market Open: {open}<br />
                            Previous Close: {close}<br />
                            Size: {size}<br />
                            Sector: {sector}
                        </Text>
                    </Group>
                ) : (
                    <Group className="stockSection ai">
                        <div className="aiHeader">
                            <Text>Consult with AI</Text>
                            <HoverCard width={280} shadow="md" position="right">
                                <HoverCard.Target>
                                    <IconInfoCircle size={18} />
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <Text size="sm">
                                        Our AI uses the GPT 4.0 model to answer any questions you might have about a stock. The AI cannot provide financial advice and any responses it returns should not be interpreted as financial advice.
                                    </Text>
                                </HoverCard.Dropdown>
                            </HoverCard>

                        </div>
                        <Text size="sm" c="dimmed">Ask a question about this stock...</Text>
                        {showAnswer ? (
                            <ScrollArea h={123} className="answerArea">
                                <Text size="sm" c="dimmed"><span className="stockAI">StockAI: </span>{answer}</Text>
                            </ScrollArea>
                        ) : (
                            <Textarea
                                placeholder={prompt}
                                className="textArea"
                                autosize
                                minRows={5}
                                maxRows={5}
                                value={question}
                                onChange={(event) => setQuestion(event.currentTarget.value)}
                            />
                        )}

                        <Button color="indigo.6" fullWidth mt="md" radius="md" onClick={sendQuestion} disabled={!showAnswer && (question == null || question.trim() == "")}>
                            {showAnswer ? "Ask Another Question" : "Send Question"}
                        </Button>
                    </Group>
                )}
            </Card.Section>
            <div className="buttonRow">
                <Button className="toggle" onClick={() => { setOpened(0) }}>
                    <IconChartHistogram size={18} />
                </Button>
                <Button className="toggle" onClick={() => { setOpened(1) }}>
                    <IconInfoCircle size={22} />
                </Button>
                <Button className="toggle" onClick={() => { setOpened(2) }}>
                    <IconMessage size={22} />
                </Button>
            </div>

            <ScrollArea h={150}>
                <Text size="md">
                    {description == null || description == "" ? "We are currently trying to load a stock recommendation based on your preferences." : description}
                </Text>
            </ScrollArea>

            <Button size="md" color="indigo.6" fullWidth mt="md" radius="md" component="a" href={"https://finance.yahoo.com/quote/" + ticker} target="_blank" rel="noopener noreferrer">
                Yahoo Finance Page
            </Button>
        </Card>
    )
}

export default Stock;
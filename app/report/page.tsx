'use client';

import 'styles/index.css';
import MiniStock from 'components/MiniStock';
import { Text, Button } from '@mantine/core';
import writeXlsxFile from 'write-excel-file';
import { useStore } from 'utils/Data';
import { useState, useEffect } from 'react';
import { parseStocks, getAmounts } from 'utils/Utils';

//Schema for exporting .xlsx file
interface StockType {
    name: string,
    ticker: string,
    data: number[]
}

const schema = [
    {
        column: 'Ticker',
        type: String,
        value: (val: StockType) => val.ticker,
        width: 10
    },
    {
        column: 'Name',
        type: String,
        value: (val: StockType) => val.name,
        width: 42
    }
]

const Report = () => {
    const { stocks, results, investment, preferences } = useStore();
    const [simpleStock, setSimpleStock] = useState<any>([]);
    const [amounts, setAmounts] = useState<any>({});


    //Load data from store
    async function loadAmounts(){
        setAmounts(await getAmounts(Math.min(results, simpleStock.length), preferences.risk));
    }
    useEffect(() => {
        loadAmounts();
    }, [simpleStock]);

    async function loadSimpleStocks(){
        const simpleStock = (await parseStocks(stocks)).filter((val) => val.swipe == "right");
        await setSimpleStock(simpleStock);
    }
    useEffect(()=>{
        loadSimpleStocks();
    },[stocks]);

    //Function to export report and .xlsx file
    const exportReport = async () => {
        await writeXlsxFile(simpleStock, {
            schema,
            fileName: 'stockReport.xlsx'
        });
    }

    return (
        <main className="reportPage">
            <Text className="reportTitle"><b>Your Stock Report</b></Text>
            <Text size="lg" c="dimmed">Based on your preferences and swipes, we generated a list of stocks you might be interested in.*</Text>
            <div className="reportButtonRow">
            <Button size="md" color="indigo.6" mt="md" radius="md" mb="xl" onClick={exportReport}>
                Download (.xlsx)
            </Button>
            <Button size="md" color="indigo.6" mt="md" radius="md" component="a" href="/" mb="xl">
                Return to Home
            </Button>
            </div>
            <div className="report">
                {simpleStock.length > 0 ? (simpleStock.slice(0, results).map((stock:any, index:number) => (
                    <MiniStock key={index} name={stock.name} ticker={stock.ticker} data={stock.graph} amount={(String)(Math.round((amounts[stock.ticker] || amounts[index]) * investment * 100)/100)}/>
                ))) : (
                    <Text c="dimmed"><i>You currently don't have any stocks.</i></Text>
                )}
            </div>
            <Text size="lg" c="dimmed"><i>*This list is not meant to be financial advice. Please invest in stocks at your own discretion.</i></Text>
        </main>
    );
}

export default Report;
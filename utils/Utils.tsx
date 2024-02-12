//Backend url
const api = "https://backend.tylerk.tech/"; 

//Post request to OpenAI GPT model
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY!,
    dangerouslyAllowBrowser: true
});

export const runtime = 'edge';

export async function POST(message: string) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
    });
    return chatCompletion;
}

//Returns data points to be used for rendering graph
export function getDataPoints(graph: any) {
    let dataPoints = [];
    for (let key in graph) {
        dataPoints.push({ date: key, Price: graph[key] });
    }
    return dataPoints;
}

//Returns data array to be used for rendering mini graph
export function getDataArray(graph: any) {
    let dataPoints = [];
    for (let key in graph) {
        dataPoints.push(graph[key]);
    }
    return dataPoints;
}

//Get biggest and smallest element to be used for calculating graph bounds
export function getBounds(data: any) {
    let smallest = data[0].Price;
    let biggest = data[0].Price;
    for (let key in data) {
        if (data[key].Price < smallest) {
            smallest = data[key].Price;
        }
        if (data[key].Price > biggest) {
            biggest = data[key].Price;
        }
    }
    return [smallest, biggest];
}

//Get amounts to invest per stock
export async function getAmounts(size: number, risk: string) {
    if (size > 0) {
        let riskType = risk == "Low Risk (Conservative)" ? "low" : risk == "Medium Risk (Mix)" ? "medium" : "high";
        const response = await fetch(api + "RecommendedPortfolio/" + riskType);
        const data = (await response.json()).Allocation;
        if (data.Allocation == null) {
            let result = [];
            for (let i = 0; i < size; i++) {
                result.push(1 / size);
            }
            //return result;
        }
        return data;
    } else {
        return [];
    }
}

//Get the next stock
export async function getStock(ticker: string, swipe: boolean) {
    let append = "";
    if (ticker != null && ticker != "") {
        append = ticker + "/" + swipe;
    }
    const response = await fetch(api + "get_next_ticker/" + append);
    const data = await response.json();
    return data;
    //return sampleStock;
}


//Send user preferences to server
export async function sendPreferences(preferences: any) {
    let risk = preferences.risk == "Low Risk (Conservative)" ? 2 : preferences.risk == "Medium Risk (Mix)" ? 5 : 8;
    let sectors = "";
    for (let i = 0; i < preferences.sector.length; i++) {
        sectors += preferences.sector[i];
        if (i < preferences.sector.length - 1) {
            sectors += ",";
        }
    }
    await fetch(api + "create_account/" + risk + "/" + sectors + "/" + preferences.age + "/" + preferences.size);
}

//Send request to GPT model with a prompt and the user question
export async function getResponse(ticker: string, name: string, question: string) {
    const prompt = "You are going to provide helpful answers to questions a beginning stock investor might have. The ticker for the current company stock is " + ticker + " and the company name is " + name + ". Do not provide financial advice. Here is the question: "
    const response = await POST(prompt + question);
    return response.choices[0].message.content;
}

//Get the important stock data used in the UI
export async function parseStocks(stocks: any) {
    var newStockData = [];
    for (let i = 0; i < stocks.length; i++) {
        newStockData.push({
            name: stocks[i].name_data,
            ticker: stocks[i].ticker,
            swipe: stocks[i].swipe,
            time: stocks[i].time,
            price: stocks[i].marketOpen_data,
            graph: getDataArray(stocks[i].graph_data.six_month),
        })
    }
    return newStockData;
}
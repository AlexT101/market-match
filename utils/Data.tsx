import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface PreferencesProps {
    sector: string[];
    risk: string[];
    age: string[];
    size: string[];
    dividends: boolean;
}

interface GraphPoint {
    date: string,
    value: number
}

interface Stock {
    name: string;
    ticker: string;
    sector: string;
    graph: GraphPoint[];
    description: string;
}

interface State {
    preferences: PreferencesProps
    setPreferences: (by: PreferencesProps) => void
    currentStock: Stock
    setCurrentStock: (by: Stock) => void
    stocks: Stock[]
    addStock: (by: Stock) => void
}

export const useStore = create<State>()(
    persist(
        (set) => ({
            preferences: { sector: [], risk: [], age: [], size: [], dividends: false },
            setPreferences: (by) => set((state) => ({ preferences: by })),
            currentStock: { name: '', ticker: '', sector: '', graph: [], description: '' },
            setCurrentStock: (by) => set((state) => ({ currentStock: by })),
            stocks: [],
            addStock: (by) => set((state) => ({ stocks: [...state.stocks, by] })),
        }),
        {
            name: 'data-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
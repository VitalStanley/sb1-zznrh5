import { useState, useEffect } from 'react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  chartData: number[];
}

function generateMockChartData() {
  return Array.from({ length: 24 }, (_, i) => {
    return Math.random() * 10 - 5 + Math.sin(i / 4) * 3;
  });
}

const mockMarketData: Record<string, MarketData[]> = {
  crypto: [
    {
      symbol: 'BTC/USD',
      name: 'Bitcoin',
      price: 42156.78,
      change: 2.45,
      volume: 28965471,
      chartData: generateMockChartData()
    },
    {
      symbol: 'ETH/USDT',
      name: 'Ethereum',
      price: 2245.63,
      change: 1.87,
      volume: 15478963,
      chartData: generateMockChartData()
    },
    {
      symbol: 'DOGE/USD',
      name: 'Dogecoin',
      price: 0.0825,
      change: -1.24,
      volume: 8547123,
      chartData: generateMockChartData()
    },
    {
      symbol: 'ETH/BTC',
      name: 'Ethereum/Bitcoin',
      price: 0.0589,
      change: 0.75,
      volume: 4521369,
      chartData: generateMockChartData()
    }
  ],
  futures: [
    {
      symbol: 'NQ=F',
      name: 'E-mini Nasdaq-100',
      price: 17845.25,
      change: 0.85,
      volume: 258963,
      chartData: generateMockChartData()
    },
    {
      symbol: 'ES=F',
      name: 'E-mini S&P 500',
      price: 4785.50,
      change: 0.65,
      volume: 325147,
      chartData: generateMockChartData()
    },
    {
      symbol: 'GC=F',
      name: 'Gold Futures',
      price: 2024.50,
      change: 0.45,
      volume: 247896,
      chartData: generateMockChartData()
    },
    {
      symbol: 'MNQ=F',
      name: 'Micro E-mini Nasdaq',
      price: 17846.75,
      change: 0.88,
      volume: 158963,
      chartData: generateMockChartData()
    }
  ],
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.52, change: 1.24, volume: 55489632, chartData: generateMockChartData() },
    { symbol: 'MSFT', name: 'Microsoft', price: 338.47, change: 0.89, volume: 22145789, chartData: generateMockChartData() },
  ],
  forex: [
    { symbol: 'EUR/USD', name: 'Euro/Dollar', price: 1.0892, change: -0.15, volume: 98562147, chartData: generateMockChartData() },
    { symbol: 'GBP/USD', name: 'Livre/Dollar', price: 1.2654, change: 0.25, volume: 45789632, chartData: generateMockChartData() },
  ],
  indices: [
    { symbol: 'CAC40', name: 'CAC 40', price: 7568.82, change: 0.75, volume: 458963217, chartData: generateMockChartData() },
    { symbol: 'DAX', name: 'DAX 40', price: 16789.24, change: 0.92, volume: 325147896, chartData: generateMockChartData() },
  ],
  bonds: [
    { symbol: 'FR10Y', name: 'OAT 10 ans', price: 98.45, change: -0.32, volume: 125478963, chartData: generateMockChartData() },
    { symbol: 'DE10Y', name: 'Bund 10 ans', price: 97.85, change: -0.28, volume: 98745632, chartData: generateMockChartData() },
  ],
  funds: [
    { symbol: 'ESGE.PA', name: 'MSCI EM ESG', price: 245.78, change: 0.65, volume: 125478963, chartData: generateMockChartData() },
    { symbol: 'IWDA.AS', name: 'iShares MSCI World', price: 78.45, change: 0.48, volume: 87456321, chartData: generateMockChartData() },
  ],
};

export function useMarketData(marketType: string) {
  const [data, setData] = useState<MarketData[]>([]);

  useEffect(() => {
    setData(mockMarketData[marketType] || []);

    // Simuler les mises à jour en temps réel
    const interval = setInterval(() => {
      setData(currentData => 
        currentData.map(item => ({
          ...item,
          price: item.price * (1 + (Math.random() - 0.5) * 0.001),
          chartData: [...item.chartData.slice(1), Math.random() * 10 - 5]
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [marketType]);

  return data;
}
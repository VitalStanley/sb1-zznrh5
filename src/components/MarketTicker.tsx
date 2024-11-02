import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, LineChart, Clock, Lock, RefreshCw } from 'lucide-react';

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  marketCap?: number;
  category: 'crypto' | 'forex' | 'indices' | 'stocks';
  marketStatus: 'open' | 'closed' | 'pre-market' | 'after-hours';
  nextEvent: {
    type: 'open' | 'close';
    time: string;
  };
  lastUpdate: string;
  timezone: string;
}

export default function MarketTicker() {
  const [tickerData, setTickerData] = React.useState<TickerItem[]>([]);

  React.useEffect(() => {
    // Simuler les données initiales
    const initialData: TickerItem[] = [
      {
        symbol: 'BTC/USD',
        price: 42156.78,
        change: 2.45,
        volume: 28965471,
        marketCap: 824.5,
        category: 'crypto',
        marketStatus: 'open',
        nextEvent: { type: 'close', time: '24/7' },
        lastUpdate: new Date().toLocaleTimeString(),
        timezone: 'UTC'
      },
      {
        symbol: 'ETH/USD',
        price: 2245.63,
        change: 1.87,
        volume: 15478963,
        marketCap: 269.8,
        category: 'crypto',
        marketStatus: 'open',
        nextEvent: { type: 'close', time: '24/7' },
        lastUpdate: new Date().toLocaleTimeString(),
        timezone: 'UTC'
      },
      {
        symbol: 'EUR/USD',
        price: 1.0892,
        change: -0.15,
        volume: 98562147,
        category: 'forex',
        marketStatus: 'open',
        nextEvent: { type: 'close', time: '22:00' },
        lastUpdate: new Date().toLocaleTimeString(),
        timezone: 'CET'
      },
      {
        symbol: 'GBP/USD',
        price: 1.2654,
        change: 0.25,
        volume: 45789632,
        category: 'forex',
        marketStatus: 'open',
        nextEvent: { type: 'close', time: '22:00' },
        lastUpdate: new Date().toLocaleTimeString(),
        timezone: 'CET'
      },
      {
        symbol: 'CAC40',
        price: 7568.82,
        change: 0.75,
        volume: 458963217,
        category: 'indices',
        marketStatus: 'closed',
        nextEvent: { type: 'open', time: '09:00' },
        lastUpdate: '17:30:00',
        timezone: 'CET'
      },
      {
        symbol: 'S&P500',
        price: 4785.50,
        change: 0.65,
        volume: 325147896,
        category: 'indices',
        marketStatus: 'closed',
        nextEvent: { type: 'open', time: '15:30' },
        lastUpdate: '22:00:00',
        timezone: 'EST'
      },
      {
        symbol: 'AAPL',
        price: 182.52,
        change: 1.24,
        volume: 55489632,
        marketCap: 2890.4,
        category: 'stocks',
        marketStatus: 'closed',
        nextEvent: { type: 'open', time: '15:30' },
        lastUpdate: '22:00:00',
        timezone: 'EST'
      },
      {
        symbol: 'MSFT',
        price: 338.47,
        change: 0.89,
        volume: 22145789,
        marketCap: 2560.7,
        category: 'stocks',
        marketStatus: 'closed',
        nextEvent: { type: 'open', time: '15:30' },
        lastUpdate: '22:00:00',
        timezone: 'EST'
      }
    ];

    setTickerData(initialData);

    const interval = setInterval(() => {
      setTickerData(current => 
        current.map(item => ({
          ...item,
          price: item.marketStatus === 'open' 
            ? item.price * (1 + (Math.random() - 0.5) * 0.001)
            : item.price,
          change: item.marketStatus === 'open'
            ? item.change + (Math.random() - 0.5) * 0.01
            : item.change,
          volume: item.marketStatus === 'open'
            ? item.volume * (1 + (Math.random() - 0.5) * 0.005)
            : item.volume,
          lastUpdate: item.marketStatus === 'open'
            ? new Date().toLocaleTimeString()
            : item.lastUpdate
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: TickerItem['category']) => {
    switch (category) {
      case 'crypto':
        return <Bitcoin className="h-4 w-4" />;
      case 'forex':
        return <DollarSign className="h-4 w-4" />;
      case 'indices':
      case 'stocks':
        return <LineChart className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-slate-900 py-2 border-b border-slate-700 overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {tickerData.map((item, index) => (
          <div key={item.symbol} className="inline-flex items-center mx-6">
            <div className="flex items-center space-x-2">
              <span className={`${
                item.category === 'crypto' ? 'text-yellow-400' :
                item.category === 'forex' ? 'text-blue-400' :
                item.category === 'indices' ? 'text-purple-400' :
                'text-emerald-400'
              }`}>
                {getCategoryIcon(item.category)}
              </span>
              <span className="font-medium">{item.symbol}</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.marketStatus === 'open' ? 'bg-green-500/20 text-green-400' :
                  item.marketStatus === 'closed' ? 'bg-red-500/20 text-red-400' :
                  item.marketStatus === 'pre-market' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.marketStatus === 'open' && (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Ouvert
                    </span>
                  )}
                  {item.marketStatus === 'closed' && (
                    <span className="flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      Fermé ({item.nextEvent.time})
                    </span>
                  )}
                  {item.marketStatus === 'pre-market' && 'Pré-Marché'}
                  {item.marketStatus === 'after-hours' && 'After-Hours'}
                </span>
                <span className="flex items-center text-xs text-slate-400">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  {item.lastUpdate} {item.timezone}
                </span>
              </div>
            </div>
            <div className="ml-3 space-x-4">
              <span className="font-mono">
                {item.price.toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: item.category === 'crypto' ? 2 : 
                                       item.category === 'forex' ? 4 : 2,
                })}
              </span>
              <span className={`flex items-center ${
                item.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {item.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
              </span>
              <span className="text-slate-400 text-sm">
                Vol: {(item.volume / 1000000).toFixed(1)}M
              </span>
              {item.marketCap && (
                <span className="text-slate-400 text-sm">
                  Cap: ${item.marketCap.toFixed(1)}B
                </span>
              )}
            </div>
            {index < tickerData.length - 1 && (
              <span className="mx-6 text-slate-600">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
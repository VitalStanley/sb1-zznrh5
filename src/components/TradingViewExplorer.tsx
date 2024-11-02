import React from 'react';
import { LineChart, TrendingUp, TrendingDown, BarChart2, Clock, Activity, DollarSign } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  priceUSD: number;
  change: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  indicators: {
    rsi: number;
    macd: number;
    volume_sma: number;
  };
  trades: {
    time: string;
    price: number;
    size: number;
    side: 'buy' | 'sell';
  }[];
  currency: string;
  conversionRate: number;
}

const formatConfig: { [key: string]: { 
  prefix?: string; 
  suffix?: string; 
  decimals: number;
  currency: string;
  conversionRate: number;
}} = {
  'BTC/USD': { prefix: '$', decimals: 2, currency: 'USD', conversionRate: 1 },
  'ETH/USD': { prefix: '$', decimals: 2, currency: 'USD', conversionRate: 1 },
  'EUR/USD': { decimals: 4, currency: 'EUR', conversionRate: 1.09 },
  'GBP/USD': { decimals: 4, currency: 'GBP', conversionRate: 1.27 },
  'AAPL': { prefix: '$', decimals: 2, currency: 'USD', conversionRate: 1 },
  'GOOGL': { prefix: '$', decimals: 2, currency: 'USD', conversionRate: 1 }
};

export default function TradingViewExplorer() {
  const [marketData, setMarketData] = React.useState<MarketData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Simuler les données en temps réel
    const symbols = [
      { symbol: 'BTC/USD', name: 'Bitcoin' },
      { symbol: 'ETH/USD', name: 'Ethereum' },
      { symbol: 'EUR/USD', name: 'Euro/Dollar' },
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'GOOGL', name: 'Google' }
    ];

    const generateTrade = (basePrice: number, symbol: string) => ({
      time: new Date().toLocaleTimeString(),
      price: basePrice * (1 + (Math.random() - 0.5) * 0.001),
      size: Math.floor(Math.random() * 100),
      side: Math.random() > 0.5 ? 'buy' : 'sell' as 'buy' | 'sell'
    });

    const generateMarketData = () => {
      return symbols.map(({ symbol, name }) => {
        const config = formatConfig[symbol];
        const basePrice = 1000 + Math.random() * 1000;
        return {
          symbol,
          name,
          price: basePrice,
          priceUSD: basePrice * config.conversionRate,
          change: (Math.random() * 10) - 5,
          volume: Math.floor(Math.random() * 1000000),
          high: basePrice * (1 + Math.random() * 0.05),
          low: basePrice * (1 - Math.random() * 0.05),
          open: basePrice * (1 + (Math.random() - 0.5) * 0.02),
          indicators: {
            rsi: 30 + Math.random() * 40,
            macd: (Math.random() * 2) - 1,
            volume_sma: Math.floor(Math.random() * 800000)
          },
          trades: Array.from({ length: 5 }, () => generateTrade(basePrice, symbol)),
          currency: config.currency,
          conversionRate: config.conversionRate
        };
      });
    };

    setMarketData(generateMarketData());

    const interval = setInterval(() => {
      setMarketData(prev => prev.map(data => {
        const newPrice = data.price * (1 + (Math.random() - 0.5) * 0.001);
        return {
          ...data,
          price: newPrice,
          priceUSD: newPrice * data.conversionRate,
          change: data.change + (Math.random() - 0.5) * 0.1,
          volume: data.volume + Math.floor(Math.random() * 1000),
          trades: [generateTrade(newPrice, data.symbol), ...data.trades.slice(0, 4)],
          indicators: {
            rsi: Math.max(0, Math.min(100, data.indicators.rsi + (Math.random() - 0.5) * 2)),
            macd: data.indicators.macd + (Math.random() - 0.5) * 0.1,
            volume_sma: data.indicators.volume_sma + (Math.random() - 0.5) * 1000
          }
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number, symbol: string) => {
    const config = formatConfig[symbol];
    return price.toLocaleString('fr-FR', {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    });
  };

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <LineChart className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold">TradingView Explorer</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-400">
            Mise à jour en temps réel
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {marketData.map((data) => (
          <div
            key={data.symbol}
            className={`bg-slate-700 rounded-lg p-4 cursor-pointer transition-all ${
              selectedSymbol === data.symbol ? 'ring-2 ring-emerald-500' : ''
            }`}
            onClick={() => setSelectedSymbol(
              selectedSymbol === data.symbol ? null : data.symbol
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">{data.symbol}</span>
                  <span className="text-sm text-slate-400">{data.name}</span>
                </div>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-2xl font-mono font-bold">
                    {data.currency !== 'USD' && data.currency}{' '}
                    {formatPrice(data.price, data.symbol)}
                  </span>
                  <span className={`flex items-center ${
                    data.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {data.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
                  </span>
                </div>
                {data.currency !== 'USD' && (
                  <div className="flex items-center text-sm text-slate-400 mt-1">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {data.priceUSD.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Volume</div>
                <div className="font-mono">
                  {(data.volume / 1000).toFixed(1)}K
                </div>
              </div>
            </div>

            {selectedSymbol === data.symbol && (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">RSI</div>
                    <div className={`text-lg font-bold ${
                      data.indicators.rsi > 70 ? 'text-red-400' :
                      data.indicators.rsi < 30 ? 'text-green-400' :
                      'text-blue-400'
                    }`}>
                      {data.indicators.rsi.toFixed(1)}
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">MACD</div>
                    <div className={`text-lg font-bold ${
                      data.indicators.macd >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {data.indicators.macd.toFixed(3)}
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">Vol SMA</div>
                    <div className="text-lg font-bold text-purple-400">
                      {(data.indicators.volume_sma / 1000).toFixed(1)}K
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Derniers Trades</h3>
                    <Activity className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    {data.trades.map((trade, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-400">{trade.time}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            trade.side === 'buy'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {trade.side.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-mono">
                            {formatPrice(trade.price, data.symbol)}
                          </span>
                          <span className="text-slate-400">
                            {trade.size} lots
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
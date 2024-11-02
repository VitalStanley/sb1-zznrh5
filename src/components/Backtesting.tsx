import React, { useState } from 'react';
import { LineChart, History, TrendingUp, TrendingDown, AlertCircle, BarChart2 } from 'lucide-react';

interface BacktestResult {
  id: string;
  strategy: string;
  period: string;
  performance: {
    totalReturn: number;
    winRate: number;
    maxDrawdown: number;
    sharpeRatio: number;
    trades: number;
  };
  trades: {
    id: string;
    date: string;
    type: 'long' | 'short';
    result: 'win' | 'loss';
    return: number;
    duration: string;
  }[];
  marketConditions: string[];
  aiConfidence: number;
}

export default function Backtesting() {
  const [results, setResults] = React.useState<BacktestResult[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const periods = [
    { id: '1W', label: '1 Semaine' },
    { id: '1M', label: '1 Mois' },
    { id: '3M', label: '3 Mois' },
    { id: '6M', label: '6 Mois' },
    { id: '1Y', label: '1 An' }
  ];

  const strategies = [
    'Momentum RSI + MACD',
    'Breakout Volatilité',
    'Mean Reversion',
    'Trend Following'
  ];

  React.useEffect(() => {
    // Simuler les résultats de backtesting
    const generateBacktestResult = (strategy: string): BacktestResult => {
      const winRate = 55 + Math.random() * 20;
      const trades = Math.floor(20 + Math.random() * 30);
      const wins = Math.floor(trades * (winRate / 100));
      const losses = trades - wins;
      const timestamp = Date.now();

      return {
        id: `${strategy.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`,
        strategy,
        period: selectedPeriod,
        performance: {
          totalReturn: Math.random() * 40 - 10,
          winRate,
          maxDrawdown: -(Math.random() * 15),
          sharpeRatio: 1 + Math.random() * 2,
          trades
        },
        trades: Array.from({ length: trades }, (_, i) => {
          const isWin = i < wins;
          return {
            id: `trade-${timestamp}-${i}`,
            date: new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString(),
            type: Math.random() > 0.5 ? 'long' : 'short',
            result: isWin ? 'win' : 'loss',
            return: isWin ? Math.random() * 5 : -Math.random() * 3,
            duration: `${Math.floor(Math.random() * 48)}h`
          };
        }),
        marketConditions: [
          'Volatilité Modérée',
          'Tendance Haussière',
          'Volume Élevé'
        ],
        aiConfidence: 70 + Math.random() * 20
      };
    };

    const newResults = strategies.map(generateBacktestResult);
    setResults(newResults);
  }, [selectedPeriod]);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <History className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold">Backtesting Holly AI</h2>
        </div>
        <div className="flex space-x-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{result.strategy}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <AlertCircle className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-purple-400">
                    Confiance IA: {result.aiConfidence.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className={`text-2xl font-bold ${
                result.performance.totalReturn >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}>
                {result.performance.totalReturn >= 0 ? '+' : ''}
                {result.performance.totalReturn.toFixed(2)}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Win Rate</div>
                <div className="text-lg font-bold text-emerald-400">
                  {result.performance.winRate.toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Drawdown Max</div>
                <div className="text-lg font-bold text-red-400">
                  {result.performance.maxDrawdown.toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Ratio de Sharpe</div>
                <div className="text-lg font-bold text-blue-400">
                  {result.performance.sharpeRatio.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Trades</div>
                <div className="text-lg font-bold text-purple-400">
                  {result.performance.trades}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Derniers Trades</h4>
              <div className="space-y-2">
                {result.trades.slice(0, 3).map((trade) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between bg-slate-800 rounded-lg p-2"
                  >
                    <div className="flex items-center space-x-2">
                      {trade.type === 'long' ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <span className="text-sm">{trade.date}</span>
                      <span className="text-sm text-slate-400">{trade.duration}</span>
                    </div>
                    <div className={`text-sm font-semibold ${
                      trade.return >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.return >= 0 ? '+' : ''}{trade.return.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Conditions de Marché</h4>
              <div className="flex flex-wrap gap-2">
                {result.marketConditions.map((condition, i) => (
                  <span
                    key={`${result.id}-condition-${i}`}
                    className="px-2 py-1 bg-slate-600 rounded-full text-xs"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
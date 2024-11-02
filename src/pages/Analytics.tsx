import React from 'react';
import { LineChart, BarChart2, PieChart, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import TradeAlerts from '../components/TradeAlerts';

interface TradeHistory {
  id: string;
  date: string;
  symbol: string;
  type: 'long' | 'short';
  entry: number;
  exit: number;
  profit: number;
  duration: string;
  strategy: string;
}

interface PerformanceMetric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
}

export default function Analytics() {
  const [timeframe, setTimeframe] = React.useState('1M');
  const [tradeHistory, setTradeHistory] = React.useState<TradeHistory[]>([]);

  const performanceMetrics: PerformanceMetric[] = [
    { label: 'Profit Total', value: '+24.5%', change: 2.3, icon: TrendingUp },
    { label: 'Win Rate', value: '68%', change: -1.2, icon: PieChart },
    { label: 'Nombre de Trades', value: 156, change: 12.5, icon: BarChart2 },
    { label: 'Durée Moyenne', value: '4h 23m', change: 0.8, icon: Calendar }
  ];

  React.useEffect(() => {
    // Simuler l'historique des trades
    const generateTradeHistory = () => {
      const history: TradeHistory[] = [];
      const symbols = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL'];
      const strategies = ['Momentum', 'Breakout', 'Mean Reversion', 'Trend Following'];

      for (let i = 0; i < 20; i++) {
        const entry = 1000 + Math.random() * 1000;
        const profitPercent = (Math.random() * 10) - 3;
        const exit = entry * (1 + profitPercent / 100);

        history.push({
          id: `trade-${i}`,
          date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          type: Math.random() > 0.5 ? 'long' : 'short',
          entry,
          exit,
          profit: profitPercent,
          duration: `${Math.floor(Math.random() * 12)}h ${Math.floor(Math.random() * 60)}m`,
          strategy: strategies[Math.floor(Math.random() * strategies.length)]
        });
      }

      setTradeHistory(history);
    };

    generateTradeHistory();
  }, [timeframe]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Analyse de Performance</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric) => (
            <div key={metric.label} className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="h-6 w-6 text-emerald-400" />
                <span className={`text-sm ${
                  metric.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-slate-400">{metric.label}</div>
            </div>
          ))}
        </div>

        <TradeAlerts />

        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Historique des Trades</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-4 font-semibold text-slate-400">Date</th>
                  <th className="pb-4 font-semibold text-slate-400">Symbol</th>
                  <th className="pb-4 font-semibold text-slate-400">Type</th>
                  <th className="pb-4 font-semibold text-slate-400">Entrée</th>
                  <th className="pb-4 font-semibold text-slate-400">Sortie</th>
                  <th className="pb-4 font-semibold text-slate-400">Profit</th>
                  <th className="pb-4 font-semibold text-slate-400">Durée</th>
                  <th className="pb-4 font-semibold text-slate-400">Stratégie</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade) => (
                  <tr key={trade.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-4">{trade.date}</td>
                    <td className="py-4 font-medium">{trade.symbol}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        trade.type === 'long'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {trade.type === 'long' ? 'LONG' : 'SHORT'}
                      </span>
                    </td>
                    <td className="py-4 font-mono">{trade.entry.toFixed(2)}</td>
                    <td className="py-4 font-mono">{trade.exit.toFixed(2)}</td>
                    <td className={`py-4 font-medium ${
                      trade.profit >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}%
                    </td>
                    <td className="py-4 text-slate-400">{trade.duration}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-slate-700 rounded-lg text-xs">
                        {trade.strategy}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Statistiques Avancées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Distribution des Profits</h3>
              <div className="h-40 flex items-end space-x-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-500/20 rounded-t"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Performance par Marché</h3>
              <div className="space-y-3">
                {['Crypto', 'Forex', 'Actions'].map((market) => (
                  <div key={market} className="flex items-center">
                    <span className="w-24 text-sm">{market}</span>
                    <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${30 + Math.random() * 50}%` }}
                      />
                    </div>
                    <span className="ml-3 text-sm font-medium">
                      {(Math.random() * 30).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Meilleures Stratégies</h3>
              <div className="space-y-3">
                {['Momentum', 'Breakout', 'Mean Reversion'].map((strategy) => (
                  <div key={strategy} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-emerald-400" />
                      <span>{strategy}</span>
                    </div>
                    <span className="text-emerald-400">
                      +{(Math.random() * 20).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { LineChart, BarChart2, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface PerformanceData {
  strategy: string;
  asset: string;
  returns: {
    '1W': number;
    '1M': number;
    '3M': number;
    '6M': number;
    '1Y': number;
  };
  risk: number;
  sharpe: number;
  maxDrawdown: number;
}

export default function PerformanceCharts() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('1M');
  const [performanceData, setPerformanceData] = React.useState<PerformanceData[]>([]);

  React.useEffect(() => {
    // Simuler les données de performance
    const strategies = ['Momentum', 'Mean Reversion', 'Trend Following', 'Breakout'];
    const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL'];
    
    const newData = strategies.flatMap(strategy => 
      assets.map(asset => ({
        strategy,
        asset,
        returns: {
          '1W': Math.random() * 10 - 3,
          '1M': Math.random() * 20 - 5,
          '3M': Math.random() * 40 - 10,
          '6M': Math.random() * 60 - 15,
          '1Y': Math.random() * 100 - 20
        },
        risk: Math.random() * 20 + 10,
        sharpe: Math.random() * 3 + 0.5,
        maxDrawdown: -(Math.random() * 15 + 5)
      }))
    );

    setPerformanceData(newData);
  }, []);

  const periods = [
    { id: '1W', label: '1 Semaine' },
    { id: '1M', label: '1 Mois' },
    { id: '3M', label: '3 Mois' },
    { id: '6M', label: '6 Mois' },
    { id: '1Y', label: '1 An' }
  ];

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <LineChart className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold">Performance par Stratégie</h2>
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
        {performanceData
          .reduce((acc, curr) => {
            const existing = acc.find(item => item.strategy === curr.strategy);
            if (!existing) {
              acc.push({
                strategy: curr.strategy,
                totalReturn: curr.returns[selectedPeriod as keyof typeof curr.returns],
                assets: [{
                  symbol: curr.asset,
                  return: curr.returns[selectedPeriod as keyof typeof curr.returns],
                  risk: curr.risk,
                  sharpe: curr.sharpe,
                  maxDrawdown: curr.maxDrawdown
                }]
              });
            } else {
              existing.totalReturn += curr.returns[selectedPeriod as keyof typeof curr.returns];
              existing.assets.push({
                symbol: curr.asset,
                return: curr.returns[selectedPeriod as keyof typeof curr.returns],
                risk: curr.risk,
                sharpe: curr.sharpe,
                maxDrawdown: curr.maxDrawdown
              });
            }
            return acc;
          }, [] as any[])
          .map((strategyData) => (
            <div
              key={strategyData.strategy}
              className="bg-slate-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{strategyData.strategy}</h3>
                <div className={`text-xl font-bold ${
                  strategyData.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {strategyData.totalReturn >= 0 ? '+' : ''}
                  {strategyData.totalReturn.toFixed(2)}%
                </div>
              </div>

              <div className="space-y-4">
                {strategyData.assets.map((asset: any) => (
                  <div key={asset.symbol} className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{asset.symbol}</span>
                      <div className="flex items-center space-x-2">
                        {asset.return >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                        <span className={asset.return >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {asset.return >= 0 ? '+' : ''}{asset.return.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-slate-400">Risque</div>
                        <div className="font-medium">{asset.risk.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Sharpe</div>
                        <div className="font-medium">{asset.sharpe.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Max DD</div>
                        <div className="font-medium text-red-400">
                          {asset.maxDrawdown.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
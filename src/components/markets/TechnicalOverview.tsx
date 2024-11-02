import React from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface TechnicalOverviewProps {
  marketId: string;
}

export default function TechnicalOverview({ marketId }: TechnicalOverviewProps) {
  const indicators = [
    {
      name: 'RSI',
      value: 65.4,
      signal: 'neutral',
      details: 'Approche de la zone de surachat',
    },
    {
      name: 'MACD',
      value: 0.0245,
      signal: 'buy',
      details: 'Croisement haussier récent',
    },
    {
      name: 'Stochastique',
      value: 82.5,
      signal: 'sell',
      details: 'Divergence baissière',
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Analyse Technique</h3>
      <div className="space-y-4">
        {indicators.map((indicator) => (
          <div
            key={indicator.name}
            className="bg-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-emerald-400" />
                <span className="font-medium">{indicator.name}</span>
              </div>
              <div className={`flex items-center space-x-1 ${
                indicator.signal === 'buy' ? 'text-green-400' :
                indicator.signal === 'sell' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {indicator.signal === 'buy' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : indicator.signal === 'sell' ? (
                  <TrendingDown className="h-4 w-4" />
                ) : null}
                <span>{indicator.value}</span>
              </div>
            </div>
            <p className="text-sm text-slate-400">{indicator.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
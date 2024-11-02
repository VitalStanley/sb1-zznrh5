import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minimize2 } from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  type: 'crypto' | 'stock' | 'forex' | 'commodity';
}

interface CorrelationData {
  asset1: string;
  asset2: string;
  correlation: number;
  strength: 'strong' | 'moderate' | 'weak';
  trend: 'positive' | 'negative' | 'neutral';
}

export default function CorrelationMatrix() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('1M');
  const [assets] = React.useState<Asset[]>([
    { symbol: 'BTC', name: 'Bitcoin', type: 'crypto' },
    { symbol: 'ETH', name: 'Ethereum', type: 'crypto' },
    { symbol: 'AAPL', name: 'Apple', type: 'stock' },
    { symbol: 'GOOGL', name: 'Google', type: 'stock' },
    { symbol: 'EUR/USD', name: 'Euro/Dollar', type: 'forex' },
    { symbol: 'GOLD', name: 'Gold', type: 'commodity' }
  ]);

  const [correlations, setCorrelations] = React.useState<CorrelationData[]>([]);

  React.useEffect(() => {
    // Simuler le calcul des corrélations
    const newCorrelations: CorrelationData[] = [];
    assets.forEach((asset1, i) => {
      assets.forEach((asset2, j) => {
        if (i < j) {
          const correlation = Math.random() * 2 - 1; // -1 à 1
          newCorrelations.push({
            asset1: asset1.symbol,
            asset2: asset2.symbol,
            correlation,
            strength: Math.abs(correlation) > 0.7 ? 'strong' : 
                     Math.abs(correlation) > 0.3 ? 'moderate' : 'weak',
            trend: correlation > 0.1 ? 'positive' : 
                  correlation < -0.1 ? 'negative' : 'neutral'
          });
        }
      });
    });
    setCorrelations(newCorrelations);
  }, [selectedPeriod, assets]);

  const periods = [
    { id: '1W', label: '1 Semaine' },
    { id: '1M', label: '1 Mois' },
    { id: '3M', label: '3 Mois' },
    { id: '6M', label: '6 Mois' },
    { id: '1Y', label: '1 An' }
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Matrice de Corrélation</h2>
        <div className="flex space-x-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {correlations.map((correlation) => (
          <div
            key={`${correlation.asset1}-${correlation.asset2}`}
            className="bg-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{correlation.asset1}</span>
                  <span className="text-slate-400">vs</span>
                  <span className="font-bold">{correlation.asset2}</span>
                </div>
                {correlation.trend === 'positive' ? (
                  <ArrowUpRight className="h-5 w-5 text-green-400" />
                ) : correlation.trend === 'negative' ? (
                  <ArrowDownRight className="h-5 w-5 text-red-400" />
                ) : (
                  <Minimize2 className="h-5 w-5 text-yellow-400" />
                )}
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  correlation.trend === 'positive' ? 'text-green-400' :
                  correlation.trend === 'negative' ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {correlation.correlation.toFixed(2)}
                </div>
                <div className="text-sm text-slate-400">
                  Corrélation {correlation.strength === 'strong' ? 'Forte' :
                             correlation.strength === 'moderate' ? 'Modérée' :
                             'Faible'}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    correlation.trend === 'positive' ? 'bg-green-400' :
                    correlation.trend === 'negative' ? 'bg-red-400' :
                    'bg-yellow-400'
                  }`}
                  style={{
                    width: `${Math.abs(correlation.correlation) * 100}%`,
                    marginLeft: correlation.correlation < 0 ? 'auto' : '0'
                  }}
                />
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-400">
              {correlation.trend === 'positive' ? (
                'Ces actifs évoluent généralement dans la même direction'
              ) : correlation.trend === 'negative' ? (
                'Ces actifs évoluent généralement en directions opposées'
              ) : (
                'Pas de corrélation significative entre ces actifs'
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
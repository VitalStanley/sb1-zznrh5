import React from 'react';
import { Brain, Target, BarChart2, TrendingUp, TrendingDown } from 'lucide-react';

interface NumeraiPrediction {
  asset: string;
  prediction: {
    score: number;
    direction: 'long' | 'short' | 'neutral';
    confidence: number;
  };
  metrics: {
    sharpe: number;
    correlation: number;
    volatility: number;
  };
  features: {
    name: string;
    importance: number;
    value: number;
  }[];
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  timestamp: string;
}

export default function NumeraiPredictions() {
  const [predictions, setPredictions] = React.useState<NumeraiPrediction[]>([]);

  React.useEffect(() => {
    // Simuler les prédictions Numerai
    const generatePredictions = () => {
      const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'GOOGL'];
      return assets.map(asset => ({
        asset,
        prediction: {
          score: Math.random() * 100,
          direction: ['long', 'short', 'neutral'][Math.floor(Math.random() * 3)] as 'long' | 'short' | 'neutral',
          confidence: 60 + Math.random() * 40
        },
        metrics: {
          sharpe: 1 + Math.random() * 2,
          correlation: -1 + Math.random() * 2,
          volatility: Math.random() * 0.5
        },
        features: [
          {
            name: 'Momentum',
            importance: Math.random() * 100,
            value: Math.random() * 100
          },
          {
            name: 'Value',
            importance: Math.random() * 100,
            value: Math.random() * 100
          },
          {
            name: 'Quality',
            importance: Math.random() * 100,
            value: Math.random() * 100
          }
        ],
        performance: {
          daily: (Math.random() - 0.5) * 10,
          weekly: (Math.random() - 0.5) * 20,
          monthly: (Math.random() - 0.5) * 40
        },
        timestamp: new Date().toLocaleTimeString()
      }));
    };

    setPredictions(generatePredictions());

    const interval = setInterval(() => {
      setPredictions(generatePredictions());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-purple-400" />
        <h2 className="text-xl font-bold">Prédictions Numerai</h2>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction) => (
          <div
            key={prediction.asset}
            className="bg-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{prediction.asset}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    prediction.prediction.direction === 'long' ? 'bg-green-500/20 text-green-400' :
                    prediction.prediction.direction === 'short' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {prediction.prediction.direction.toUpperCase()}
                  </span>
                  <span className="text-sm">
                    {prediction.prediction.confidence.toFixed(1)}% confiance
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Score</div>
                <div className="text-xl font-bold text-purple-400">
                  {prediction.prediction.score.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Ratio de Sharpe</div>
                <div className="text-lg font-bold text-blue-400">
                  {prediction.metrics.sharpe.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Corrélation</div>
                <div className="text-lg font-bold text-green-400">
                  {prediction.metrics.correlation.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Volatilité</div>
                <div className="text-lg font-bold text-red-400">
                  {prediction.metrics.volatility.toFixed(3)}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Features Importantes</h4>
              <div className="space-y-2">
                {prediction.features.map((feature, index) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{feature.name}</span>
                      <span className="text-sm font-medium">
                        {feature.importance.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-400 rounded-full"
                        style={{ width: `${feature.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Performance</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-2">
                  <div className="text-sm text-slate-400 mb-1">Journalier</div>
                  <div className={`flex items-center ${
                    prediction.performance.daily >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {prediction.performance.daily >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {prediction.performance.daily >= 0 ? '+' : ''}
                    {prediction.performance.daily.toFixed(2)}%
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <div className="text-sm text-slate-400 mb-1">Hebdomadaire</div>
                  <div className={`flex items-center ${
                    prediction.performance.weekly >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {prediction.performance.weekly >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {prediction.performance.weekly >= 0 ? '+' : ''}
                    {prediction.performance.weekly.toFixed(2)}%
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-2">
                  <div className="text-sm text-slate-400 mb-1">Mensuel</div>
                  <div className={`flex items-center ${
                    prediction.performance.monthly >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {prediction.performance.monthly >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {prediction.performance.monthly >= 0 ? '+' : ''}
                    {prediction.performance.monthly.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
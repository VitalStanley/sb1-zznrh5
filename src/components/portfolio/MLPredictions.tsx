import React from 'react';
import { Brain, Target, AlertTriangle, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

interface Prediction {
  asset: string;
  direction: 'up' | 'down';
  probability: number;
  targetPrice: number;
  timeframe: string;
  confidence: number;
  signals: {
    technical: string[];
    sentiment: string[];
    volume: string[];
  };
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
  };
}

export default function MLPredictions() {
  const [predictions, setPredictions] = React.useState<Prediction[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = React.useState('4H');

  React.useEffect(() => {
    // Simuler les prédictions ML
    const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL'];
    const newPredictions = assets.map(asset => ({
      asset,
      direction: Math.random() > 0.5 ? 'up' : 'down',
      probability: 60 + Math.random() * 35,
      targetPrice: 1000 + Math.random() * 1000,
      timeframe: selectedTimeframe,
      confidence: 70 + Math.random() * 25,
      signals: {
        technical: [
          'Tendance haussière confirmée',
          'Support majeur testé',
          'Momentum positif'
        ],
        sentiment: [
          'Sentiment global positif',
          'Intérêt institutionnel',
          'Actualités favorables'
        ],
        volume: [
          'Volume en augmentation',
          'Accumulation détectée',
          'Liquidité suffisante'
        ]
      },
      metrics: {
        accuracy: 75 + Math.random() * 20,
        precision: 70 + Math.random() * 25,
        recall: 65 + Math.random() * 30
      }
    }));

    setPredictions(newPredictions);
  }, [selectedTimeframe]);

  const timeframes = [
    { id: '1H', label: '1 Heure' },
    { id: '4H', label: '4 Heures' },
    { id: '1D', label: '1 Jour' },
    { id: '1W', label: '1 Semaine' }
  ];

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold">Prédictions Machine Learning</h2>
        </div>
        <div className="flex space-x-2">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.id}
              onClick={() => setSelectedTimeframe(timeframe.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {predictions.map((prediction) => (
          <div
            key={prediction.asset}
            className={`bg-slate-700 rounded-lg p-4 border-l-4 ${
              prediction.direction === 'up' ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">{prediction.asset}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    prediction.direction === 'up'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {prediction.direction === 'up' ? 'HAUSSE' : 'BAISSE'}
                  </span>
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Horizon: {prediction.timeframe}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {prediction.targetPrice.toFixed(2)}
                </div>
                <div className="text-sm text-slate-400">
                  Prix Cible
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Probabilité</div>
                <div className="text-lg font-bold text-blue-400">
                  {prediction.probability.toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Confiance</div>
                <div className="text-lg font-bold text-purple-400">
                  {prediction.confidence.toFixed(1)}%
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Précision</div>
                <div className="text-lg font-bold text-emerald-400">
                  {prediction.metrics.precision.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-blue-400">
                  Signaux Techniques
                </h4>
                <ul className="text-sm space-y-1">
                  {prediction.signals.technical.map((signal, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2 text-purple-400">
                  Analyse Sentiment
                </h4>
                <ul className="text-sm space-y-1">
                  {prediction.signals.sentiment.map((signal, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2 text-emerald-400">
                  Analyse Volume
                </h4>
                <ul className="text-sm space-y-1">
                  {prediction.signals.volume.map((signal, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
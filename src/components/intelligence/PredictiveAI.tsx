import React from 'react';
import { Brain, Target, AlertTriangle, TrendingUp, TrendingDown, BarChart2, Activity } from 'lucide-react';

interface AIPrediction {
  asset: string;
  prediction: {
    direction: 'up' | 'down' | 'sideways';
    probability: number;
    timeframe: string;
    priceTargets: {
      low: number;
      high: number;
      expected: number;
    };
  };
  signals: {
    technical: string[];
    fundamental: string[];
    sentiment: string[];
  };
  confidence: number;
  models: {
    name: string;
    accuracy: number;
    prediction: 'buy' | 'sell' | 'hold';
    weight: number;
  }[];
  timestamp: string;
}

export default function PredictiveAI() {
  const [predictions, setPredictions] = React.useState<AIPrediction[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = React.useState('1D');

  React.useEffect(() => {
    // Simuler les prédictions IA
    const generatePredictions = () => {
      const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'GOOGL'];
      return assets.map(asset => ({
        asset,
        prediction: {
          direction: ['up', 'down', 'sideways'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'sideways',
          probability: 60 + Math.random() * 35,
          timeframe: selectedTimeframe,
          priceTargets: {
            low: 1000 - Math.random() * 100,
            high: 1000 + Math.random() * 100,
            expected: 1000 + (Math.random() - 0.5) * 50
          }
        },
        signals: {
          technical: [
            'Convergence des moyennes mobiles',
            'RSI en zone neutre',
            'Volume en augmentation'
          ],
          fundamental: [
            'Croissance des revenus positive',
            'Sentiment du marché favorable',
            'Contexte macro-économique stable'
          ],
          sentiment: [
            'Intérêt social en hausse',
            'Couverture médiatique positive',
            'Sentiment des investisseurs optimiste'
          ]
        },
        confidence: 70 + Math.random() * 25,
        models: [
          {
            name: 'Deep Learning',
            accuracy: 75 + Math.random() * 20,
            prediction: ['buy', 'sell', 'hold'][Math.floor(Math.random() * 3)] as 'buy' | 'sell' | 'hold',
            weight: 0.4
          },
          {
            name: 'Random Forest',
            accuracy: 70 + Math.random() * 20,
            prediction: ['buy', 'sell', 'hold'][Math.floor(Math.random() * 3)] as 'buy' | 'sell' | 'hold',
            weight: 0.3
          },
          {
            name: 'LSTM',
            accuracy: 72 + Math.random() * 20,
            prediction: ['buy', 'sell', 'hold'][Math.floor(Math.random() * 3)] as 'buy' | 'sell' | 'hold',
            weight: 0.3
          }
        ],
        timestamp: new Date().toLocaleTimeString()
      }));
    };

    setPredictions(generatePredictions());

    const interval = setInterval(() => {
      setPredictions(generatePredictions());
    }, 10000);

    return () => clearInterval(interval);
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
          <h2 className="text-xl font-bold">Prédictions IA Avancées</h2>
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
              prediction.prediction.direction === 'up' ? 'border-green-500' :
              prediction.prediction.direction === 'down' ? 'border-red-500' :
              'border-yellow-500'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{prediction.asset}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`flex items-center ${
                    prediction.prediction.direction === 'up' ? 'text-green-400' :
                    prediction.prediction.direction === 'down' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {prediction.prediction.direction === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : prediction.prediction.direction === 'down' ? (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    ) : (
                      <Activity className="h-4 w-4 mr-1" />
                    )}
                    {prediction.prediction.probability.toFixed(1)}% de probabilité
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Confiance</div>
                <div className="text-xl font-bold text-blue-400">
                  {prediction.confidence.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Cible Basse</div>
                <div className="font-mono font-bold text-red-400">
                  {prediction.prediction.priceTargets.low.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Cible Attendue</div>
                <div className="font-mono font-bold text-blue-400">
                  {prediction.prediction.priceTargets.expected.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Cible Haute</div>
                <div className="font-mono font-bold text-green-400">
                  {prediction.prediction.priceTargets.high.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Modèles IA</h4>
              <div className="space-y-2">
                {prediction.models.map((model, index) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{model.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          model.prediction === 'buy' ? 'bg-green-500/20 text-green-400' :
                          model.prediction === 'sell' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {model.prediction.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm">
                        {model.accuracy.toFixed(1)}% précision
                      </span>
                    </div>
                    <div className="h-1 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-full"
                        style={{ width: `${model.weight * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-blue-400">
                  Signaux Techniques
                </h4>
                <ul className="text-sm space-y-1">
                  {prediction.signals.technical.map((signal, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mr-2" />
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2 text-purple-400">
                  Fondamentaux
                </h4>
                <ul className="text-sm space-y-1">
                  {prediction.signals.fundamental.map((signal, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1 h-1 rounded-full bg-purple-400 mr-2" />
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2 text-green-400">
                  Sentiment
                </h4>
                <ul className="text-sm space-y-1">
                  {prediction.signals.sentiment.map((signal, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1 h-1 rounded-full bg-green-400 mr-2" />
                      {signal}
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
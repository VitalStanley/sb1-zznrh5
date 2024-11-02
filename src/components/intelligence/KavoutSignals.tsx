import React from 'react';
import { Brain, Target, AlertTriangle, Activity } from 'lucide-react';

interface KavoutSignal {
  asset: string;
  kScore: number;
  signals: {
    type: string;
    strength: number;
    confidence: number;
    description: string;
  }[];
  patterns: {
    name: string;
    probability: number;
    timeframe: string;
  }[];
  timestamp: string;
}

export default function KavoutSignals() {
  const [signals, setSignals] = React.useState<KavoutSignal[]>([]);

  React.useEffect(() => {
    // Simuler les signaux Kavout
    const generateSignals = () => {
      const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'GOOGL'];
      return assets.map(asset => ({
        asset,
        kScore: Math.random() * 100,
        signals: [
          {
            type: 'Momentum',
            strength: Math.random() * 100,
            confidence: 60 + Math.random() * 40,
            description: 'Fort momentum haussier détecté'
          },
          {
            type: 'Volume',
            strength: Math.random() * 100,
            confidence: 60 + Math.random() * 40,
            description: 'Accumulation significative'
          },
          {
            type: 'Pattern',
            strength: Math.random() * 100,
            confidence: 60 + Math.random() * 40,
            description: 'Formation en triangle ascendant'
          }
        ],
        patterns: [
          {
            name: 'Double Bottom',
            probability: 60 + Math.random() * 40,
            timeframe: '4H'
          },
          {
            name: 'Bull Flag',
            probability: 60 + Math.random() * 40,
            timeframe: '1D'
          }
        ],
        timestamp: new Date().toLocaleTimeString()
      }));
    };

    setSignals(generateSignals());

    const interval = setInterval(() => {
      setSignals(generateSignals());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-emerald-400" />
        <h2 className="text-xl font-bold">Signaux Kavout</h2>
      </div>

      <div className="space-y-4">
        {signals.map((signal) => (
          <div
            key={signal.asset}
            className="bg-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{signal.asset}</h3>
              <div className="text-right">
                <div className="text-sm text-slate-400">K-Score</div>
                <div className="text-xl font-bold text-emerald-400">
                  {signal.kScore.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {signal.signals.map((s, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-blue-400" />
                      <span className="font-medium">{s.type}</span>
                    </div>
                    <span className="text-sm">
                      {s.confidence.toFixed(1)}% confiance
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-full"
                        style={{ width: `${s.strength}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">{s.description}</p>
                </div>
              ))}

              <div className="bg-slate-800 rounded-lg p-3">
                <h4 className="font-medium mb-2">Patterns Détectés</h4>
                <div className="space-y-2">
                  {signal.patterns.map((pattern, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">{pattern.name}</span>
                        <span className="text-xs text-slate-400">
                          ({pattern.timeframe})
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {pattern.probability.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
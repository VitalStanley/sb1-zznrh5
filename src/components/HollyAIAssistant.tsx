import React from 'react';
import { Brain, Target, Sparkles, AlertTriangle } from 'lucide-react';

interface AIOpportunity {
  id: string;
  market: string;
  symbol: string;
  type: 'entry' | 'exit';
  confidence: number;
  analysis: {
    technical: string[];
    sentiment: string[];
    risk: string[];
  };
  timestamp: string;
  prediction: {
    direction: 'up' | 'down';
    targetPrice: number;
    stopLoss: number;
    timeframe: string;
  };
}

export default function HollyAIAssistant() {
  const [opportunities, setOpportunities] = React.useState<AIOpportunity[]>([]);

  React.useEffect(() => {
    // Simuler les analyses de Holly AI
    const interval = setInterval(() => {
      const newOpportunity: AIOpportunity = {
        id: Date.now().toString(),
        market: ['Crypto', 'Forex', 'Actions'][Math.floor(Math.random() * 3)],
        symbol: ['BTC/USD', 'EUR/USD', 'AAPL'][Math.floor(Math.random() * 3)],
        type: Math.random() > 0.5 ? 'entry' : 'exit',
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
        analysis: {
          technical: [
            'Divergence RSI haussière',
            'Support majeur testé 3 fois',
            'MACD en zone de retournement'
          ],
          sentiment: [
            'Sentiment global positif',
            'Accumulation institutionnelle',
            'Actualités favorables'
          ],
          risk: [
            'Volatilité modérée',
            'Volume en augmentation',
            'Liquidité suffisante'
          ]
        },
        timestamp: new Date().toLocaleTimeString(),
        prediction: {
          direction: Math.random() > 0.5 ? 'up' : 'down',
          targetPrice: 100 + Math.random() * 50,
          stopLoss: 90 + Math.random() * 10,
          timeframe: '4h'
        }
      };

      setOpportunities(prev => [newOpportunity, ...prev].slice(0, 3));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-purple-400" />
        <h2 className="text-xl font-bold">Holly AI - Analyse Avancée</h2>
      </div>

      {opportunities.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <Sparkles className="h-8 w-8 mx-auto mb-3" />
          <p>Holly AI analyse les marchés...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className={`bg-slate-700 rounded-lg p-4 border-l-4 ${
                opp.type === 'entry'
                  ? opp.prediction.direction === 'up'
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-yellow-500'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{opp.symbol}</span>
                    <span className="text-sm px-2 py-1 rounded-full bg-slate-600">
                      {opp.market}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium">
                        {opp.confidence}% confiance
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    Analysé à {opp.timestamp}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  opp.type === 'entry'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {opp.type === 'entry' ? 'Entrée Possible' : 'Sortie Conseillée'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-purple-400">
                    Analyse Technique
                  </h4>
                  <ul className="text-sm space-y-1">
                    {opp.analysis.technical.map((point, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1 h-1 rounded-full bg-purple-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-blue-400">
                    Analyse Sentiment
                  </h4>
                  <ul className="text-sm space-y-1">
                    {opp.analysis.sentiment.map((point, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-emerald-400">
                    Analyse Risque
                  </h4>
                  <ul className="text-sm space-y-1">
                    {opp.analysis.risk.map((point, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-sm text-slate-400">Prix Cible</div>
                      <div className="font-mono font-bold text-emerald-400">
                        {opp.prediction.targetPrice.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Stop Loss</div>
                      <div className="font-mono font-bold text-red-400">
                        {opp.prediction.stopLoss.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Horizon</div>
                      <div className="font-mono font-bold text-blue-400">
                        {opp.prediction.timeframe}
                      </div>
                    </div>
                  </div>
                  <AlertTriangle className={`h-6 w-6 ${
                    opp.prediction.direction === 'up'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
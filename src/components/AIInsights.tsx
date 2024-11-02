import React from 'react';
import { Brain, TrendingUp, TrendingDown, BarChart2, AlertTriangle, Clock } from 'lucide-react';

interface MarketInsight {
  id: string;
  market: string;
  type: 'trend' | 'pattern' | 'anomaly' | 'correlation';
  confidence: number;
  summary: string;
  details: string[];
  impact: 'positive' | 'negative' | 'neutral';
  timestamp: string;
  metrics: {
    strength: number;
    volatility: number;
    momentum: number;
  };
  recommendations: string[];
}

export default function AIInsights() {
  const [insights, setInsights] = React.useState<MarketInsight[]>([]);
  const [selectedInsight, setSelectedInsight] = React.useState<string | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newInsight: MarketInsight = {
        id: Date.now().toString(),
        market: ['Crypto', 'Forex', 'Actions'][Math.floor(Math.random() * 3)],
        type: ['trend', 'pattern', 'anomaly', 'correlation'][Math.floor(Math.random() * 4)] as MarketInsight['type'],
        confidence: 70 + Math.random() * 25,
        summary: 'Tendance haussière confirmée par plusieurs indicateurs techniques',
        details: [
          'Convergence des moyennes mobiles',
          'Volume en augmentation progressive',
          'Support dynamique respecté',
          'Momentum positif sur plusieurs timeframes'
        ],
        impact: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as MarketInsight['impact'],
        timestamp: new Date().toLocaleTimeString(),
        metrics: {
          strength: Math.random() * 100,
          volatility: Math.random() * 100,
          momentum: Math.random() * 100
        },
        recommendations: [
          'Maintenir les positions longues',
          'Surveiller le niveau de résistance à 45000',
          'Stop loss suggéré à -5% sous le support'
        ]
      };

      setInsights(prev => [newInsight, ...prev].slice(0, 5));
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-bold">Analyses IA Avancées</h2>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`bg-slate-700 rounded-lg p-4 cursor-pointer transition-all ${
              selectedInsight === insight.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  insight.impact === 'positive' ? 'bg-green-500/20 text-green-400' :
                  insight.impact === 'negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {insight.market}
                </span>
                <span className="text-sm text-slate-400 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {insight.timestamp}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`h-4 w-4 ${
                  insight.confidence > 85 ? 'text-green-400' :
                  insight.confidence > 70 ? 'text-yellow-400' :
                  'text-red-400'
                }`} />
                <span className="text-sm font-medium">
                  {insight.confidence.toFixed(1)}% confiance
                </span>
              </div>
            </div>

            <p className="text-sm mb-3">{insight.summary}</p>

            {selectedInsight === insight.id && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">Force</div>
                    <div className="flex items-center">
                      <div className="h-2 flex-1 bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-400 rounded-full"
                          style={{ width: `${insight.metrics.strength}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {insight.metrics.strength.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">Volatilité</div>
                    <div className="flex items-center">
                      <div className="h-2 flex-1 bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-400 rounded-full"
                          style={{ width: `${insight.metrics.volatility}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {insight.metrics.volatility.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">Momentum</div>
                    <div className="flex items-center">
                      <div className="h-2 flex-1 bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${insight.metrics.momentum}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {insight.metrics.momentum.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Détails de l'Analyse</h4>
                  <ul className="space-y-1">
                    {insight.details.map((detail, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Recommandations</h4>
                  <ul className="space-y-1">
                    {insight.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center text-sm text-emerald-400">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
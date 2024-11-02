import React from 'react';
import { Target, TrendingUp, TrendingDown, AlertTriangle, Brain, LineChart, BarChart2, Activity } from 'lucide-react';

interface PositionRecommendation {
  asset: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  price: {
    current: number;
    target: number;
    stopLoss: number;
  };
  timeframe: string;
  analysis: {
    technical: {
      score: number;
      signals: string[];
    };
    fundamental: {
      score: number;
      signals: string[];
    };
    ai: {
      score: number;
      signals: string[];
    };
    sentiment: {
      score: number;
      signals: string[];
    };
  };
  risk: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
  };
  sources: {
    name: string;
    recommendation: 'buy' | 'sell' | 'hold';
    confidence: number;
  }[];
}

export default function Positions() {
  const [recommendations, setRecommendations] = React.useState<PositionRecommendation[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = React.useState('1D');

  React.useEffect(() => {
    // Simuler l'agrégation des analyses
    const generateRecommendations = () => {
      const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'GOOGL'];
      return assets.map(asset => {
        const technicalScore = Math.random() * 100;
        const fundamentalScore = Math.random() * 100;
        const aiScore = Math.random() * 100;
        const sentimentScore = Math.random() * 100;
        
        const averageScore = (technicalScore + fundamentalScore + aiScore + sentimentScore) / 4;
        const action: 'buy' | 'sell' | 'hold' = 
          averageScore > 70 ? 'buy' :
          averageScore < 30 ? 'sell' : 'hold';

        const basePrice = 1000 + Math.random() * 50000;

        return {
          asset,
          action,
          confidence: 60 + Math.random() * 35,
          price: {
            current: basePrice,
            target: basePrice * (1 + (Math.random() * 0.2)),
            stopLoss: basePrice * (1 - (Math.random() * 0.1))
          },
          timeframe: selectedTimeframe,
          analysis: {
            technical: {
              score: technicalScore,
              signals: [
                'RSI en zone de survente',
                'MACD croisement haussier',
                'Support majeur testé'
              ]
            },
            fundamental: {
              score: fundamentalScore,
              signals: [
                'Croissance des revenus positive',
                'Marges en amélioration',
                'Position concurrentielle forte'
              ]
            },
            ai: {
              score: aiScore,
              signals: [
                'Pattern de retournement détecté',
                'Probabilité de hausse élevée',
                'Momentum positif prévu'
              ]
            },
            sentiment: {
              score: sentimentScore,
              signals: [
                'Sentiment social positif',
                'Couverture médiatique favorable',
                'Intérêt institutionnel croissant'
              ]
            }
          },
          risk: {
            level: averageScore > 70 ? 'low' :
                  averageScore > 40 ? 'medium' : 'high',
            factors: [
              'Volatilité du marché',
              'Exposition sectorielle',
              'Liquidité disponible'
            ]
          },
          sources: [
            {
              name: 'Analyse Technique',
              recommendation: technicalScore > 70 ? 'buy' :
                            technicalScore < 30 ? 'sell' : 'hold',
              confidence: technicalScore
            },
            {
              name: 'Intelligence Artificielle',
              recommendation: aiScore > 70 ? 'buy' :
                            aiScore < 30 ? 'sell' : 'hold',
              confidence: aiScore
            },
            {
              name: 'Analyse Fondamentale',
              recommendation: fundamentalScore > 70 ? 'buy' :
                            fundamentalScore < 30 ? 'sell' : 'hold',
              confidence: fundamentalScore
            },
            {
              name: 'Sentiment Market',
              recommendation: sentimentScore > 70 ? 'buy' :
                            sentimentScore < 30 ? 'sell' : 'hold',
              confidence: sentimentScore
            }
          ]
        };
      });
    };

    setRecommendations(generateRecommendations());

    const interval = setInterval(() => {
      setRecommendations(generateRecommendations());
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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl font-bold">Recommandations de Positions</h2>
          </div>
          <div className="flex space-x-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {recommendations.map((rec) => (
            <div
              key={rec.asset}
              className={`bg-slate-700 rounded-lg p-6 border-l-4 ${
                rec.action === 'buy' ? 'border-green-500' :
                rec.action === 'sell' ? 'border-red-500' :
                'border-yellow-500'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">{rec.asset}</h3>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className={`flex items-center px-3 py-1 rounded-lg text-sm font-semibold ${
                      rec.action === 'buy' ? 'bg-green-500/20 text-green-400' :
                      rec.action === 'sell' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {rec.action === 'buy' ? (
                        <><TrendingUp className="h-4 w-4 mr-2" /> ACHETER</>
                      ) : rec.action === 'sell' ? (
                        <><TrendingDown className="h-4 w-4 mr-2" /> VENDRE</>
                      ) : (
                        <><Activity className="h-4 w-4 mr-2" /> CONSERVER</>
                      )}
                    </span>
                    <span className="text-sm text-slate-400">
                      Confiance: {rec.confidence.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Prix Actuel</div>
                  <div className="text-2xl font-bold font-mono">
                    {rec.price.current.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <LineChart className="h-4 w-4 text-blue-400" />
                    <h4 className="font-medium">Technique</h4>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    {rec.analysis.technical.score.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart2 className="h-4 w-4 text-purple-400" />
                    <h4 className="font-medium">Fondamental</h4>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">
                    {rec.analysis.fundamental.score.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-4 w-4 text-emerald-400" />
                    <h4 className="font-medium">IA</h4>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {rec.analysis.ai.score.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="h-4 w-4 text-yellow-400" />
                    <h4 className="font-medium">Sentiment</h4>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {rec.analysis.sentiment.score.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-800 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Objectifs de Prix</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Target</span>
                      <span className="font-mono text-green-400">
                        {rec.price.target.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Stop Loss</span>
                      <span className="font-mono text-red-400">
                        {rec.price.stopLoss.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Risk/Reward</span>
                      <span className="font-mono">
                        {((rec.price.target - rec.price.current) / 
                          (rec.price.current - rec.price.stopLoss)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Évaluation du Risque</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.risk.level === 'low' ? 'bg-green-500/20 text-green-400' :
                      rec.risk.level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {rec.risk.level === 'low' ? 'Faible' :
                       rec.risk.level === 'medium' ? 'Moyen' : 'Élevé'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {rec.risk.factors.map((factor, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <AlertTriangle className="h-3 w-3 text-yellow-400 mr-2" />
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="font-medium mb-3">Consensus des Sources</h4>
                <div className="grid grid-cols-2 gap-4">
                  {rec.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{source.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          source.recommendation === 'buy' ? 'bg-green-500/20 text-green-400' :
                          source.recommendation === 'sell' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {source.recommendation === 'buy' ? 'ACHAT' :
                           source.recommendation === 'sell' ? 'VENTE' : 'NEUTRE'}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {source.confidence.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
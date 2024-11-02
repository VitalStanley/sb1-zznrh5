import React from 'react';
import { LineChart, TrendingUp, TrendingDown, Clock, Target, AlertTriangle, BarChart2, ArrowRight } from 'lucide-react';

interface PatternAlert {
  id: string;
  pattern: {
    type: 'triangle' | 'flag' | 'channel' | 'head_shoulders' | 'double_top' | 'double_bottom' | 'wedge';
    subtype?: 'ascending' | 'descending' | 'symmetrical';
    quality: number;
    completion: number;
  };
  symbol: string;
  timeframe: string;
  direction: 'bullish' | 'bearish' | 'neutral';
  price: {
    current: number;
    target: number;
    stopLoss: number;
  };
  probability: number;
  timestamp: string;
  volume: {
    current: number;
    average: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
  confirmation: {
    indicators: string[];
    confidence: number;
  };
}

let alertCounter = 0;

export default function AutochartistAlerts() {
  const [alerts, setAlerts] = React.useState<PatternAlert[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = React.useState('ALL');

  React.useEffect(() => {
    // Simuler la détection de motifs en temps réel
    const generatePattern = (): PatternAlert => {
      const patterns = ['triangle', 'flag', 'channel', 'head_shoulders', 'double_top', 'double_bottom', 'wedge'];
      const symbols = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'GOOGL'];
      const timeframes = ['5m', '15m', '1h', '4h', '1d'];
      const basePrice = 1000 + Math.random() * 50000;
      alertCounter += 1;

      return {
        id: `pattern-${Date.now()}-${alertCounter}`,
        pattern: {
          type: patterns[Math.floor(Math.random() * patterns.length)] as PatternAlert['pattern']['type'],
          subtype: Math.random() > 0.5 ? 
            ['ascending', 'descending', 'symmetrical'][Math.floor(Math.random() * 3)] as PatternAlert['pattern']['subtype'] : 
            undefined,
          quality: Math.floor(Math.random() * 30) + 70, // 70-100
          completion: Math.floor(Math.random() * 40) + 60, // 60-100
        },
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
        direction: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)] as PatternAlert['direction'],
        price: {
          current: basePrice,
          target: basePrice * (1 + (Math.random() * 0.1)),
          stopLoss: basePrice * (1 - (Math.random() * 0.05))
        },
        probability: Math.floor(Math.random() * 30) + 70,
        timestamp: new Date().toLocaleTimeString(),
        volume: {
          current: Math.floor(Math.random() * 1000000),
          average: Math.floor(Math.random() * 800000),
          trend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)] as PatternAlert['volume']['trend']
        },
        confirmation: {
          indicators: [
            'RSI confirme la tendance',
            'MACD en phase avec le motif',
            'Volume supporte le mouvement'
          ],
          confidence: Math.floor(Math.random() * 30) + 70
        }
      };
    };

    // Générer quelques alertes initiales
    const initialAlerts = Array.from({ length: 5 }, generatePattern);
    setAlerts(initialAlerts);

    // Ajouter de nouvelles alertes périodiquement
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de générer une nouvelle alerte
        setAlerts(prev => [generatePattern(), ...prev].slice(0, 10));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const timeframes = [
    { id: 'ALL', label: 'Tous' },
    { id: '5m', label: '5 min' },
    { id: '15m', label: '15 min' },
    { id: '1h', label: '1 heure' },
    { id: '4h', label: '4 heures' },
    { id: '1d', label: '1 jour' }
  ];

  const getPatternDescription = (pattern: PatternAlert['pattern']) => {
    const subtypeText = pattern.subtype ? ` ${pattern.subtype}` : '';
    const patternNames: { [key: string]: string } = {
      triangle: 'Triangle',
      flag: 'Drapeau',
      channel: 'Canal',
      head_shoulders: 'Tête et Épaules',
      double_top: 'Double Top',
      double_bottom: 'Double Bottom',
      wedge: 'Coin'
    };
    return `${patternNames[pattern.type]}${subtypeText}`;
  };

  const filteredAlerts = alerts.filter(
    alert => selectedTimeframe === 'ALL' || alert.timeframe === selectedTimeframe
  );

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <LineChart className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold">Autochartist - Détection de Motifs</h2>
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

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-slate-700 rounded-lg p-4 border-l-4 ${
              alert.direction === 'bullish' ? 'border-green-500' :
              alert.direction === 'bearish' ? 'border-red-500' :
              'border-yellow-500'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{alert.symbol}</span>
                  <span className="text-sm px-2 py-1 rounded-full bg-slate-600">
                    {alert.timeframe}
                  </span>
                  <span className={`flex items-center text-sm px-2 py-1 rounded-full ${
                    alert.direction === 'bullish' ? 'bg-green-500/20 text-green-400' :
                    alert.direction === 'bearish' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {alert.direction === 'bullish' ? (
                      <><TrendingUp className="h-3 w-3 mr-1" /> Haussier</>
                    ) : alert.direction === 'bearish' ? (
                      <><TrendingDown className="h-3 w-3 mr-1" /> Baissier</>
                    ) : (
                      'Neutre'
                    )}
                  </span>
                </div>
                <div className="text-lg font-bold mt-1">
                  {getPatternDescription(alert.pattern)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {alert.timestamp}
                </div>
                <div className="flex items-center mt-1">
                  <Target className="h-4 w-4 text-emerald-400 mr-1" />
                  <span className="font-medium">
                    {alert.probability}% probabilité
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Qualité du Motif</div>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        alert.pattern.quality > 90 ? 'bg-green-400' :
                        alert.pattern.quality > 80 ? 'bg-blue-400' :
                        'bg-yellow-400'
                      }`}
                      style={{ width: `${alert.pattern.quality}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {alert.pattern.quality}%
                  </span>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-sm text-slate-400 mb-1">Complétion</div>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${alert.pattern.completion}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {alert.pattern.completion}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Prix Actuel</div>
                <div className="font-mono font-bold">
                  {alert.price.current.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Objectif</div>
                <div className="font-mono font-bold text-green-400">
                  {alert.price.target.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Stop Loss</div>
                <div className="font-mono font-bold text-red-400">
                  {alert.price.stopLoss.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Confirmations</h4>
                <div className="flex items-center text-sm">
                  <AlertTriangle className="h-4 w-4 text-emerald-400 mr-1" />
                  <span>{alert.confirmation.confidence}% confiance</span>
                </div>
              </div>
              <div className="space-y-1">
                {alert.confirmation.indicators.map((indicator, index) => (
                  <div key={`${alert.id}-indicator-${index}`} className="flex items-center text-sm text-slate-300">
                    <ArrowRight className="h-3 w-3 text-emerald-400 mr-1" />
                    {indicator}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
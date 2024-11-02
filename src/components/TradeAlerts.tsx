import React from 'react';
import { Timer, TrendingUp, TrendingDown, Target, AlertTriangle, ArrowRight } from 'lucide-react';

interface TradeAlert {
  id: string;
  symbol: string;
  market: string;
  type: 'entry' | 'exit';
  direction: 'long' | 'short';
  price: number;
  confidence: number;
  timestamp: string;
  duration: {
    recommended: string;
    confidence: number;
    reason: string;
  };
  signals: {
    technical: string[];
    ai: string[];
    risk: string[];
  };
  stopLoss: number;
  takeProfit: number;
}

export default function TradeAlerts() {
  const [alerts, setAlerts] = React.useState<TradeAlert[]>([]);

  React.useEffect(() => {
    // Simuler les alertes en temps réel
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de générer une alerte
        const markets = ['Crypto', 'Forex', 'Actions', 'Indices'];
        const symbols = {
          Crypto: ['BTC/USD', 'ETH/USD', 'BNB/USD'],
          Forex: ['EUR/USD', 'GBP/USD', 'USD/JPY'],
          Actions: ['AAPL', 'GOOGL', 'TSLA'],
          Indices: ['S&P 500', 'CAC 40', 'DAX']
        };

        const market = markets[Math.floor(Math.random() * markets.length)];
        const symbol = symbols[market as keyof typeof symbols][Math.floor(Math.random() * 3)];
        const type = Math.random() > 0.5 ? 'entry' : 'exit';
        const direction = Math.random() > 0.5 ? 'long' : 'short';
        const basePrice = 1000 + Math.random() * 1000;

        const newAlert: TradeAlert = {
          id: Date.now().toString(),
          symbol,
          market,
          type,
          direction,
          price: basePrice,
          confidence: 70 + Math.random() * 25,
          timestamp: new Date().toLocaleTimeString(),
          duration: {
            recommended: ['4h', '1j', '3j', '1sem'][Math.floor(Math.random() * 4)],
            confidence: 65 + Math.random() * 30,
            reason: 'Convergence des indicateurs techniques et analyse IA'
          },
          signals: {
            technical: [
              'RSI en zone de survente',
              'MACD croisement haussier',
              'Support majeur testé'
            ],
            ai: [
              'Forte probabilité de retournement',
              'Pattern reconnu par Holly AI',
              'Momentum favorable'
            ],
            risk: [
              'Volatilité modérée',
              'Volume en augmentation',
              'Spread normal'
            ]
          },
          stopLoss: basePrice * (1 - (Math.random() * 0.05)),
          takeProfit: basePrice * (1 + (Math.random() * 0.1))
        };

        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Timer className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold">Alertes d'Entrée/Sortie</h2>
        </div>
        <div className="text-sm text-slate-400">
          Mise à jour en temps réel
        </div>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <AlertTriangle className="h-8 w-8 mx-auto mb-3" />
            <p>En attente de signaux de trading...</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-slate-700 rounded-lg p-4 border-l-4 ${
                alert.type === 'entry'
                  ? alert.direction === 'long'
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-yellow-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{alert.symbol}</span>
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-600">
                      {alert.market}
                    </span>
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                      alert.type === 'entry'
                        ? alert.direction === 'long'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {alert.type === 'entry' ? (
                        alert.direction === 'long' ? (
                          <><TrendingUp className="h-3 w-3 mr-1" /> ACHAT</> 
                        ) : (
                          <><TrendingDown className="h-3 w-3 mr-1" /> VENTE</>
                        )
                      ) : (
                        'SORTIE'
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    Signal généré à {alert.timestamp}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg">
                    {alert.price.toFixed(2)}
                  </div>
                  <div className="flex items-center text-sm text-emerald-400">
                    <Target className="h-4 w-4 mr-1" />
                    {alert.confidence.toFixed(1)}% confiance
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-purple-400">
                    Signaux Techniques
                  </h4>
                  <ul className="text-sm space-y-1">
                    {alert.signals.technical.map((signal, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <ArrowRight className="h-3 w-3 text-purple-400" />
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-blue-400">
                    Analyse IA
                  </h4>
                  <ul className="text-sm space-y-1">
                    {alert.signals.ai.map((signal, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <ArrowRight className="h-3 w-3 text-blue-400" />
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-emerald-400">
                    Évaluation Risque
                  </h4>
                  <ul className="text-sm space-y-1">
                    {alert.signals.risk.map((signal, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <ArrowRight className="h-3 w-3 text-emerald-400" />
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-slate-400">Stop Loss</div>
                    <div className="font-mono text-red-400">
                      {alert.stopLoss.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Take Profit</div>
                    <div className="font-mono text-green-400">
                      {alert.takeProfit.toFixed(2)}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm text-slate-400">
                      Durée Recommandée
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-emerald-400">
                        {alert.duration.recommended}
                      </span>
                      <span className="text-sm text-slate-400">
                        ({alert.duration.confidence.toFixed(1)}% confiance)
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {alert.duration.reason}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
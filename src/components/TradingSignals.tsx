import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';

interface Signal {
  id: string;
  symbol: string;
  type: 'buy' | 'sell' | 'neutral';
  strength: 1 | 2 | 3;
  reason: string;
  timestamp: string;
  price: number;
  recommendedDuration: {
    timeframe: string;
    confidence: number;
    reason: string;
  };
}

export default function TradingSignals() {
  const [signals, setSignals] = React.useState<Signal[]>([]);

  const generateRecommendedDuration = (type: 'buy' | 'sell' | 'neutral', strength: number) => {
    const durations = {
      shortTerm: { timeframe: '1-4 heures', confidence: 75 },
      mediumTerm: { timeframe: '1-3 jours', confidence: 85 },
      longTerm: { timeframe: '1-2 semaines', confidence: 65 }
    };

    const reasons = {
      buy: {
        shortTerm: 'Momentum haussier fort mais volatilité élevée',
        mediumTerm: 'Tendance haussière confirmée sur plusieurs indicateurs',
        longTerm: 'Structure de marché haussière avec support solide'
      },
      sell: {
        shortTerm: 'Momentum baissier avec résistance proche',
        mediumTerm: 'Divergence baissière confirmée',
        longTerm: 'Retournement de tendance majeur'
      },
      neutral: {
        shortTerm: 'Marché en consolidation',
        mediumTerm: 'Zone de congestion importante',
        longTerm: 'Manque de direction claire'
      }
    };

    let duration;
    if (strength === 3) {
      duration = durations.mediumTerm;
    } else if (strength === 2) {
      duration = durations.shortTerm;
    } else {
      duration = durations.longTerm;
    }

    return {
      timeframe: duration.timeframe,
      confidence: duration.confidence,
      reason: reasons[type][duration.timeframe === durations.shortTerm.timeframe ? 'shortTerm' : 
                         duration.timeframe === durations.mediumTerm.timeframe ? 'mediumTerm' : 'longTerm']
    };
  };

  const getTradingViewSymbol = (symbol: string) => {
    const symbolMap: Record<string, string> = {
      'BTC/USD': 'BTCUSD',
      'ETH/USDT': 'ETHUSDT',
      'EUR/USD': 'EURUSD',
      'CAC40': 'CAC40',
      'AAPL': 'AAPL'
    };
    return symbolMap[symbol] || symbol;
  };

  const openTradingView = (symbol: string) => {
    const tvSymbol = getTradingViewSymbol(symbol);
    window.open(`https://www.tradingview.com/chart/?symbol=${tvSymbol}`, '_blank');
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      const type = ['buy', 'sell', 'neutral'][Math.floor(Math.random() * 3)] as 'buy' | 'sell' | 'neutral';
      const strength = [1, 2, 3][Math.floor(Math.random() * 3)] as 1 | 2 | 3;
      
      const newSignal: Signal = {
        id: Date.now().toString(),
        symbol: ['BTC/USD', 'ETH/USDT', 'EUR/USD', 'CAC40', 'AAPL'][Math.floor(Math.random() * 5)],
        type,
        strength,
        reason: 'Croisement MACD & RSI favorable',
        timestamp: new Date().toLocaleTimeString(),
        price: Math.random() * 1000,
        recommendedDuration: generateRecommendedDuration(type, strength)
      };

      setSignals(prev => [newSignal, ...prev].slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Signaux de Trading</h2>
      <div className="space-y-4">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className={`flex items-center justify-between p-4 rounded-lg ${
              signal.type === 'buy' 
                ? 'bg-green-500/10 border border-green-500/20' 
                : signal.type === 'sell'
                ? 'bg-red-500/10 border border-red-500/20'
                : 'bg-yellow-500/10 border border-yellow-500/20'
            }`}
          >
            <div className="flex items-center space-x-4">
              {signal.type === 'buy' ? (
                <ArrowUpCircle className="h-8 w-8 text-green-400" />
              ) : signal.type === 'sell' ? (
                <ArrowDownCircle className="h-8 w-8 text-red-400" />
              ) : (
                <AlertCircle className="h-8 w-8 text-yellow-400" />
              )}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{signal.symbol}</span>
                  <span className="text-sm px-2 py-1 rounded-full bg-slate-700">
                    {signal.type === 'buy' ? 'ACHAT' : signal.type === 'sell' ? 'VENTE' : 'NEUTRE'}
                  </span>
                  <div className="flex">
                    {Array.from({ length: signal.strength }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-4 mx-0.5 rounded-full ${
                          signal.type === 'buy' 
                            ? 'bg-green-400' 
                            : signal.type === 'sell'
                            ? 'bg-red-400'
                            : 'bg-yellow-400'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => openTradingView(signal.symbol)}
                    className="ml-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold flex items-center transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    TradingView
                  </button>
                </div>
                <p className="text-sm text-slate-300 mt-1">{signal.reason}</p>
                <div className="flex items-center mt-2 text-sm">
                  <Clock className="h-4 w-4 mr-2 text-emerald-400" />
                  <span className="font-medium text-emerald-400">
                    Durée recommandée: {signal.recommendedDuration.timeframe}
                  </span>
                  <span className="ml-2 text-slate-400">
                    (Confiance: {signal.recommendedDuration.confidence}%)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {signal.recommendedDuration.reason}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono">{signal.price.toFixed(2)}</div>
              <div className="text-sm text-slate-400">{signal.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
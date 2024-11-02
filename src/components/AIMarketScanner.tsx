import React, { useState, useEffect } from 'react';
import { Search, Eye, Bell, Filter, Zap, List, BarChart2, AlertTriangle } from 'lucide-react';

interface ScannerAlert {
  id: string;
  symbol: string;
  type: 'breakout' | 'momentum' | 'volatility' | 'pattern' | 'volume';
  priority: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  metrics: {
    value: number;
    change: number;
    threshold: number;
  };
}

interface WatchlistItem {
  symbol: string;
  confidence: number;
  patterns: string[];
  alerts: number;
}

interface ScannerFilter {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export default function AIMarketScanner() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'scanners' | 'watchlist'>('alerts');
  const [alerts, setAlerts] = useState<ScannerAlert[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [filters, setFilters] = useState<ScannerFilter[]>([
    {
      id: 'breakout',
      name: 'Breakouts',
      description: 'Détection des cassures de niveaux importants',
      active: true
    },
    {
      id: 'momentum',
      name: 'Momentum',
      description: 'Surveillance des mouvements directionnels forts',
      active: true
    },
    {
      id: 'volatility',
      name: 'Volatilité',
      description: 'Alertes sur les changements de volatilité',
      active: true
    },
    {
      id: 'pattern',
      name: 'Patterns',
      description: 'Reconnaissance des figures chartistes',
      active: true
    },
    {
      id: 'volume',
      name: 'Volume',
      description: 'Anomalies de volume significatives',
      active: true
    }
  ]);

  useEffect(() => {
    // Simuler la génération d'alertes en temps réel
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de générer une alerte
        const types: ScannerAlert['type'][] = ['breakout', 'momentum', 'volatility', 'pattern', 'volume'];
        const priorities: ScannerAlert['priority'][] = ['high', 'medium', 'low'];
        const symbols = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'TSLA', 'GOOGL'];
        
        const newAlert: ScannerAlert = {
          id: Date.now().toString(),
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          type: types[Math.floor(Math.random() * types.length)],
          priority: priorities[Math.floor(Math.random() * priorities.length)],
          message: 'Signal de trading détecté par l\'IA',
          timestamp: new Date().toLocaleTimeString(),
          metrics: {
            value: Math.random() * 100,
            change: (Math.random() * 10) - 5,
            threshold: 75 + Math.random() * 20
          }
        };

        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      }
    }, 5000);

    // Simuler la mise à jour de la watchlist
    const watchlistInterval = setInterval(() => {
      const newWatchlist: WatchlistItem[] = [
        {
          symbol: 'BTC/USD',
          confidence: 85 + Math.random() * 10,
          patterns: ['Double Bottom', 'Golden Cross'],
          alerts: Math.floor(Math.random() * 5)
        },
        {
          symbol: 'ETH/USD',
          confidence: 75 + Math.random() * 15,
          patterns: ['Bull Flag', 'Support Test'],
          alerts: Math.floor(Math.random() * 3)
        },
        {
          symbol: 'EUR/USD',
          confidence: 70 + Math.random() * 20,
          patterns: ['Channel Break', 'RSI Divergence'],
          alerts: Math.floor(Math.random() * 4)
        }
      ];
      setWatchlist(newWatchlist);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(watchlistInterval);
    };
  }, []);

  const toggleFilter = (filterId: string) => {
    setFilters(prev => prev.map(filter => 
      filter.id === filterId ? { ...filter, active: !filter.active } : filter
    ));
  };

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Search className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold">Scanner IA</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'alerts'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>Alertes</span>
          </button>
          <button
            onClick={() => setActiveTab('scanners')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'scanners'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Scanners</span>
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'watchlist'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Watchlist</span>
          </button>
        </div>
      </div>

      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-slate-700 rounded-lg p-4 border-l-4 ${
                alert.priority === 'high'
                  ? 'border-red-500'
                  : alert.priority === 'medium'
                  ? 'border-yellow-500'
                  : 'border-blue-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{alert.symbol}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.priority === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : alert.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </span>
                  </div>
                  <span className="text-sm text-slate-400">{alert.timestamp}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    Score IA: {alert.metrics.threshold.toFixed(1)}%
                  </span>
                  <Zap className={`h-4 w-4 ${
                    alert.priority === 'high'
                      ? 'text-red-400'
                      : alert.priority === 'medium'
                      ? 'text-yellow-400'
                      : 'text-blue-400'
                  }`} />
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-2">{alert.message}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400">
                    Valeur: {alert.metrics.value.toFixed(2)}
                  </span>
                  <span className={alert.metrics.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {alert.metrics.change >= 0 ? '+' : ''}{alert.metrics.change.toFixed(2)}%
                  </span>
                </div>
                <button className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
                  Détails
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'scanners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className={`bg-slate-700 rounded-lg p-4 cursor-pointer transition-all ${
                filter.active ? 'ring-2 ring-emerald-500' : ''
              }`}
              onClick={() => toggleFilter(filter.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{filter.name}</h3>
                <div className={`w-4 h-4 rounded-full ${
                  filter.active ? 'bg-emerald-500' : 'bg-slate-500'
                }`} />
              </div>
              <p className="text-sm text-slate-300">{filter.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'watchlist' && (
        <div className="space-y-4">
          {watchlist.map((item) => (
            <div
              key={item.symbol}
              className="bg-slate-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-bold">{item.symbol}</span>
                  {item.alerts > 0 && (
                    <span className="flex items-center space-x-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{item.alerts} alertes</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium">
                    Confiance: {item.confidence.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.patterns.map((pattern, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-600 rounded-full text-xs"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
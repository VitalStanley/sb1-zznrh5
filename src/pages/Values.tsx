import React from 'react';
import { DollarSign, RefreshCw, Search, ArrowUpDown, Brain, TrendingUp, TrendingDown, AlertTriangle, Activity, X } from 'lucide-react';

interface MarketValue {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap?: number;
  lastUpdate: string;
  category: 'crypto' | 'forex' | 'stocks' | 'commodities' | 'indices';
}

interface MarketSignal {
  type: 'buy' | 'sell' | 'neutral';
  confidence: number;
  source: 'ai' | 'technical' | 'trading';
  reason: string[];
  timestamp: string;
  indicators?: {
    name: string;
    value: number;
    interpretation: string;
  }[];
}

export default function Values() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'symbol' | 'price' | 'change24h'>('symbol');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [marketValues, setMarketValues] = React.useState<MarketValue[]>([]);
  const [selectedMarket, setSelectedMarket] = React.useState<string | null>(null);
  const [signals, setSignals] = React.useState<MarketSignal[]>([]);

  React.useEffect(() => {
    // Initial market data
    const initialData: MarketValue[] = [
      {
        symbol: 'BTC/USD',
        name: 'Bitcoin',
        price: 69345.40,
        change24h: 2.5,
        volume: 28965471,
        marketCap: 824.5,
        lastUpdate: new Date().toLocaleTimeString(),
        category: 'crypto'
      },
      {
        symbol: 'ETH/USD',
        name: 'Ethereum',
        price: 3890.25,
        change24h: 1.8,
        volume: 15478963,
        marketCap: 269.8,
        lastUpdate: new Date().toLocaleTimeString(),
        category: 'crypto'
      },
      {
        symbol: 'EUR/USD',
        name: 'Euro/Dollar',
        price: 1.0892,
        change24h: -0.15,
        volume: 98562147,
        lastUpdate: new Date().toLocaleTimeString(),
        category: 'forex'
      }
    ];

    setMarketValues(initialData);

    // Update prices periodically
    const interval = setInterval(() => {
      setMarketValues(current =>
        current.map(market => ({
          ...market,
          price: market.price * (1 + (Math.random() - 0.5) * 0.001),
          change24h: market.change24h + (Math.random() - 0.5) * 0.1,
          lastUpdate: new Date().toLocaleTimeString()
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generateSignals = (symbol: string): MarketSignal[] => {
    return [
      {
        type: Math.random() > 0.6 ? 'buy' : Math.random() > 0.5 ? 'sell' : 'neutral',
        confidence: 70 + Math.random() * 25,
        source: 'ai',
        reason: [
          'Analyse des patterns historiques',
          'Corrélation avec les indicateurs macroéconomiques',
          'Sentiment du marché positif'
        ],
        timestamp: new Date().toLocaleTimeString(),
        indicators: [
          {
            name: 'Momentum AI',
            value: Math.random() * 100,
            interpretation: 'Fort potentiel haussier détecté'
          },
          {
            name: 'Risk Score',
            value: Math.random() * 100,
            interpretation: 'Risque modéré'
          }
        ]
      },
      {
        type: Math.random() > 0.6 ? 'buy' : Math.random() > 0.5 ? 'sell' : 'neutral',
        confidence: 65 + Math.random() * 30,
        source: 'technical',
        reason: [
          'RSI en zone de survente',
          'MACD croisement haussier',
          'Support majeur testé'
        ],
        timestamp: new Date().toLocaleTimeString(),
        indicators: [
          {
            name: 'RSI',
            value: 30 + Math.random() * 40,
            interpretation: 'Conditions de survente'
          },
          {
            name: 'MACD',
            value: -0.5 + Math.random(),
            interpretation: 'Signal d\'achat imminent'
          }
        ]
      },
      {
        type: Math.random() > 0.6 ? 'buy' : Math.random() > 0.5 ? 'sell' : 'neutral',
        confidence: 60 + Math.random() * 35,
        source: 'trading',
        reason: [
          'Volume en augmentation',
          'Breakout confirmé',
          'Accumulation institutionnelle'
        ],
        timestamp: new Date().toLocaleTimeString(),
        indicators: [
          {
            name: 'Volume Profile',
            value: Math.random() * 100,
            interpretation: 'Accumulation significative'
          },
          {
            name: 'Order Flow',
            value: Math.random() * 100,
            interpretation: 'Pression acheteuse dominante'
          }
        ]
      }
    ];
  };

  const handleMarketClick = (symbol: string) => {
    setSelectedMarket(symbol);
    setSignals(generateSignals(symbol));
  };

  const handleSort = (key: 'symbol' | 'price' | 'change24h') => {
    if (sortBy === key) {
      setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredValues = React.useMemo(() => {
    return marketValues
      .filter(market => 
        market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const modifier = sortDirection === 'asc' ? 1 : -1;
        if (sortBy === 'symbol') {
          return modifier * a.symbol.localeCompare(b.symbol);
        }
        return modifier * (a[sortBy] - b[sortBy]);
      });
  }, [marketValues, searchTerm, sortBy, sortDirection]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-bold mb-4 md:mb-0">Valeurs des Marchés</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Actualiser</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-700">
                <th className="pb-4 font-semibold text-slate-400">
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => handleSort('symbol')}
                  >
                    <span>Symbole</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="pb-4 font-semibold text-slate-400">
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => handleSort('price')}
                  >
                    <span>Prix (USD)</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="pb-4 font-semibold text-slate-400">
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => handleSort('change24h')}
                  >
                    <span>Variation 24h</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="pb-4 font-semibold text-slate-400">Volume</th>
                <th className="pb-4 font-semibold text-slate-400">Dernière MAJ</th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredValues.map((market) => (
                <tr
                  key={market.symbol}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer"
                  onClick={() => handleMarketClick(market.symbol)}
                >
                  <td className="py-4">
                    <div>
                      <div className="font-medium">{market.symbol}</div>
                      <div className="text-sm text-slate-400">{market.name}</div>
                    </div>
                  </td>
                  <td className="py-4 font-mono">
                    ${market.price.toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className={`py-4 ${
                    market.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <div className="flex items-center">
                      {market.change24h >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                    </div>
                  </td>
                  <td className="py-4 text-slate-400">
                    {(market.volume / 1000000).toFixed(1)}M
                  </td>
                  <td className="py-4 text-slate-400">
                    {market.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMarket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Brain className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold">
                    Recommandations pour {selectedMarket}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedMarket(null)}
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {signals.map((signal, index) => (
                  <div
                    key={index}
                    className={`bg-slate-700 rounded-lg p-4 border-l-4 ${
                      signal.type === 'buy' ? 'border-green-500' :
                      signal.type === 'sell' ? 'border-red-500' :
                      'border-yellow-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {signal.source === 'ai' ? (
                          <Brain className="h-5 w-5 text-purple-400" />
                        ) : signal.source === 'technical' ? (
                          <Activity className="h-5 w-5 text-blue-400" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        )}
                        <span className="font-semibold capitalize">
                          {signal.source === 'ai' ? 'Intelligence Artificielle' :
                           signal.source === 'technical' ? 'Analyse Technique' :
                           'Signaux Trading'}
                        </span>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        signal.type === 'buy' ? 'text-green-400' :
                        signal.type === 'sell' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {signal.type === 'buy' ? (
                          <TrendingUp className="h-5 w-5" />
                        ) : signal.type === 'sell' ? (
                          <TrendingDown className="h-5 w-5" />
                        ) : (
                          <Activity className="h-5 w-5" />
                        )}
                        <span className="font-bold">
                          {signal.type === 'buy' ? 'ACHAT' :
                           signal.type === 'sell' ? 'VENTE' :
                           'NEUTRE'}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-slate-400 mb-1">Confiance</div>
                      <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            signal.confidence > 80 ? 'bg-green-400' :
                            signal.confidence > 60 ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`}
                          style={{ width: `${signal.confidence}%` }}
                        />
                      </div>
                      <div className="text-right text-sm mt-1">
                        {signal.confidence.toFixed(1)}%
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {signal.reason.map((reason, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>

                    {signal.indicators && (
                      <div className="space-y-2">
                        {signal.indicators.map((indicator, i) => (
                          <div key={i} className="bg-slate-800 rounded-lg p-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-400">{indicator.name}</span>
                              <span className="font-mono">{indicator.value.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-emerald-400 mt-1">
                              {indicator.interpretation}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-slate-400 mt-4">
                      Mis à jour à {signal.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
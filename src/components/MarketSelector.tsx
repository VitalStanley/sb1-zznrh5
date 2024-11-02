import React from 'react';
import { Globe, Banknote, Bitcoin, TrendingUp, DollarSign, Building2, LineChart } from 'lucide-react';

const markets = [
  { id: 'stocks', name: 'Actions', icon: Building2 },
  { id: 'forex', name: 'Forex', icon: DollarSign },
  { id: 'crypto', name: 'Crypto', icon: Bitcoin },
  { id: 'futures', name: 'Contrats à Terme', icon: TrendingUp },
  { id: 'indices', name: 'Indices', icon: LineChart },
  { id: 'bonds', name: 'Obligations', icon: Banknote },
  { id: 'funds', name: 'Fonds', icon: Globe },
];

interface MarketSelectorProps {
  selectedMarket: string;
  onMarketChange: (marketId: string) => void;
}

export default function MarketSelector({ selectedMarket, onMarketChange }: MarketSelectorProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Sélection du Marché</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {markets.map((market) => {
          const Icon = market.icon;
          const isSelected = selectedMarket === market.id;
          
          return (
            <button
              key={market.id}
              onClick={() => onMarketChange(market.id)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                isSelected 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <Icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">{market.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
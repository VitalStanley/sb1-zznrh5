import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import MarketChart from './MarketChart';
import { useMarketData } from '../../hooks/useMarketData';

interface MarketGridProps {
  onMarketSelect: (marketId: string) => void;
}

export default function MarketGrid({ onMarketSelect }: MarketGridProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const marketData = useMarketData('all');

  const filteredMarkets = marketData.filter(market => 
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || market.category === selectedCategory)
  );

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un marché..."
            className="w-full bg-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="ml-4 p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMarkets.map((market) => (
          <div
            key={market.symbol}
            className="bg-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-600 transition-colors"
            onClick={() => onMarketSelect(market.symbol)}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">{market.symbol}</h3>
                <p className="text-sm text-slate-400">{market.name}</p>
              </div>
              <div className={`text-sm ${
                market.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {market.change >= 0 ? '+' : ''}{market.change}%
              </div>
            </div>
            <div className="h-24">
              <MarketChart
                data={market.chartData}
                change={market.change}
                height={96}
                width={300}
              />
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="font-mono font-bold">
                {market.price.toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-slate-400">
                Vol: {(market.volume / 1000).toFixed(0)}K
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { useMarketData } from '../../hooks/useMarketData';
import MarketDepth from './MarketDepth';
import OrderBook from './OrderBook';

interface MarketDetailsProps {
  marketId: string;
}

export default function MarketDetails({ marketId }: MarketDetailsProps) {
  const marketData = useMarketData('all').find(m => m.symbol === marketId);

  if (!marketData) {
    return null;
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">{marketData.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-400">Prix</div>
            <div className="text-2xl font-bold">
              {marketData.price.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Variation 24h</div>
            <div className={`text-2xl font-bold ${
              marketData.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {marketData.change >= 0 ? '+' : ''}{marketData.change}%
            </div>
          </div>
        </div>
      </div>

      <MarketDepth marketId={marketId} />
      <OrderBook marketId={marketId} />
    </div>
  );
}
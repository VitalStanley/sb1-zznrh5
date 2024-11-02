import React from 'react';

interface MarketDepthProps {
  marketId: string;
}

export default function MarketDepth({ marketId }: MarketDepthProps) {
  // Simulate market depth data
  const depthData = {
    bids: Array.from({ length: 10 }, (_, i) => ({
      price: 100 - i * 0.1,
      amount: Math.random() * 100,
      total: 0,
    })).map((bid, i, arr) => ({
      ...bid,
      total: arr.slice(0, i + 1).reduce((sum, b) => sum + b.amount, 0),
    })),
    asks: Array.from({ length: 10 }, (_, i) => ({
      price: 100 + i * 0.1,
      amount: Math.random() * 100,
      total: 0,
    })).map((ask, i, arr) => ({
      ...ask,
      total: arr.slice(0, i + 1).reduce((sum, a) => sum + a.amount, 0),
    })),
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Profondeur du Marché</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-slate-400 mb-2">Achats</div>
          <div className="space-y-1">
            {depthData.bids.map((bid, i) => (
              <div
                key={i}
                className="flex items-center text-sm"
              >
                <div className="w-24 font-mono text-green-400">
                  {bid.price.toFixed(2)}
                </div>
                <div className="w-20 text-right">{bid.amount.toFixed(2)}</div>
                <div className="flex-1 relative h-4 ml-2">
                  <div
                    className="absolute inset-y-0 right-0 bg-green-500/20"
                    style={{ width: `${(bid.total / depthData.bids[9].total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-slate-400 mb-2">Ventes</div>
          <div className="space-y-1">
            {depthData.asks.map((ask, i) => (
              <div
                key={i}
                className="flex items-center text-sm"
              >
                <div className="w-24 font-mono text-red-400">
                  {ask.price.toFixed(2)}
                </div>
                <div className="w-20 text-right">{ask.amount.toFixed(2)}</div>
                <div className="flex-1 relative h-4 ml-2">
                  <div
                    className="absolute inset-y-0 right-0 bg-red-500/20"
                    style={{ width: `${(ask.total / depthData.asks[9].total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
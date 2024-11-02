import React from 'react';

interface OrderBookProps {
  marketId: string;
}

export default function OrderBook({ marketId }: OrderBookProps) {
  // Simulate order book data
  const orders = {
    bids: Array.from({ length: 5 }, (_, i) => ({
      price: 100 - i * 0.1,
      amount: Math.random() * 10,
      total: Math.random() * 1000,
    })),
    asks: Array.from({ length: 5 }, (_, i) => ({
      price: 100 + i * 0.1,
      amount: Math.random() * 10,
      total: Math.random() * 1000,
    })),
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Carnet d'Ordres</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-3 text-sm font-medium text-slate-400 mb-2">
            <div>Prix</div>
            <div className="text-right">Montant</div>
            <div className="text-right">Total</div>
          </div>
          <div className="space-y-1">
            {orders.bids.map((bid, i) => (
              <div key={i} className="grid grid-cols-3 text-sm">
                <div className="font-mono text-green-400">
                  {bid.price.toFixed(2)}
                </div>
                <div className="text-right">{bid.amount.toFixed(4)}</div>
                <div className="text-right">{bid.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 text-sm font-medium text-slate-400 mb-2">
            <div>Prix</div>
            <div className="text-right">Montant</div>
            <div className="text-right">Total</div>
          </div>
          <div className="space-y-1">
            {orders.asks.map((ask, i) => (
              <div key={i} className="grid grid-cols-3 text-sm">
                <div className="font-mono text-red-400">
                  {ask.price.toFixed(2)}
                </div>
                <div className="text-right">{ask.amount.toFixed(4)}</div>
                <div className="text-right">{ask.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
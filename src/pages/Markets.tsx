import React from 'react';
import MarketGrid from '../components/markets/MarketGrid';
import MarketDetails from '../components/markets/MarketDetails';
import TechnicalOverview from '../components/markets/TechnicalOverview';

export default function Markets() {
  const [selectedMarket, setSelectedMarket] = React.useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Marchés</h1>
        <p className="text-slate-400">Vue d'ensemble et analyse détaillée des marchés</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketGrid onMarketSelect={setSelectedMarket} />
        </div>
        <div>
          {selectedMarket ? (
            <>
              <MarketDetails marketId={selectedMarket} />
              <TechnicalOverview marketId={selectedMarket} />
            </>
          ) : (
            <div className="bg-slate-800 rounded-xl p-6">
              <p className="text-center text-slate-400">
                Sélectionnez un marché pour voir les détails
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
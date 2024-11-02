import React from 'react';
import { TrendingUp, TrendingDown, Brain, AlertTriangle, DollarSign } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';
import PriceChart from './PriceChart';

interface MarketOverviewProps {
  selectedMarket: string;
}

interface AIPrediction {
  minPrice: number;
  maxPrice: number;
  confidence: number;
  signals: string[];
}

const formatConfig: { [key: string]: { 
  prefix?: string; 
  suffix?: string; 
  decimals: number;
  usdRate?: number;
  normalPrice?: number;
}} = {
  'BTC/USD': { prefix: '$', decimals: 2, usdRate: 1, normalPrice: 42000 },
  'ETH/USD': { prefix: '$', decimals: 2, usdRate: 1, normalPrice: 2200 },
  'EUR/USD': { decimals: 4, usdRate: 1, normalPrice: 1.0850 },
  'GBP/USD': { decimals: 4, usdRate: 1, normalPrice: 1.2650 },
  'CAC40': { suffix: ' pts', decimals: 2, usdRate: 1.09, normalPrice: 7500 },
  'DAX': { suffix: ' pts', decimals: 2, usdRate: 1.09, normalPrice: 16800 },
  'AAPL': { prefix: '$', decimals: 2, usdRate: 1, normalPrice: 180 },
  'MSFT': { prefix: '$', decimals: 2, usdRate: 1, normalPrice: 335 },
  'GOLD': { prefix: '$', suffix: '/oz', decimals: 2, usdRate: 1, normalPrice: 2000 },
  'OIL': { prefix: '$', suffix: '/bbl', decimals: 2, usdRate: 1, normalPrice: 75 }
};

const getNormalPrice = (symbol: string): number | null => {
  return formatConfig[symbol]?.normalPrice || null;
};

const getAIPrediction = (symbol: string, currentPrice: number): AIPrediction => {
  // Simuler des prédictions basées sur le prix actuel et le prix normal
  const normalPrice = getNormalPrice(symbol) || currentPrice;
  const volatility = Math.random() * 0.15 + 0.05; // 5-20% de volatilité
  
  const minPrice = currentPrice * (1 - volatility);
  const maxPrice = currentPrice * (1 + volatility);
  
  const signals = [
    `Analyse des tendances historiques sur ${symbol}`,
    `Corrélation avec les indicateurs macroéconomiques`,
    `Patterns techniques identifiés par l'IA`
  ];

  // Ajuster la confiance en fonction de l'écart avec le prix normal
  const priceDeviation = Math.abs((currentPrice - normalPrice) / normalPrice);
  const confidence = Math.max(60, 95 - priceDeviation * 100);

  return {
    minPrice,
    maxPrice,
    confidence,
    signals
  };
};

const formatPrice = (price: number, symbol: string) => {
  const config = formatConfig[symbol] || { decimals: 2, usdRate: 1 };
  const formattedPrice = price.toLocaleString('fr-FR', {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  });

  return {
    formatted: `${config.prefix || ''}${formattedPrice}${config.suffix || ''}`,
    usdValue: price * (config.usdRate || 1)
  };
};

export default function MarketOverview({ selectedMarket }: MarketOverviewProps) {
  const marketData = useMarketData(selectedMarket);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Aperçu du Marché</h2>
      <div className="space-y-4">
        {marketData.map((item) => {
          const normalPrice = getNormalPrice(item.symbol);
          const priceDeviation = normalPrice 
            ? ((item.price - normalPrice) / normalPrice) * 100 
            : null;
          const aiPrediction = getAIPrediction(item.symbol, item.price);
          const priceInfo = formatPrice(item.price, item.symbol);

          return (
            <div key={item.symbol} className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{item.symbol}</h3>
                  <p className="text-sm text-slate-400">{item.name}</p>
                </div>
                <div className={`flex items-center ${
                  item.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {item.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{item.change >= 0 ? '+' : ''}{item.change}%</span>
                </div>
              </div>
              <div className="h-24 mb-3">
                <PriceChart
                  data={item.chartData}
                  width={400}
                  height={96}
                  color={item.change >= 0 ? '#34D399' : '#F87171'}
                />
              </div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-2xl font-bold">
                    {priceInfo.formatted}
                  </div>
                  {priceInfo.usdValue !== item.price && (
                    <div className="flex items-center text-sm text-slate-400">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {priceInfo.usdValue.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  )}
                  {normalPrice && (
                    <div className={`text-sm ${
                      Math.abs(priceDeviation!) > 10 
                        ? 'text-red-400' 
                        : Math.abs(priceDeviation!) > 5 
                        ? 'text-yellow-400' 
                        : 'text-green-400'
                    }`}>
                      {priceDeviation! >= 0 ? '+' : ''}{priceDeviation!.toFixed(1)}% du prix normal ({formatPrice(normalPrice, item.symbol).formatted})
                    </div>
                  )}
                </div>
                <div className="text-sm text-slate-400">
                  Vol: {(item.volume / 1000).toFixed(0)}K
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium">Prédictions IA sur 2 mois</span>
                  <span className="text-xs text-purple-400">
                    {aiPrediction.confidence.toFixed(1)}% confiance
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Minimum Prévu</div>
                    <div className="text-lg font-bold text-red-400">
                      {formatPrice(aiPrediction.minPrice, item.symbol).formatted}
                    </div>
                    {aiPrediction.minPrice * (formatConfig[item.symbol]?.usdRate || 1) !== aiPrediction.minPrice && (
                      <div className="text-xs text-slate-400 flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {(aiPrediction.minPrice * (formatConfig[item.symbol]?.usdRate || 1)).toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    )}
                    <div className="text-xs text-slate-400">
                      {((aiPrediction.minPrice - item.price) / item.price * 100).toFixed(1)}% du prix actuel
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Maximum Prévu</div>
                    <div className="text-lg font-bold text-green-400">
                      {formatPrice(aiPrediction.maxPrice, item.symbol).formatted}
                    </div>
                    {aiPrediction.maxPrice * (formatConfig[item.symbol]?.usdRate || 1) !== aiPrediction.maxPrice && (
                      <div className="text-xs text-slate-400 flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {(aiPrediction.maxPrice * (formatConfig[item.symbol]?.usdRate || 1)).toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    )}
                    <div className="text-xs text-slate-400">
                      +{((aiPrediction.maxPrice - item.price) / item.price * 100).toFixed(1)}% du prix actuel
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  <div className="flex items-center mb-1">
                    <AlertTriangle className="h-3 w-3 text-yellow-400 mr-1" />
                    <span>Basé sur :</span>
                  </div>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    {aiPrediction.signals.map((signal, index) => (
                      <li key={index}>{signal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import React from 'react';
import MarketTicker from '../components/MarketTicker';
import MarketSelector from '../components/MarketSelector';
import TechnicalIndicators from '../components/TechnicalIndicators';
import AutochartistAlerts from '../components/AutochartistAlerts';
import MarketOverview from '../components/MarketOverview';
import TradingSignals from '../components/TradingSignals';
import TradingViewNews from '../components/TradingViewNews';
import HollyAIAssistant from '../components/HollyAIAssistant';
import Backtesting from '../components/Backtesting';
import AIMarketScanner from '../components/AIMarketScanner';
import AIInsights from '../components/AIInsights';
import DashboardCustomizer from '../components/DashboardCustomizer';
import NotificationCenter from '../components/NotificationCenter';

export default function Dashboard() {
  const [selectedMarket, setSelectedMarket] = React.useState('stocks');

  return (
    <div>
      <MarketTicker />
      <main className="container mx-auto px-4 py-8">
        <MarketSelector 
          selectedMarket={selectedMarket} 
          onMarketChange={setSelectedMarket} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <MarketOverview selectedMarket={selectedMarket} />
          <div className="lg:col-span-2">
            <TechnicalIndicators />
          </div>
        </div>
        <AIInsights />
        <AIMarketScanner />
        <HollyAIAssistant />
        <Backtesting />
        <TradingSignals />
        <AutochartistAlerts />
        <TradingViewNews />
      </main>
      <DashboardCustomizer />
      <NotificationCenter />
    </div>
  );
}
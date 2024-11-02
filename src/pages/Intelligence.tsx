import React from 'react';
import MarketPsychInsights from '../components/intelligence/MarketPsychInsights';
import PredictiveAI from '../components/intelligence/PredictiveAI';
import KavoutSignals from '../components/intelligence/KavoutSignals';
import NumeraiPredictions from '../components/intelligence/NumeraiPredictions';

export default function Intelligence() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MarketPsychInsights />
      <PredictiveAI />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <KavoutSignals />
        <NumeraiPredictions />
      </div>
    </div>
  );
}
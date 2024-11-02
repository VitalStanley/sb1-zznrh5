import React from 'react';
import { Brain, Target, BarChart2, TrendingUp, BookOpen, ShieldAlert } from 'lucide-react';
import CorrelationMatrix from '../components/portfolio/CorrelationMatrix';
import PerformanceCharts from '../components/portfolio/PerformanceCharts';
import MLPredictions from '../components/portfolio/MLPredictions';
import RiskManagement from '../components/portfolio/RiskManagement';
import Documentation from '../components/portfolio/Documentation';

export default function Portfolio() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CorrelationMatrix />
        <RiskManagement />
      </div>
      
      <PerformanceCharts />
      <MLPredictions />
      <Documentation />
    </div>
  );
}
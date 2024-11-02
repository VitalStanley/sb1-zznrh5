import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutGrid, LineChart, Briefcase, DollarSign, Brain, Target } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Portfolio from './pages/Portfolio';
import Values from './pages/Values';
import Intelligence from './pages/Intelligence';
import Positions from './pages/Positions';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
                <LayoutGrid className="h-6 w-6" />
                <span className="font-bold">Dashboard</span>
              </Link>
              <Link to="/analytics" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
                <LineChart className="h-6 w-6" />
                <span className="font-bold">Analytics</span>
              </Link>
              <Link to="/portfolio" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
                <Briefcase className="h-6 w-6" />
                <span className="font-bold">Portfolio</span>
              </Link>
              <Link to="/values" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
                <DollarSign className="h-6 w-6" />
                <span className="font-bold">Valeurs</span>
              </Link>
              <Link to="/intelligence" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
                <Brain className="h-6 w-6" />
                <span className="font-bold">Intelligence</span>
              </Link>
              <Link to="/positions" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
                <Target className="h-6 w-6" />
                <span className="font-bold">Positions</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-emerald-500 rounded-lg text-sm font-semibold">
                Marché Ouvert
              </div>
              <div className="text-slate-300">
                <div className="text-sm">Dernière Mise à Jour</div>
                <div className="font-mono">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/values" element={<Values />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/positions" element={<Positions />} />
      </Routes>
    </div>
  );
}

export default App;
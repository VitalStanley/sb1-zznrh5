import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-emerald-400" />
            <h1 className="text-2xl font-bold">AnalyseTrading IA</h1>
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
    </header>
  );
}
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: 'Alerte RSI',
      message: 'RSI supérieur à 70 - Condition de surachat potentielle',
      timestamp: 'il y a 2 min',
      severity: 'high',
    },
    {
      id: 2,
      type: 'Signal MACD',
      message: 'MACD croise au-dessus de la ligne de signal - Momentum haussier',
      timestamp: 'il y a 5 min',
      severity: 'medium',
    },
    {
      id: 3,
      type: 'Alerte Tendance',
      message: 'Forte tendance haussière détectée sur plusieurs périodes',
      timestamp: 'il y a 10 min',
      severity: 'low',
    },
  ];

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Alertes Récentes</h2>
        <button className="px-4 py-2 bg-slate-700 rounded-lg text-sm hover:bg-slate-600 transition-colors">
          Voir Tout
        </button>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between bg-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center space-x-4">
              <AlertTriangle className={`h-5 w-5 ${
                alert.severity === 'high' ? 'text-red-400' :
                alert.severity === 'medium' ? 'text-yellow-400' :
                'text-blue-400'
              }`} />
              <div>
                <h3 className="font-semibold">{alert.type}</h3>
                <p className="text-slate-300 text-sm">{alert.message}</p>
              </div>
            </div>
            <div className="text-slate-400 text-sm">{alert.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
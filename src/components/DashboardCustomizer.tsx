import React from 'react';
import { Layout, X, GripVertical } from 'lucide-react';

interface Widget {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  order: number;
}

export default function DashboardCustomizer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [widgets, setWidgets] = React.useState<Widget[]>([
    { id: 'market-overview', name: 'Aperçu du Marché', description: 'Vue d\'ensemble des marchés principaux', enabled: true, order: 1 },
    { id: 'technical', name: 'Indicateurs Techniques', description: 'RSI, MACD, Bollinger, etc.', enabled: true, order: 2 },
    { id: 'ai-insights', name: 'Analyses IA', description: 'Analyses avancées par intelligence artificielle', enabled: true, order: 3 },
    { id: 'market-scanner', name: 'Scanner de Marché', description: 'Détection d\'opportunités', enabled: true, order: 4 },
    { id: 'holly', name: 'Holly AI Assistant', description: 'Assistant IA pour le trading', enabled: true, order: 5 },
    { id: 'backtesting', name: 'Backtesting', description: 'Tests de stratégies', enabled: true, order: 6 },
    { id: 'signals', name: 'Signaux de Trading', description: 'Alertes et signaux', enabled: true, order: 7 },
    { id: 'news', name: 'Actualités', description: 'Flux d\'actualités en temps réel', enabled: true, order: 8 },
  ]);

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const moveWidget = (dragIndex: number, hoverIndex: number) => {
    const newWidgets = [...widgets];
    const draggedWidget = newWidgets[dragIndex];
    newWidgets.splice(dragIndex, 1);
    newWidgets.splice(hoverIndex, 0, draggedWidget);
    newWidgets.forEach((widget, index) => {
      widget.order = index + 1;
    });
    setWidgets(newWidgets);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-500 hover:bg-emerald-600 rounded-full p-3 shadow-lg transition-colors"
      >
        <Layout className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-slate-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Personnaliser le Tableau de Bord</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {widgets.sort((a, b) => a.order - b.order).map((widget, index) => (
                <div
                  key={widget.id}
                  className="flex items-center space-x-4 bg-slate-700 rounded-lg p-4"
                >
                  <GripVertical className="h-5 w-5 text-slate-400 cursor-move" />
                  <div className="flex-1">
                    <h3 className="font-medium">{widget.name}</h3>
                    <p className="text-sm text-slate-400">{widget.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={widget.enabled}
                      onChange={() => toggleWidget(widget.id)}
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
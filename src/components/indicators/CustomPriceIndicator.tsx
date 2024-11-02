import React from 'react';
import { DollarSign, Settings, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface PriceLevel {
  id: string;
  price: number;
  type: 'support' | 'resistance' | 'pivot' | 'custom';
  strength: number;
  description: string;
  alerts: boolean;
}

interface CustomPriceIndicatorProps {
  symbol: string;
  currentPrice: number;
  onLevelAdd?: (level: PriceLevel) => void;
  onLevelRemove?: (levelId: string) => void;
}

export default function CustomPriceIndicator({
  symbol,
  currentPrice,
  onLevelAdd,
  onLevelRemove
}: CustomPriceIndicatorProps) {
  const [levels, setLevels] = React.useState<PriceLevel[]>([]);
  const [isAddingLevel, setIsAddingLevel] = React.useState(false);
  const [newLevel, setNewLevel] = React.useState({
    price: currentPrice,
    type: 'custom' as const,
    description: '',
    alerts: true
  });

  const addLevel = () => {
    const level: PriceLevel = {
      id: Date.now().toString(),
      price: newLevel.price,
      type: newLevel.type,
      strength: calculateStrength(newLevel.price),
      description: newLevel.description,
      alerts: newLevel.alerts
    };

    setLevels(prev => [...prev, level].sort((a, b) => b.price - a.price));
    onLevelAdd?.(level);
    setIsAddingLevel(false);
    setNewLevel({ price: currentPrice, type: 'custom', description: '', alerts: true });
  };

  const removeLevel = (levelId: string) => {
    setLevels(prev => prev.filter(level => level.id !== levelId));
    onLevelRemove?.(levelId);
  };

  const calculateStrength = (price: number) => {
    // Simuler la force du niveau en fonction de l'historique des prix
    return Math.floor(60 + Math.random() * 40);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <DollarSign className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold">Niveaux de Prix Personnalisés</h2>
        </div>
        <button
          onClick={() => setIsAddingLevel(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2"
        >
          <Settings className="h-4 w-4" />
          <span>Ajouter Niveau</span>
        </button>
      </div>

      {isAddingLevel && (
        <div className="bg-slate-700 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-4">Nouveau Niveau</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Prix
              </label>
              <input
                type="number"
                value={newLevel.price}
                onChange={(e) => setNewLevel(prev => ({
                  ...prev,
                  price: parseFloat(e.target.value)
                }))}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Type
              </label>
              <select
                value={newLevel.type}
                onChange={(e) => setNewLevel(prev => ({
                  ...prev,
                  type: e.target.value as PriceLevel['type']
                }))}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="support">Support</option>
                <option value="resistance">Résistance</option>
                <option value="pivot">Point Pivot</option>
                <option value="custom">Personnalisé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newLevel.description}
                onChange={(e) => setNewLevel(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Description du niveau..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="alerts"
                checked={newLevel.alerts}
                onChange={(e) => setNewLevel(prev => ({
                  ...prev,
                  alerts: e.target.checked
                }))}
                className="rounded border-slate-600 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="alerts" className="text-sm text-slate-400">
                Activer les alertes
              </label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingLevel(false)}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={addLevel}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-sm font-semibold transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`bg-slate-700 rounded-lg p-4 border-l-4 ${
              level.type === 'support' ? 'border-green-500' :
              level.type === 'resistance' ? 'border-red-500' :
              level.type === 'pivot' ? 'border-blue-500' :
              'border-purple-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-lg font-bold">
                  {level.price.toFixed(2)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  level.type === 'support' ? 'bg-green-500/20 text-green-400' :
                  level.type === 'resistance' ? 'bg-red-500/20 text-red-400' :
                  level.type === 'pivot' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {level.type.charAt(0).toUpperCase() + level.type.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {level.alerts && (
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                )}
                <button
                  onClick={() => removeLevel(level.id)}
                  className="text-slate-400 hover:text-slate-300"
                >
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <div className="flex-1">
                <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      level.strength > 80 ? 'bg-green-400' :
                      level.strength > 60 ? 'bg-blue-400' :
                      'bg-yellow-400'
                    }`}
                    style={{ width: `${level.strength}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium">
                Force: {level.strength}%
              </span>
            </div>

            {level.description && (
              <p className="text-sm text-slate-400">{level.description}</p>
            )}

            <div className="mt-2 flex items-center space-x-2 text-sm">
              <span className={`flex items-center ${
                currentPrice > level.price ? 'text-green-400' : 'text-red-400'
              }`}>
                {currentPrice > level.price ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                Distance: {Math.abs(currentPrice - level.price).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
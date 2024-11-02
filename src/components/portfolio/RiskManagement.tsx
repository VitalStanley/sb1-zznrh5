import React from 'react';
import { ShieldAlert, TrendingUp, TrendingDown, AlertTriangle, BarChart2 } from 'lucide-react';

interface RiskMetrics {
  totalRisk: number;
  var: number;
  sharpeRatio: number;
  beta: number;
  correlationRisk: number;
  concentrationRisk: number;
  recommendations: string[];
}

interface AssetRisk {
  symbol: string;
  weight: number;
  risk: number;
  contribution: number;
  status: 'high' | 'medium' | 'low';
}

export default function RiskManagement() {
  const [riskMetrics, setRiskMetrics] = React.useState<RiskMetrics>({
    totalRisk: 12.5,
    var: 8.2,
    sharpeRatio: 1.8,
    beta: 1.2,
    correlationRisk: 35,
    concentrationRisk: 45,
    recommendations: [
      'Réduire l\'exposition aux cryptomonnaies',
      'Augmenter la diversification sectorielle',
      'Ajouter des actifs non corrélés'
    ]
  });

  const [assetRisks, setAssetRisks] = React.useState<AssetRisk[]>([
    { symbol: 'BTC/USD', weight: 25, risk: 28, contribution: 35, status: 'high' },
    { symbol: 'ETH/USD', weight: 20, risk: 25, contribution: 25, status: 'high' },
    { symbol: 'AAPL', weight: 15, risk: 12, contribution: 15, status: 'medium' },
    { symbol: 'GOOGL', weight: 15, risk: 14, contribution: 12, status: 'medium' },
    { symbol: 'EUR/USD', weight: 15, risk: 8, contribution: 8, status: 'low' },
    { symbol: 'GOLD', weight: 10, risk: 5, contribution: 5, status: 'low' }
  ]);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <ShieldAlert className="h-6 w-6 text-red-400" />
        <h2 className="text-xl font-bold">Gestion du Risque</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Risque Total</div>
          <div className="text-2xl font-bold text-red-400">
            {riskMetrics.totalRisk.toFixed(1)}%
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">VaR (95%)</div>
          <div className="text-2xl font-bold text-yellow-400">
            {riskMetrics.var.toFixed(1)}%
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Ratio de Sharpe</div>
          <div className="text-2xl font-bold text-green-400">
            {riskMetrics.sharpeRatio.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Risque par Actif</h3>
        <div className="space-y-3">
          {assetRisks.map((asset) => (
            <div
              key={asset.symbol}
              className="bg-slate-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{asset.symbol}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    asset.status === 'high' ? 'bg-red-500/20 text-red-400' :
                    asset.status === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {asset.status === 'high' ? 'Risque Élevé' :
                     asset.status === 'medium' ? 'Risque Modéré' :
                     'Risque Faible'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{asset.weight}%</div>
                  <div className="text-sm text-slate-400">Allocation</div>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Risque</span>
                    <span>{asset.risk}%</span>
                  </div>
                  <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        asset.status === 'high' ? 'bg-red-400' :
                        asset.status === 'medium' ? 'bg-yellow-400' :
                        'bg-green-400'
                      }`}
                      style={{ width: `${asset.risk}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Contribution au Risque</span>
                    <span>{asset.contribution}%</span>
                  </div>
                  <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${asset.contribution}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Recommandations</h3>
        <div className="space-y-3">
          {riskMetrics.recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-sm"
            >
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
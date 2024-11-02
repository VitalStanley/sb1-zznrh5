import React, { useState } from 'react';
import { Newspaper, ExternalLink, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  impact: 'positive' | 'negative' | 'neutral';
  summary: string;
  url: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'La Fed maintient ses taux directeurs',
    source: 'Financial Times',
    timestamp: '14:30',
    impact: 'positive',
    summary: 'La Réserve fédérale américaine maintient sa politique monétaire actuelle, signalant une stabilité des marchés.',
    url: '#'
  },
  {
    id: '2',
    title: 'Bitcoin dépasse les 45 000$',
    source: 'CoinDesk',
    timestamp: '13:45',
    impact: 'positive',
    summary: 'Le Bitcoin poursuit sa hausse suite à l\'approbation des ETF au comptant.',
    url: '#'
  },
  {
    id: '3',
    title: 'Tensions géopolitiques au Moyen-Orient',
    source: 'Reuters',
    timestamp: '12:15',
    impact: 'negative',
    summary: 'Les marchés pétroliers réagissent aux nouvelles tensions régionales.',
    url: '#'
  }
];

export default function NewsExplorer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Newspaper className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold">Flux d'actualité</h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-sm font-semibold transition-colors"
        >
          {isExpanded ? 'Réduire' : 'Explorer'}
        </button>
      </div>

      <div className={`space-y-4 transition-all duration-300 ${
        isExpanded ? 'max-h-[800px]' : 'max-h-[400px]'
      } overflow-hidden`}>
        {mockNews.map((news) => (
          <div
            key={news.id}
            className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-slate-400">{news.source}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-sm text-slate-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {news.timestamp}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{news.title}</h3>
                <p className="text-sm text-slate-300">{news.summary}</p>
              </div>
              <div className="ml-4 flex flex-col items-end">
                {news.impact === 'positive' ? (
                  <TrendingUp className="h-5 w-5 text-green-400" />
                ) : news.impact === 'negative' ? (
                  <TrendingDown className="h-5 w-5 text-red-400" />
                ) : null}
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-emerald-400 hover:text-emerald-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
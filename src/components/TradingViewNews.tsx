import React from 'react';
import { Newspaper, TrendingUp, TrendingDown, Clock, Tag, Globe, Filter, Search, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  timestamp: string;
  category: 'market' | 'crypto' | 'forex' | 'stocks' | 'economy';
  impact: 'positive' | 'negative' | 'neutral';
  symbols: string[];
  summary: string;
  sentiment: {
    score: number;
    keywords: string[];
  };
}

let uniqueIdCounter = 0;
const generateUniqueId = () => {
  uniqueIdCounter += 1;
  return `news-${Date.now()}-${uniqueIdCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

export default function TradingViewNews() {
  const [newsItems, setNewsItems] = React.useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const generateNews = () => {
      const sources = ['Reuters', 'Bloomberg', 'Financial Times', 'Wall Street Journal', 'CNBC'];
      const categories: NewsItem['category'][] = ['market', 'crypto', 'forex', 'stocks', 'economy'];
      const symbols = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'GOOGL', 'SPX'];

      const news: NewsItem = {
        id: generateUniqueId(),
        title: `${symbols[Math.floor(Math.random() * symbols.length)]} : Mouvement majeur détecté`,
        source: sources[Math.floor(Math.random() * sources.length)],
        url: '#',
        timestamp: new Date().toLocaleTimeString(),
        category: categories[Math.floor(Math.random() * categories.length)],
        impact: Math.random() > 0.6 ? 'positive' : Math.random() > 0.5 ? 'negative' : 'neutral',
        symbols: [symbols[Math.floor(Math.random() * symbols.length)]],
        summary: 'Analyse détaillée des mouvements de prix et des indicateurs techniques...',
        sentiment: {
          score: Math.random() * 100,
          keywords: ['tendance', 'support', 'résistance', 'volume']
        }
      };

      setNewsItems(prev => {
        const newItems = [news, ...prev];
        const uniqueItems = Array.from(new Map(newItems.map(item => [item.id, item])).values());
        return uniqueItems.slice(0, 50);
      });
    };

    // Initial news generation with delays
    const initialNewsCount = 10;
    Array.from({ length: initialNewsCount }).forEach((_, index) => {
      setTimeout(() => generateNews(), index * 200);
    });

    // Periodic news updates
    const interval = setInterval(generateNews, 30000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'all', label: 'Tout', icon: Globe },
    { id: 'market', label: 'Marchés', icon: TrendingUp },
    { id: 'crypto', label: 'Crypto', icon: Tag },
    { id: 'forex', label: 'Forex', icon: TrendingUp },
    { id: 'stocks', label: 'Actions', icon: TrendingUp },
    { id: 'economy', label: 'Économie', icon: Globe }
  ];

  const filteredNews = React.useMemo(() => {
    return newsItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.symbols.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [newsItems, selectedCategory, searchTerm]);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Newspaper className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold">TradingView News</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredNews.map((news) => (
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
                  {news.symbols.map((symbol, index) => (
                    <span
                      key={`${news.id}-symbol-${index}`}
                      className="px-2 py-1 bg-slate-600 rounded-full text-xs"
                    >
                      {symbol}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold mb-2">{news.title}</h3>
                <p className="text-sm text-slate-300">{news.summary}</p>
                
                <div className="mt-3 flex items-center space-x-4">
                  <div className={`flex items-center space-x-1 text-sm ${
                    news.impact === 'positive' ? 'text-green-400' :
                    news.impact === 'negative' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {news.impact === 'positive' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : news.impact === 'negative' ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : null}
                    <span>Impact {
                      news.impact === 'positive' ? 'Positif' :
                      news.impact === 'negative' ? 'Négatif' :
                      'Neutre'
                    }</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-slate-400">Sentiment:</span>
                    <span className={
                      news.sentiment.score > 70 ? 'text-green-400' :
                      news.sentiment.score > 30 ? 'text-yellow-400' :
                      'text-red-400'
                    }>
                      {news.sentiment.score.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 text-emerald-400 hover:text-emerald-300"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
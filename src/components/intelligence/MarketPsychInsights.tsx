import React from 'react';
import { Brain, TrendingUp, TrendingDown, BarChart2, MessageCircle, Globe, Activity } from 'lucide-react';

interface SentimentData {
  asset: string;
  sentiment: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    volume: number;
  };
  sources: {
    social: number;
    news: number;
    forums: number;
  };
  emotions: {
    fear: number;
    greed: number;
    optimism: number;
    uncertainty: number;
  };
  topics: {
    name: string;
    mentions: number;
    sentiment: number;
  }[];
  timestamp: string;
}

export default function MarketPsychInsights() {
  const [sentimentData, setSentimentData] = React.useState<SentimentData[]>([]);

  React.useEffect(() => {
    // Simuler les données de sentiment en temps réel
    const generateSentimentData = () => {
      const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'AAPL', 'GOOGL'];
      return assets.map(asset => ({
        asset,
        sentiment: {
          score: Math.random() * 100,
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
          volume: Math.floor(Math.random() * 10000)
        },
        sources: {
          social: Math.random() * 100,
          news: Math.random() * 100,
          forums: Math.random() * 100
        },
        emotions: {
          fear: Math.random() * 100,
          greed: Math.random() * 100,
          optimism: Math.random() * 100,
          uncertainty: Math.random() * 100
        },
        topics: [
          {
            name: 'Régulation',
            mentions: Math.floor(Math.random() * 1000),
            sentiment: Math.random() * 100
          },
          {
            name: 'Innovation',
            mentions: Math.floor(Math.random() * 1000),
            sentiment: Math.random() * 100
          },
          {
            name: 'Adoption',
            mentions: Math.floor(Math.random() * 1000),
            sentiment: Math.random() * 100
          }
        ],
        timestamp: new Date().toLocaleTimeString()
      }));
    };

    setSentimentData(generateSentimentData());

    const interval = setInterval(() => {
      setSentimentData(generateSentimentData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-purple-400" />
        <h2 className="text-xl font-bold">MarketPsych - Analyse des Sentiments</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sentimentData.map((data) => (
          <div
            key={data.asset}
            className="bg-slate-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{data.asset}</h3>
                <div className="flex items-center mt-1">
                  {data.sentiment.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  ) : data.sentiment.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                  ) : (
                    <Activity className="h-4 w-4 text-yellow-400 mr-1" />
                  )}
                  <span className="text-sm">
                    {data.sentiment.volume.toLocaleString()} mentions
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {data.sentiment.score.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">
                  Score de sentiment
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Social</span>
                </div>
                <div className="text-lg font-bold">{data.sources.social.toFixed(1)}%</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="h-4 w-4 text-green-400" />
                  <span className="text-sm">News</span>
                </div>
                <div className="text-lg font-bold">{data.sources.news.toFixed(1)}%</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">Forums</span>
                </div>
                <div className="text-lg font-bold">{data.sources.forums.toFixed(1)}%</div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Analyse Émotionnelle</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Peur</span>
                    <span>{data.emotions.fear.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full"
                      style={{ width: `${data.emotions.fear}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Avidité</span>
                    <span>{data.emotions.greed.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${data.emotions.greed}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Optimisme</span>
                    <span>{data.emotions.optimism.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400 rounded-full"
                      style={{ width: `${data.emotions.optimism}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Incertitude</span>
                    <span>{data.emotions.uncertainty.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${data.emotions.uncertainty}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Sujets Tendance</h4>
              <div className="space-y-2">
                {data.topics.map((topic, index) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{topic.name}</span>
                      <span className="text-sm text-slate-400">
                        {topic.mentions} mentions
                      </span>
                    </div>
                    <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          topic.sentiment > 66 ? 'bg-green-400' :
                          topic.sentiment > 33 ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${topic.sentiment}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
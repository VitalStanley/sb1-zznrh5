import React from 'react';
import { BookOpen, ChevronDown, ChevronRight, Info } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  description: string;
  content: {
    text: string;
    examples?: string[];
    tips?: string[];
  };
}

export default function Documentation() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const sections: DocSection[] = [
    {
      id: 'correlation',
      title: 'Matrice de Corrélation',
      description: '<boltAction type="file" filePath="src/components/portfolio/Documentation.tsx">Comprendre les relations entre les actifs',
      content: {
        text: 'La matrice de corrélation montre comment les différents actifs évoluent les uns par rapport aux autres. Une corrélation positive signifie que les actifs ont tendance à évoluer dans la même direction, tandis qu\'une corrélation négative indique des mouvements opposés.',
        examples: [
          'Corrélation de 1.0 : Mouvement parfaitement synchronisé',
          'Corrélation de -1.0 : Mouvement parfaitement opposé',
          'Corrélation de 0.0 : Aucune relation'
        ],
        tips: [
          'Diversifiez avec des actifs faiblement corrélés',
          'Utilisez les corrélations négatives pour la couverture',
          'Surveillez les changements de corrélation dans le temps'
        ]
      }
    },
    {
      id: 'performance',
      title: 'Analyse de Performance',
      description: 'Évaluer les performances des stratégies et des actifs',
      content: {
        text: 'L\'analyse de performance permet de mesurer l\'efficacité de vos stratégies de trading sur différentes périodes. Elle prend en compte le rendement, le risque et divers ratios de performance.',
        examples: [
          'Rendement total : Gain ou perte en pourcentage',
          'Ratio de Sharpe : Rendement ajusté au risque',
          'Drawdown maximum : Perte maximale historique'
        ],
        tips: [
          'Comparez les performances sur différentes périodes',
          'Analysez le rapport rendement/risque',
          'Identifiez les stratégies les plus consistantes'
        ]
      }
    },
    {
      id: 'ml-predictions',
      title: 'Prédictions Machine Learning',
      description: 'Comprendre les prévisions basées sur l\'IA',
      content: {
        text: 'Les modèles de machine learning analysent de grandes quantités de données historiques pour identifier des patterns et faire des prédictions sur les mouvements futurs des prix.',
        examples: [
          'Analyse technique automatisée',
          'Sentiment du marché',
          'Patterns de volume'
        ],
        tips: [
          'Utilisez les prédictions comme complément à votre analyse',
          'Surveillez les niveaux de confiance',
          'Combinez plusieurs indicateurs'
        ]
      }
    },
    {
      id: 'risk',
      title: 'Gestion du Risque',
      description: 'Maîtriser et optimiser le risque du portefeuille',
      content: {
        text: 'La gestion du risque est essentielle pour la préservation du capital et la performance à long terme. Elle implique l\'analyse et le contrôle de différents types de risques.',
        examples: [
          'VaR (Value at Risk)',
          'Risque de concentration',
          'Risque de corrélation'
        ],
        tips: [
          'Définissez des limites de risque claires',
          'Diversifiez intelligemment',
          'Ajustez régulièrement votre exposition'
        ]
      }
    }
  ];

  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="h-6 w-6 text-emerald-400" />
        <h2 className="text-xl font-bold">Documentation Interactive</h2>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-slate-700 rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-600 transition-colors"
              onClick={() => setExpandedSection(
                expandedSection === section.id ? null : section.id
              )}
            >
              <div>
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <p className="text-sm text-slate-400">{section.description}</p>
              </div>
              {expandedSection === section.id ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>

            {expandedSection === section.id && (
              <div className="px-6 py-4 border-t border-slate-600">
                <p className="text-slate-300 mb-4">{section.content.text}</p>

                {section.content.examples && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Exemples</h4>
                    <ul className="space-y-2">
                      {section.content.examples.map((example, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Info className="h-4 w-4 text-blue-400 mr-2" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.content.tips && (
                  <div>
                    <h4 className="font-semibold mb-2">Conseils Pratiques</h4>
                    <ul className="space-y-2">
                      {section.content.tips.map((tip, index) => (
                        <li key={index} className="flex items-center text-sm text-emerald-400">
                          <ChevronRight className="h-4 w-4 mr-2" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
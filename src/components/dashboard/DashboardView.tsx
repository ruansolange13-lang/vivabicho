import React from 'react';
import { useAnimalContext } from '../../context/AnimalContext';
import { 
  Dog, 
  Heart, 
  Bird, 
  ClipboardList, 
  ArrowRight, 
  MapPin, 
  Calendar,
  Clock
} from 'lucide-react';
import { LOCATION_LABELS, LocationType, SPECIES_LABELS } from '../../types/animal';

export const DashboardView: React.FC = () => {
  const { 
    animals, 
    setActiveTab, 
    navigateToAnimal, 
    navigateToLocationVisualization,
    setSelectedAnimalId
  } = useAnimalContext();

  // Summary counts
  const shelterAnimals = animals.filter((a) => a.status === 'no_abrigo');
  const adoptedAnimals = animals.filter((a) => a.status === 'adotado');
  const deceasedAnimals = animals.filter((a) => a.status === 'obito');
  const totalRegistered = animals.length;

  // Location counts for shelter animals
  const getCountByLocation = (loc: LocationType) => {
    return shelterAnimals.filter((a) => a.currentLocation === loc).length;
  };

  // Recent entries (sorted by entry date or top 5)
  const recentEntries = [...shelterAnimals].slice(0, 5);

  const summaryCards = [
    {
      id: 'shelter',
      title: 'ANIMAIS NO ABRIGO',
      count: shelterAnimals.length,
      icon: Dog,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900',
      tabTarget: 'no_abrigo'
    },
    {
      id: 'adopted',
      title: 'ANIMAIS ADOTADOS',
      count: adoptedAnimals.length,
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900',
      tabTarget: 'adotados'
    },
    {
      id: 'deceased',
      title: 'ÓBITOS',
      count: deceasedAnimals.length,
      icon: Bird,
      color: 'from-slate-600 to-slate-800',
      textColor: 'text-slate-600 dark:text-slate-400',
      bgColor: 'bg-slate-100 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700',
      tabTarget: 'obito'
    },
    {
      id: 'total',
      title: 'TOTAL REGISTRADO',
      count: totalRegistered,
      icon: ClipboardList,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900',
      tabTarget: 'no_abrigo'
    }
  ];

  const locationsList: LocationType[] = [
    'internacao_gatos',
    'internacao_caes',
    'gatil',
    'area_caes'
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-8 text-white shadow-md border border-slate-800">
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="inline-flex flex-col items-start px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-sm leading-snug">
            <span>Sistema de gestão de entrada</span>
            <span className="font-extrabold text-white text-sm sm:text-base">ONG Viva Bicho</span>
          </div>
          
          <img 
            src="https://i.imgur.com/O6TcG0n.png" 
            alt="Logo ONG Viva Bicho" 
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full bg-white/10 p-1 border border-white/20 shadow-sm shrink-0" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div>
        <h2 className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-3">
          Resumo Geral
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => {
                  setSelectedAnimalId(null);
                  setActiveTab(card.tabTarget);
                }}
                className={`flex flex-col justify-between p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${card.bgColor}`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-xs font-bold tracking-wider text-slate-600 dark:text-slate-300">
                    {card.title}
                  </span>
                  <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm ${card.textColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    {card.count}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-2">
                    {card.count === 1 ? 'animal' : 'animais'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animals by Location Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ANIMAIS POR LOCALIZAÇÃO
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clique em qualquer setor para filtrar na página de visualização detalhada
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locationsList.map((locKey) => {
            const loc = LOCATION_LABELS[locKey];
            const count = getCountByLocation(locKey);
            return (
              <button
                key={locKey}
                onClick={() => navigateToLocationVisualization(locKey)}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${loc.bg}`}>
                    {loc.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {loc.label}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{count}</span> {count === 1 ? 'animal' : 'animais'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Entries Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ENTRADAS RECENTES
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Últimos animais resgatados e cadastrados no sistema
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedAnimalId(null);
              setActiveTab('no_abrigo');
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors self-start sm:self-auto"
          >
            Ver todos os animais
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentEntries.length === 0 ? (
          <p className="text-sm text-slate-500 py-6 text-center">Nenhum animal no abrigo no momento.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  <th className="pb-3 px-2">Nome</th>
                  <th className="pb-3 px-2">Espécie</th>
                  <th className="pb-3 px-2">Data de Entrada</th>
                  <th className="pb-3 px-2">Localização</th>
                  <th className="pb-3 px-2 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {recentEntries.map((animal) => {
                  const loc = LOCATION_LABELS[animal.currentLocation];
                  return (
                    <tr key={animal.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-slate-900 dark:text-white">
                        <button
                          onClick={() => navigateToAnimal(animal.id)}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors text-left"
                        >
                          {animal.name}
                        </button>
                      </td>
                      <td className="py-3.5 px-2 text-slate-600 dark:text-slate-300">
                        {SPECIES_LABELS[animal.species]}
                      </td>
                      <td className="py-3.5 px-2 text-slate-500 dark:text-slate-400 text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {animal.entryDate}
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${loc.badge}`}>
                          <span>{loc.icon}</span>
                          {loc.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <button
                          onClick={() => navigateToAnimal(animal.id)}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                        >
                          Ver Ficha
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

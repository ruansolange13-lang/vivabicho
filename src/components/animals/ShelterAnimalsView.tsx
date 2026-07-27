import React, { useState } from 'react';
import { useAnimalContext } from '../../context/AnimalContext';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  MapPin, 
  Dog, 
  Calendar, 
  Tag, 
  User,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { 
  LOCATION_LABELS, 
  LocationType, 
  SPECIES_LABELS, 
  SpeciesType, 
  SEX_LABELS, 
  SexType, 
  ORIGIN_LABELS, 
  EntryOrigin 
} from '../../types/animal';

interface ShelterAnimalsViewProps {
  onOpenNewAnimalModal: () => void;
  onOpenEditModal: (animalId: string) => void;
  onOpenChangeLocationModal: (animalId: string) => void;
}

export const ShelterAnimalsView: React.FC<ShelterAnimalsViewProps> = ({
  onOpenNewAnimalModal,
  onOpenEditModal,
  onOpenChangeLocationModal
}) => {
  const { animals, navigateToAnimal } = useAnimalContext();

  const shelterAnimals = animals.filter((a) => a.status === 'no_abrigo');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedSex, setSelectedSex] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');

  const filteredAnimals = shelterAnimals.filter((animal) => {
    // Search match (name or microchip)
    const matchesSearch =
      searchTerm === '' ||
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (animal.microchip && animal.microchip.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter species
    const matchesSpecies = selectedSpecies === 'all' || animal.species === selectedSpecies;

    // Filter location
    const matchesLocation = selectedLocation === 'all' || animal.currentLocation === selectedLocation;

    // Filter sex
    const matchesSex = selectedSex === 'all' || animal.sex === selectedSex;

    // Filter origin
    const matchesOrigin = selectedOrigin === 'all' || animal.origin === selectedOrigin;

    return matchesSearch && matchesSpecies && matchesLocation && matchesSex && matchesOrigin;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecies('all');
    setSelectedLocation('all');
    setSelectedSex('all');
    setSelectedOrigin('all');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedSpecies !== 'all' ||
    selectedLocation !== 'all' ||
    selectedSex !== 'all' ||
    selectedOrigin !== 'all';

  return (
    <div className="space-y-6">
      {/* Top Banner & Main Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Dog className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            Animais no Abrigo
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exibindo <span className="font-bold text-slate-800 dark:text-slate-200">{filteredAnimals.length}</span> de{' '}
            <span className="font-bold text-slate-800 dark:text-slate-200">{shelterAnimals.length}</span> animais atualmente sob custódia
          </p>
        </div>

        <button
          onClick={onOpenNewAnimalModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          Nova Entrada de Animal
        </button>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Pesquisar por nome ou microchip..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Species */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Espécie
            </label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Todas as espécies</option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Localização
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Todas as localizações</option>
              <option value="internacao_gatos">Internação de Gatos</option>
              <option value="internacao_caes">Internação Canina</option>
              <option value="gatil">Gatil</option>
              <option value="area_caes">Área de Cães</option>
            </select>
          </div>

          {/* Sex */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Sexo
            </label>
            <select
              value={selectedSex}
              onChange={(e) => setSelectedSex(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Todos os sexos</option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>
          </div>

          {/* Entry Origin */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Origem da Entrada
            </label>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Todas as origens</option>
              <option value="guarda_municipal">Guarda Municipal</option>
              <option value="resgate_ong">Resgate pela ONG</option>
              <option value="entrega_voluntaria">Entrega voluntária</option>
              <option value="resgate_emergencia">Resgate de emergência</option>
              <option value="terceiros">Terceiros</option>
              <option value="nao_informado">Não informado</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-500">Filtros ativos aplicados</span>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {filteredAnimals.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-3">
            <Dog className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-base font-bold text-slate-800 dark:text-slate-200">
              Nenhum animal encontrado
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tente redefinir a busca ou os filtros para visualizar os animais do abrigo.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  <th className="py-4 px-4">Nome</th>
                  <th className="py-4 px-4">Microchip</th>
                  <th className="py-4 px-4">Espécie</th>
                  <th className="py-4 px-4">Sexo</th>
                  <th className="py-4 px-4">Data de Entrada</th>
                  <th className="py-4 px-4">Localização</th>
                  <th className="py-4 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAnimals.map((animal) => {
                  const loc = LOCATION_LABELS[animal.currentLocation];
                  return (
                    <tr
                      key={animal.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      {/* Name - CLICKABLE to open full animal sheet */}
                      <td className="py-4 px-4 font-extrabold text-slate-900 dark:text-white">
                        <button
                          onClick={() => navigateToAnimal(animal.id)}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>{animal.name}</span>
                        </button>
                      </td>

                      {/* Microchip */}
                      <td className="py-4 px-4 text-xs font-mono">
                        {animal.microchip ? (
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                            {animal.microchip}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Não informado</span>
                        )}
                      </td>

                      {/* Species */}
                      <td className="py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {SPECIES_LABELS[animal.species]}
                      </td>

                      {/* Sex */}
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                        {SEX_LABELS[animal.sex]}
                      </td>

                      {/* Entry Date */}
                      <td className="py-4 px-4 text-xs text-slate-500 dark:text-slate-400">
                        {animal.entryDate}
                      </td>

                      {/* Location Badge */}
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${loc.badge}`}>
                          <MapPin className="w-3 h-3" />
                          {loc.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigateToAnimal(animal.id)}
                            title="Visualizar ficha completa"
                            className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-slate-300 dark:hover:bg-emerald-950/40 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenChangeLocationModal(animal.id)}
                            title="Alterar localização"
                            className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-300 dark:hover:bg-indigo-950/40 transition-colors"
                          >
                            <MapPin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenEditModal(animal.id)}
                            title="Editar cadastro"
                            className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-blue-950/40 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
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

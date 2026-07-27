import React, { useState, useEffect } from 'react';
import { useAnimalContext } from '../../context/AnimalContext';
import { X, Edit3, Check } from 'lucide-react';
import { SpeciesType, SexType, EntryOrigin } from '../../types/animal';

interface EditAnimalModalProps {
  isOpen: boolean;
  animalId: string | null;
  onClose: () => void;
}

export const EditAnimalModal: React.FC<EditAnimalModalProps> = ({
  isOpen,
  animalId,
  onClose
}) => {
  const { getAnimalById, updateAnimal } = useAnimalContext();

  const animal = animalId ? getAnimalById(animalId) : null;

  const [name, setName] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [species, setSpecies] = useState<SpeciesType>('cachorro');
  const [sex, setSex] = useState<SexType>('macho');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [origin, setOrigin] = useState<EntryOrigin>('resgate_ong');
  const [originProtocol, setOriginProtocol] = useState('');
  const [originNotes, setOriginNotes] = useState('');
  const [originTutorName, setOriginTutorName] = useState('');
  const [originTutorContact, setOriginTutorContact] = useState('');
  const [currentObservation, setCurrentObservation] = useState('');

  useEffect(() => {
    if (animal) {
      setName(animal.name);
      setMicrochip(animal.microchip || '');
      setSpecies(animal.species);
      setSex(animal.sex);
      setAge(animal.age || '');
      setWeight(animal.weight || '');
      setOrigin(animal.origin);
      setOriginProtocol(animal.originProtocol || '');
      setOriginNotes(animal.originNotes || '');
      setOriginTutorName(animal.originTutorName || '');
      setOriginTutorContact(animal.originTutorContact || '');
      setCurrentObservation(animal.currentObservation || '');
    }
  }, [animalId, animal]);

  if (!isOpen || !animal) return null;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('O nome do animal é obrigatório.');
      return;
    }

    setSubmitting(true);
    try {
      const success = await updateAnimal(animal.id, {
        name: name.trim(),
        microchip: microchip.trim() || undefined,
        species,
        sex,
        age: age.trim() || undefined,
        weight: weight.trim() ? (weight.trim().toLowerCase().endsWith('kg') ? weight.trim() : `${weight.trim()} kg`) : undefined,
        origin,
        originProtocol: originProtocol.trim() || undefined,
        originNotes: originNotes.trim() || undefined,
        originTutorName: originTutorName.trim() || undefined,
        originTutorContact: originTutorContact.trim() || undefined,
        currentObservation: currentObservation.trim() || undefined
      });

      if (success) {
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Editar Cadastro - {animal.name}
              </h2>
              <p className="text-xs text-slate-500">
                Atualize as informações cadastrais do animal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nome do Animal <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Microchip
              </label>
              <input
                type="text"
                value={microchip}
                onChange={(e) => setMicrochip(e.target.value)}
                placeholder="Não informado se em branco"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Espécie
              </label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as SpeciesType)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold"
              >
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Sexo
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as SexType)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold"
              >
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Idade
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 3 anos"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Peso <span className="text-emerald-600 dark:text-emerald-400 font-bold">(em kg)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ex: 25"
                  className="w-full p-2.5 pr-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
                  kg
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nome do Tutor de Origem
              </label>
              <input
                type="text"
                value={originTutorName}
                onChange={(e) => setOriginTutorName(e.target.value)}
                placeholder="Não identificado se em branco"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Contato do Tutor de Origem
              </label>
              <input
                type="text"
                value={originTutorContact}
                onChange={(e) => setOriginTutorContact(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Observações Atuais
              </label>
              <textarea
                rows={2}
                value={currentObservation}
                onChange={(e) => setCurrentObservation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAnimalContext } from '../../context/AnimalContext';
import { 
  X, 
  Dog, 
  User, 
  ShieldAlert, 
  MapPin, 
  FileText, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { 
  SpeciesType, 
  SexType, 
  LocationType, 
  EntryOrigin, 
  LOCATION_LABELS 
} from '../../types/animal';

interface NewAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewAnimalModal: React.FC<NewAnimalModalProps> = ({ isOpen, onClose }) => {
  const { addAnimal, navigateToAnimal } = useAnimalContext();

  const todayStr = new Date().toISOString().split('T')[0];

  // Essential required fields
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<SpeciesType>('cachorro');
  const [sex, setSex] = useState<SexType>('macho');
  const [entryDate, setEntryDate] = useState(
    `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()}`
  );
  const [currentLocation, setCurrentLocation] = useState<LocationType>('area_caes');

  // Optional fields
  const [microchip, setMicrochip] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  // Origin tutor
  const [originTutorName, setOriginTutorName] = useState('');
  const [originTutorContact, setOriginTutorContact] = useState('');

  // Entry origin details
  const [origin, setOrigin] = useState<EntryOrigin>('resgate_ong');
  const [originProtocol, setOriginProtocol] = useState('');
  const [originNotes, setOriginNotes] = useState('');

  // Current observation
  const [currentObservation, setCurrentObservation] = useState('');

  if (!isOpen) return null;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Por favor, informe o nome do animal.');
      return;
    }

    setSubmitting(true);
    try {
      const createdId = await addAnimal({
        name: name.trim(),
        microchip: microchip.trim() || undefined,
        species,
        sex,
        age: age.trim() || undefined,
        weight: weight.trim() ? (weight.trim().toLowerCase().endsWith('kg') ? weight.trim() : `${weight.trim()} kg`) : undefined,
        entryDate: entryDate || '26/07/2026',
        currentLocation,
        origin,
        originProtocol: originProtocol.trim() || undefined,
        originNotes: originNotes.trim() || undefined,
        originTutorName: originTutorName.trim() || undefined,
        originTutorContact: originTutorContact.trim() || undefined,
        currentObservation: currentObservation.trim() || undefined
      });

      if (createdId) {
        onClose();
        navigateToAnimal(createdId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              🐾
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Nova Entrada de Animal
              </h2>
              <p className="text-xs text-slate-500">
                Cadastre as informações essenciais para controle do abrigo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* SEÇÃO 1: INFORMAÇÕES DO ANIMAL */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Dog className="w-4 h-4" />
              1. Informações do Animal
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nome (Obrigatório) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nome do Animal <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Thor, Luna, Bob..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                />
              </div>

              {/* Microchip (Opcional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Microchip <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={microchip}
                  onChange={(e) => setMicrochip(e.target.value)}
                  placeholder="Ex: 982000123456789"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Se em branco: exibirá "Não informado"
                </span>
              </div>

              {/* Espécie (Obrigatório) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Espécie <span className="text-rose-500">*</span>
                </label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as SpeciesType)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Sexo (Obrigatório) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Sexo <span className="text-rose-500">*</span>
                </label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value as SexType)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="macho">Macho</option>
                  <option value="femea">Fêmea</option>
                </select>
              </div>

              {/* Data de Entrada (Obrigatório) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Data de Entrada <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  placeholder="DD/MM/AAAA"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Idade (Opcional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Idade <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 2 anos, 5 meses..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Se em branco: exibirá "Não identificada"
                </span>
              </div>

              {/* Peso (Opcional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Peso <span className="text-emerald-600 dark:text-emerald-400 font-bold">(em kg)</span> <span className="text-slate-400 font-normal">(opcional)</span>
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
                <span className="text-[10px] text-slate-400 block mt-1">
                  Se em branco: exibirá "Não informado"
                </span>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: TUTOR DE ORIGEM (Opcional) */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              2. Tutor de Origem (Opcional)
            </h3>
            <p className="text-xs text-slate-500">
              Caso o animal seja de resgate sem tutor conhecido, pode deixar estes campos em branco.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nome do Tutor
                </label>
                <input
                  type="text"
                  value={originTutorName}
                  onChange={(e) => setOriginTutorName(e.target.value)}
                  placeholder="Deixe em branco se não identificado"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Contato do Tutor
                </label>
                <input
                  type="text"
                  value={originTutorContact}
                  onChange={(e) => setOriginTutorContact(e.target.value)}
                  placeholder="Telefone / Celular"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: ORIGEM DA ENTRADA */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              3. Origem da Entrada
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Origem do Resgate <span className="text-rose-500">*</span>
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value as EntryOrigin)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="guarda_municipal">Guarda Municipal</option>
                  <option value="resgate_ong">Resgate pela ONG</option>
                  <option value="entrega_voluntaria">Entrega voluntária</option>
                  <option value="resgate_emergencia">Resgate de emergência</option>
                  <option value="terceiros">Terceiros</option>
                  <option value="nao_informado">Não informado</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nº do Registro / Protocolo
                </label>
                <input
                  type="text"
                  value={originProtocol}
                  onChange={(e) => setOriginProtocol(e.target.value)}
                  placeholder="Ex: GM-2026-0841"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Observações da Entrada
                </label>
                <textarea
                  rows={2}
                  value={originNotes}
                  onChange={(e) => setOriginNotes(e.target.value)}
                  placeholder="Ex: Animal resgatado pela Guarda Municipal após denúncia de maus-tratos..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 4: LOCALIZAÇÃO INICIAL */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              4. Localização Inicial no Abrigo <span className="text-rose-500">*</span>
            </h3>

            <select
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value as LocationType)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="internacao_gatos">Internação Felina</option>
              <option value="internacao_caes">Internação de Cães</option>
              <option value="gatil">Gatil</option>
              <option value="area_caes">Área de Cães</option>
            </select>
          </div>

          {/* SEÇÃO 5: OBSERVAÇÕES ATUAIS */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              5. Observações Atuais / Estado de Saúde
            </h3>

            <textarea
              rows={2}
              value={currentObservation}
              onChange={(e) => setCurrentObservation(e.target.value)}
              placeholder="Ex: Animal tranquilo e alimentando-se normalmente. Aguardando triagem..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Buttons Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Registrar Entrada
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

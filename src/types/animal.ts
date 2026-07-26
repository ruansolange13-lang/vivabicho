export type LocationType = 'internacao_gatos' | 'internacao_caes' | 'gatil' | 'area_caes';

export type SpeciesType = 'cachorro' | 'gato' | 'outro';

export type SexType = 'macho' | 'femea';

export type AnimalStatus = 'no_abrigo' | 'adotado' | 'obito';

export type EntryOrigin = 
  | 'guarda_municipal' 
  | 'resgate_ong' 
  | 'entrega_voluntaria' 
  | 'resgate_emergencia' 
  | 'terceiros' 
  | 'nao_informado' 
  | 'outro';

export interface HistoryEntry {
  id: string;
  date: string; // ISO String or DD/MM/YYYY HH:mm
  title: string;
  description: string;
  user?: string;
  iconType?: 'create' | 'move' | 'edit' | 'adopt' | 'death' | 'undo';
}

export interface AdoptionDetails {
  adoptionDate: string;
  exitDate: string;
  adopterName: string;
  adopterContact: string;
  adopterAddress?: string;
  notes?: string;
}

export interface DeathDetails {
  deathDate: string;
  exitDate: string;
  notes?: string;
}

export interface Animal {
  id: string;
  name: string;
  microchip?: string; // Optional, "Não informado" if empty
  species: SpeciesType;
  sex: SexType;
  age?: string; // Optional, "Não identificada" if empty
  weight?: string; // Optional, "Não informado" if empty
  entryDate: string; // DD/MM/YYYY
  currentLocation: LocationType;
  status: AnimalStatus;
  origin: EntryOrigin;
  originProtocol?: string;
  originNotes?: string;
  originTutorName?: string; // Optional, "Não identificado" if empty
  originTutorContact?: string; // Optional, "Contato não informado" if empty
  currentObservation?: string;
  history: HistoryEntry[];
  adoptionDetails?: AdoptionDetails;
  deathDetails?: DeathDetails;
  photoUrl?: string;
}

export const LOCATION_LABELS: Record<LocationType, { label: string; icon: string; bg: string; text: string; badge: string }> = {
  internacao_gatos: {
    label: 'Internação Felina',
    icon: '',
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    text: 'text-amber-700 dark:text-amber-300',
    badge: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  internacao_caes: {
    label: 'Internação de Cães',
    icon: '',
    bg: 'bg-rose-500/10 dark:bg-rose-500/20',
    text: 'text-rose-700 dark:text-rose-300',
    badge: 'bg-rose-100 text-rose-800 border-rose-200'
  },
  gatil: {
    label: 'Gatil',
    icon: '',
    bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    text: 'text-indigo-700 dark:text-indigo-300',
    badge: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  area_caes: {
    label: 'Área de Cães',
    icon: '',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }
};

export const ORIGIN_LABELS: Record<EntryOrigin, string> = {
  guarda_municipal: 'Guarda Municipal',
  resgate_ong: 'Resgate pela ONG',
  entrega_voluntaria: 'Entrega voluntária',
  resgate_emergencia: 'Resgate de emergência',
  terceiros: 'Terceiros',
  nao_informado: 'Não informado',
  outro: 'Outro'
};

export const SPECIES_LABELS: Record<SpeciesType, string> = {
  cachorro: 'Cachorro',
  gato: 'Gato',
  outro: 'Outro'
};

export const SEX_LABELS: Record<SexType, string> = {
  macho: 'Macho',
  femea: 'Fêmea'
};

export function formatWeight(weight?: string): string {
  if (!weight || !weight.trim()) return 'Não informado';
  const trimmed = weight.trim();
  if (/kg$/i.test(trimmed)) return trimmed;
  return `${trimmed} kg`;
}

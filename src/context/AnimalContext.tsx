import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Animal, 
  LocationType, 
  AdoptionDetails, 
  DeathDetails,
  LOCATION_LABELS 
} from '../types/animal';
import { INITIAL_MOCK_ANIMALS } from '../data/mockAnimals';
import { useAuth } from './AuthContext';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AnimalContextType {
  animals: Animal[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedAnimalId: string | null;
  setSelectedAnimalId: (id: string | null) => void;
  locationFilter: LocationType | null;
  setLocationFilter: (loc: LocationType | null) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Actions
  addAnimal: (animalData: Omit<Animal, 'id' | 'history' | 'status'>) => string;
  updateAnimal: (id: string, updatedData: Partial<Animal>) => void;
  changeLocation: (id: string, newLocation: LocationType, observation?: string) => void;
  registerAdoption: (id: string, details: { adoptionDate: string; adopterName: string; adopterContact: string; adopterAddress?: string; notes?: string }) => void;
  registerDeath: (id: string, details: { deathDate: string; notes?: string }) => void;
  undoLastAction: (id: string) => boolean;
  
  // Selectors/Helpers
  getAnimalById: (id: string) => Animal | undefined;
  navigateToAnimal: (id: string) => void;
  navigateToLocationVisualization: (loc: LocationType) => void;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export const AnimalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const operatorName = profile 
    ? `${profile.name} (${profile.role === 'admin' ? 'Coordenador' : 'Colaborador'})` 
    : 'Sistema';

  const [animals, setAnimals] = useState<Animal[]>(() => {
    const saved = localStorage.getItem('ong_animais_data_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved animal data', e);
      }
    }
    return INITIAL_MOCK_ANIMALS;
  });

  // Keep an undo stack in memory per animal
  const [undoStack, setUndoStack] = useState<Record<string, Animal[]>>({});

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<LocationType | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Persist mock state locally to maintain interactions across view switches
  useEffect(() => {
    localStorage.setItem('ong_animais_data_v1', JSON.stringify(animals));
  }, [animals]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto dismiss after 4s
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const pushUndoSnapshot = (animal: Animal) => {
    setUndoStack((prev) => ({
      ...prev,
      [animal.id]: [...(prev[animal.id] || []), JSON.parse(JSON.stringify(animal))]
    }));
  };

  const getAnimalById = (id: string) => {
    return animals.find((a) => a.id === id);
  };

  const navigateToAnimal = (id: string) => {
    setSelectedAnimalId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLocationVisualization = (loc: LocationType) => {
    setLocationFilter(loc);
    setSelectedAnimalId(null);
    setActiveTab('visualizacao');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addAnimal = (animalData: Omit<Animal, 'id' | 'history' | 'status'>): string => {
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newId = 'anim-' + Date.now().toString().slice(-6);

    const initialLocationName = LOCATION_LABELS[animalData.currentLocation]?.label || animalData.currentLocation;

    const newAnimal: Animal = {
      ...animalData,
      id: newId,
      status: 'no_abrigo',
      history: [
        {
          id: 'hist-' + Date.now(),
          date: formattedDate,
          title: 'Entrada registrada',
          description: `Animal registrado na ONG. Local inicial: ${initialLocationName}.`,
          user: operatorName,
          iconType: 'create'
        }
      ]
    };

    setAnimals((prev) => [newAnimal, ...prev]);
    showToast('Animal cadastrado com sucesso.', 'success');
    return newId;
  };

  const updateAnimal = (id: string, updatedData: Partial<Animal>) => {
    const current = getAnimalById(id);
    if (!current) return;

    pushUndoSnapshot(current);

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newHistoryEntry = {
      id: 'hist-' + Date.now(),
      date: formattedDate,
      title: 'Dados atualizados',
      description: 'Ficha e informações cadastrais atualizadas.',
      user: operatorName,
      iconType: 'edit' as const
    };

    setAnimals((prev) =>
      prev.map((anim) => {
        if (anim.id === id) {
          return {
            ...anim,
            ...updatedData,
            history: [newHistoryEntry, ...anim.history]
          };
        }
        return anim;
      })
    );

    showToast('Cadastro atualizado com sucesso.', 'success');
  };

  const changeLocation = (id: string, newLocation: LocationType, observation?: string) => {
    const current = getAnimalById(id);
    if (!current) return;

    pushUndoSnapshot(current);

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const oldLocLabel = LOCATION_LABELS[current.currentLocation]?.label || current.currentLocation;
    const newLocLabel = LOCATION_LABELS[newLocation]?.label || newLocation;

    const newHistoryEntry = {
      id: 'hist-' + Date.now(),
      date: formattedDate,
      title: 'Mudança de localização',
      description: `${oldLocLabel} → ${newLocLabel}.${observation ? ` Obs: ${observation}` : ''}`,
      user: operatorName,
      iconType: 'move' as const
    };

    setAnimals((prev) =>
      prev.map((anim) => {
        if (anim.id === id) {
          return {
            ...anim,
            currentLocation: newLocation,
            currentObservation: observation !== undefined ? observation : anim.currentObservation,
            history: [newHistoryEntry, ...anim.history]
          };
        }
        return anim;
      })
    );

    showToast('Localização atualizada com sucesso.', 'success');
  };

  const registerAdoption = (
    id: string,
    details: { adoptionDate: string; adopterName: string; adopterContact: string; adopterAddress?: string; notes?: string }
  ) => {
    const current = getAnimalById(id);
    if (!current) return;

    pushUndoSnapshot(current);

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const adoptionObj: AdoptionDetails = {
      adoptionDate: details.adoptionDate,
      exitDate: details.adoptionDate,
      adopterName: details.adopterName,
      adopterContact: details.adopterContact,
      adopterAddress: details.adopterAddress || '',
      notes: details.notes || ''
    };

    const newHistoryEntry = {
      id: 'hist-' + Date.now(),
      date: formattedDate,
      title: 'Adoção registrada',
      description: `Adotado por ${details.adopterName} em ${details.adoptionDate}.`,
      user: operatorName,
      iconType: 'adopt' as const
    };

    setAnimals((prev) =>
      prev.map((anim) => {
        if (anim.id === id) {
          return {
            ...anim,
            status: 'adotado',
            adoptionDetails: adoptionObj,
            history: [newHistoryEntry, ...anim.history]
          };
        }
        return anim;
      })
    );

    showToast('Adoção registrada com sucesso.', 'success');
  };

  const registerDeath = (id: string, details: { deathDate: string; notes?: string }) => {
    const current = getAnimalById(id);
    if (!current) return;

    pushUndoSnapshot(current);

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const deathObj: DeathDetails = {
      deathDate: details.deathDate,
      exitDate: details.deathDate,
      notes: details.notes || ''
    };

    const newHistoryEntry = {
      id: 'hist-' + Date.now(),
      date: formattedDate,
      title: 'Óbito registrado',
      description: `Óbito ocorrido em ${details.deathDate}.${details.notes ? ` Obs: ${details.notes}` : ''}`,
      user: operatorName,
      iconType: 'death' as const
    };

    setAnimals((prev) =>
      prev.map((anim) => {
        if (anim.id === id) {
          return {
            ...anim,
            status: 'obito',
            deathDetails: deathObj,
            history: [newHistoryEntry, ...anim.history]
          };
        }
        return anim;
      })
    );

    showToast('Óbito registrado com sucesso.', 'success');
  };

  const undoLastAction = (id: string): boolean => {
    const stack = undoStack[id];
    if (!stack || stack.length === 0) {
      showToast('Nenhuma alteração anterior para desfazer.', 'warning');
      return false;
    }

    const previousState = stack[stack.length - 1];

    // Pop snapshot
    setUndoStack((prev) => ({
      ...prev,
      [id]: prev[id].slice(0, -1)
    }));

    // Add undo log
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const undoHistoryEntry = {
      id: 'hist-' + Date.now(),
      date: formattedDate,
      title: 'Alteração desfeita',
      description: 'Restaurado o estado anterior do animal.',
      user: operatorName,
      iconType: 'undo' as const
    };

    const restoredAnimal = {
      ...previousState,
      history: [undoHistoryEntry, ...previousState.history]
    };

    setAnimals((prev) => prev.map((a) => (a.id === id ? restoredAnimal : a)));

    showToast('Última alteração desfeita com sucesso.', 'success');
    return true;
  };

  return (
    <AnimalContext.Provider
      value={{
        animals,
        activeTab,
        setActiveTab,
        selectedAnimalId,
        setSelectedAnimalId,
        locationFilter,
        setLocationFilter,
        toasts,
        showToast,
        removeToast,
        addAnimal,
        updateAnimal,
        changeLocation,
        registerAdoption,
        registerDeath,
        undoLastAction,
        getAnimalById,
        navigateToAnimal,
        navigateToLocationVisualization
      }}
    >
      {children}
    </AnimalContext.Provider>
  );
};

export const useAnimalContext = () => {
  const context = useContext(AnimalContext);
  if (!context) {
    throw new Error('useAnimalContext must be used within an AnimalProvider');
  }
  return context;
};

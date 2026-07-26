import React, { useState } from 'react';
import { AnimalProvider, useAnimalContext } from './context/AnimalContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { ShelterAnimalsView } from './components/animals/ShelterAnimalsView';
import { LocationVisualizationView } from './components/animals/LocationVisualizationView';
import { AdoptedAnimalsView } from './components/animals/AdoptedAnimalsView';
import { DeceasedAnimalsView } from './components/animals/DeceasedAnimalsView';
import { SettingsView } from './components/settings/SettingsView';
import { AnimalDetailView } from './components/animals/AnimalDetailView';

// Modals
import { NewAnimalModal } from './components/modals/NewAnimalModal';
import { EditAnimalModal } from './components/modals/EditAnimalModal';
import { ChangeLocationModal } from './components/modals/ChangeLocationModal';
import { RegisterAdoptionModal } from './components/modals/RegisterAdoptionModal';
import { RegisterDeathModal } from './components/modals/RegisterDeathModal';
import { UndoConfirmModal } from './components/modals/UndoConfirmModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainAppContent: React.FC = () => {
  const { activeTab, selectedAnimalId } = useAnimalContext();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedAnimalId, activeTab]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal triggers & targeted animal id
  const [isNewAnimalModalOpen, setIsNewAnimalModalOpen] = useState(false);
  const [targetedAnimalId, setTargetedAnimalId] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangeLocationModalOpen, setIsChangeLocationModalOpen] = useState(false);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [isDeathModalOpen, setIsDeathModalOpen] = useState(false);
  const [isUndoModalOpen, setIsUndoModalOpen] = useState(false);

  const openEditModal = (id: string) => {
    setTargetedAnimalId(id);
    setIsEditModalOpen(true);
  };

  const openChangeLocationModal = (id: string) => {
    setTargetedAnimalId(id);
    setIsChangeLocationModalOpen(true);
  };

  const openAdoptionModal = (id: string) => {
    setTargetedAnimalId(id);
    setIsAdoptionModalOpen(true);
  };

  const openDeathModal = (id: string) => {
    setTargetedAnimalId(id);
    setIsDeathModalOpen(true);
  };

  const openUndoModal = (id: string) => {
    setTargetedAnimalId(id);
    setIsUndoModalOpen(true);
  };

  const renderActiveView = () => {
    if (selectedAnimalId) {
      return (
        <AnimalDetailView
          animalId={selectedAnimalId}
          onOpenEditModal={openEditModal}
          onOpenChangeLocationModal={openChangeLocationModal}
          onOpenAdoptionModal={openAdoptionModal}
          onOpenDeathModal={openDeathModal}
          onOpenUndoModal={openUndoModal}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'no_abrigo':
        return (
          <ShelterAnimalsView
            onOpenNewAnimalModal={() => setIsNewAnimalModalOpen(true)}
            onOpenEditModal={openEditModal}
            onOpenChangeLocationModal={openChangeLocationModal}
          />
        );
      case 'visualizacao':
        return <LocationVisualizationView />;
      case 'adotados':
        return <AdoptedAnimalsView />;
      case 'obito':
        return <DeceasedAnimalsView />;
      case 'configuracoes':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenNewAnimalModal={() => setIsNewAnimalModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals */}
      <NewAnimalModal
        isOpen={isNewAnimalModalOpen}
        onClose={() => setIsNewAnimalModalOpen(false)}
      />

      <EditAnimalModal
        isOpen={isEditModalOpen}
        animalId={targetedAnimalId}
        onClose={() => setIsEditModalOpen(false)}
      />

      <ChangeLocationModal
        isOpen={isChangeLocationModalOpen}
        animalId={targetedAnimalId}
        onClose={() => setIsChangeLocationModalOpen(false)}
      />

      <RegisterAdoptionModal
        isOpen={isAdoptionModalOpen}
        animalId={targetedAnimalId}
        onClose={() => setIsAdoptionModalOpen(false)}
      />

      <RegisterDeathModal
        isOpen={isDeathModalOpen}
        animalId={targetedAnimalId}
        onClose={() => setIsDeathModalOpen(false)}
      />

      <UndoConfirmModal
        isOpen={isUndoModalOpen}
        animalId={targetedAnimalId}
        onClose={() => setIsUndoModalOpen(false)}
      />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AnimalProvider>
      <MainAppContent />
    </AnimalProvider>
  );
}

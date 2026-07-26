import React from 'react';
import { useAnimalContext } from '../../context/AnimalContext';
import { User, Mail, Shield, Building2, Database, Info, LogOut } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { showToast } = useAnimalContext();

  const handleLogout = () => {
    showToast('Sessão encerrada com sucesso (demonstração).', 'info');
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* User Profile Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shadow-md shrink-0">
            <img 
              src="https://i.imgur.com/O6TcG0n.png" 
              alt="Logo ONG Viva Bicho" 
              className="w-full h-full object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Maria Silva
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Coordenadora Geral & Gestora da ONG Viva Bicho
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Perfil do Usuário
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs text-slate-400 font-medium block">Nome Completo</span>
              <p className="font-semibold text-slate-900 dark:text-white mt-0.5">Maria Silva</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs text-slate-400 font-medium block">E-mail Corporativo</span>
              <p className="font-semibold text-slate-900 dark:text-white mt-0.5">maria.silva@vivabicho.org.br</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair do Sistema
            </button>
          </div>
        </div>
      </div>

      {/* ONG Organization info */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600" />
          Dados da Organização
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Razão Social</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm mt-0.5">ONG Associação Viva Bicho</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">CNPJ (Fictício)</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm mt-0.5">12.345.678/0001-90</p>
          </div>
        </div>
      </div>

      {/* Database/Architecture Notice */}
      <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Database className="w-5 h-5" />
          <span>Status do Desenvolvimento (Etapa 1 - Interface Visual)</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Nesta primeira etapa, toda a interface e os fluxos visuais estão prontos. Os dados são mantidos em memória e localmente no navegador. Em breve, na etapa 2, o sistema será conectado ao Supabase, banco de dados PostgreSQL, autenticação real e versionamento no GitHub.
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../context/lib/supabase';
import { ShieldAlert, KeyRound, Check, AlertCircle } from 'lucide-react';

export const FirstAccessChangePasswordView: React.FC = () => {
  const { user, signOut, refreshProfile } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (newPassword.length < 6) {
      setErrorMsg('A nova senha deve conter pelo menos 6 caracteres.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('A confirmação da senha não confere com a nova senha.');
      setLoading(false);
      return;
    }

    if (newPassword === '1234') {
      setErrorMsg('Por razões de segurança, você não pode continuar utilizando a senha padrão "1234".');
      setLoading(false);
      return;
    }

    try {
      // 1. Update password in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (authError) {
        throw new Error(authError.message || 'Erro ao redefinir senha.');
      }

      // 2. Update profile first_access flag to false
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ first_access: false })
          .eq('id', user.id);

        if (profileError) {
          throw new Error('Senha atualizada, mas houve um erro ao atualizar seu cadastro. Contate o administrador.');
        }

        // 3. Refresh profile state to unlock main dashboard
        await refreshProfile();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro durante a atualização.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 font-sans transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden p-8 space-y-6">
        
        {/* Banner Alert */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-500 shadow-sm">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
              Primeiro Acesso
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Para a segurança da sua conta, você deve alterar a senha inicial antes de continuar.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div 
            id="password-change-error"
            className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-semibold leading-relaxed"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="space-y-1.5">
            <label 
              htmlFor="new-password-input" 
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
            >
              Nova Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="new-password-input"
                type="password"
                required
                disabled={loading}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium transition-all"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label 
              htmlFor="confirm-password-input" 
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
            >
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="confirm-password-input"
                type="password"
                required
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a nova senha"
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="password-submit-button"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                Definir Senha e Acessar
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            type="button"
            onClick={signOut}
            className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors"
          >
            Cancelar e Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

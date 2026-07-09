import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Bem-vindo, {user?.name || 'Usuário'}</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">🌙</button>
        <span className="text-sm text-gray-600 dark:text-gray-300">B3 Swing Trade</span>
      </div>
    </header>
  );
}
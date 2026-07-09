import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 text-xl font-bold text-gray-800 dark:text-white">SwingTrack</div>
      <nav className="flex-1 px-2 space-y-1">
        <NavLink to="/" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Dashboard</NavLink>
        <NavLink to="/operacoes" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Operações</NavLink>
        <NavLink to="/carteira" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Carteira</NavLink>
        <NavLink to="/relatorios" className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Relatórios</NavLink>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button onClick={logout} className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">Sair</button>
      </div>
    </aside>
  );
}
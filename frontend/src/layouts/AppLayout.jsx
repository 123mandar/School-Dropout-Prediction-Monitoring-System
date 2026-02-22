import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h1 className="font-bold text-xl mb-6">Gov School Monitor</h1>
        <nav className="space-y-2">
          <Link className="block hover:text-yellow-300" to="/dashboard">Dashboard</Link>
          <Link className="block hover:text-yellow-300" to="/students">Students</Link>
          <Link className="block hover:text-yellow-300" to="/interventions">Interventions</Link>
          <Link className="block hover:text-yellow-300" to="/reports">Reports</Link>
        </nav>
        {user && (
          <div className="mt-8">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs uppercase">{user.role}</p>
            <button className="mt-3 text-sm bg-red-500 px-3 py-1 rounded" onClick={logout}>Logout</button>
          </div>
        )}
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AppLayout;

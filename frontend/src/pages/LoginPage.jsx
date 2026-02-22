import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'admin@govschool.local', password: 'Admin@123' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post('/auth/login', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">School Dropout Monitoring Login</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <input className="w-full border p-2 mb-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 mb-4" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-blue-700 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

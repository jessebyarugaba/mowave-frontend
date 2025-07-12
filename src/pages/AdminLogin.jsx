import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        if (!username || !password) return alert("Please fill all fields");

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8082/auth/login', { username, password });
            localStorage.setItem('adminToken', res.data.token);
            setToken(res.data.token);
            navigate('/dashboard');
        } catch (e) {
            alert(e.response?.data?.message || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white rounded shadow p-6">
                <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
                <input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4"
                />
                <button
                    onClick={login}
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ token }) => {
    const [stats, setStats] = useState({});
    const [payments, setPayments] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [logs, setLogs] = useState([]);

    const logout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin';
    };

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            const headers = { Authorization: `Bearer ${token}` };
            const statsRes = await axios.get('http://localhost:8082/admin/stats', { headers });
            setStats(statsRes.data);

            const paymentsRes = await axios.get('http://localhost:8082/admin/payments', { headers });
            setPayments(paymentsRes.data);

            const vouchersRes = await axios.get('http://localhost:8082/admin/vouchers', { headers });
            setVouchers(vouchersRes.data);

            const logsRes = await axios.get('http://localhost:8082/admin/logs', { headers });
            setLogs(logsRes.data);
        };

        fetchData();
    }, [token]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-600">Total Vouchers</p>
                    <p className="text-xl font-bold">{stats.totalVouchers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-600">Used Vouchers</p>
                    <p className="text-xl font-bold">{stats.usedVouchers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-600">Total Payments</p>
                    <p className="text-xl font-bold">{stats.totalPayments}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <p className="text-gray-600">Total Revenue</p>
                    <p className="text-xl font-bold">UGX {stats.totalRevenue}</p>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-2">Payments</h3>
            <div className="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Contact</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p.paymentid} className="border-t">
                                <td className="px-4 py-2">{p.paymentid}</td>
                                <td className="px-4 py-2">{p.amount}</td>
                                <td className="px-4 py-2">{p.paymentmethod}</td>
                                <td className="px-4 py-2">{p.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 className="text-xl font-bold mb-2">Vouchers</h3>
            <div className="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Code</th>
                            <th className="px-4 py-2 text-left">Used</th>
                            <th className="px-4 py-2 text-left">Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map(v => (
                            <tr key={v.id} className="border-t">
                                <td className="px-4 py-2">{v.code}</td>
                                <td className="px-4 py-2">{v.is_used ? 'Yes' : 'No'}</td>
                                <td className="px-4 py-2">{v.transactionid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 className="text-xl font-bold mb-2">Logs</h3>
            <div className="bg-white p-4 rounded shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Action</th>
                            <th className="px-4 py-2 text-left">Voucher</th>
                            <th className="px-4 py-2 text-left">IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(l => (
                            <tr key={l.id} className="border-t">
                                <td className="px-4 py-2">{l.action}</td>
                                <td className="px-4 py-2">{l.voucher_id}</td>
                                <td className="px-4 py-2">{l.ip_address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;

import React, { useState } from 'react';
import axios from 'axios';

const VoucherEntry = () => {
    const [code, setCode] = useState('');
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = async () => {
        setLoading(true);
        try {
            await axios.post('https://exclusive-madlin-phino-6d7723ae.koyeb.app/voucher/validate', { code });
            alert("Voucher validated successfully!");
        } catch (e) {
            alert(e.response?.data?.message || 'Error validating voucher');
        }
        setLoading(false);
    };

    const purchase = async () => {
        if (!amount || !phone) return alert("Please fill amount and phone");

        setLoading(true);
        try {
            await axios.post('https://exclusive-madlin-phino-6d7723ae.koyeb.app/voucher/purchase', { amount, phone });
            alert("Payment request sent! Complete it on your phone.");
        } catch (e) {
            alert(e.response?.data?.message || 'Error initiating purchase');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Enter Voucher Code</h2>
            <input
                placeholder="Voucher Code"
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full border rounded px-3 py-2 mb-4"
            />
            <button
                onClick={validate}
                disabled={loading}
                className={`w-full bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
                {loading ? 'Validating...' : 'Validate'}
            </button>

            <div className="my-6 border-t"></div>

            <h3 className="text-lg font-bold mb-2">Purchase Voucher</h3>
            <select
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
            >
                <option value="">Select Amount</option>
                <option value="500">UGX 500</option>
                <option value="1000">UGX 1,000</option>
                <option value="2000">UGX 2,000</option>
            </select>
            <input
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
            />
            <button
                onClick={purchase}
                disabled={loading}
                className={`w-full bg-green-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
            >
                {loading ? 'Processing...' : 'Purchase'}
            </button>

            {loading && <div className="mt-4"><div className="w-full bg-gray-200 rounded h-2 overflow-hidden"><div className="bg-green-500 h-2 animate-pulse"></div></div></div>}
        </div>
    );
};

export default VoucherEntry;

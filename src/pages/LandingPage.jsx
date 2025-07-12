import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to MoWave Hotspot</h1>
            <p className="mb-8 text-lg">Get connected easily — buy or enter a voucher!</p>
            <div className="flex space-x-4">
                <Link to="/voucher" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition">Enter Voucher</Link>
                <Link to="/voucher" className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded shadow hover:bg-yellow-300 transition">Purchase Voucher</Link>
            </div>
        </div>
    );
};

export default LandingPage;

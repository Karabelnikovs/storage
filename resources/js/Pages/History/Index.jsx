import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, history }) {
    const { user } = auth;

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch(route("history.index"));
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="History" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-4">History</h3>
                            <ul>
                                {history.map((entry) => (
                                    <li key={entry.id} className={`text-lg mb-2 ${getColorClass(entry.action)}`}>
                                        <span className="font-semibold">{entry.action}:</span> {entry.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Funkcija, kas atgriež klasi atkarībā no darbības
const getColorClass = (action) => {
    switch (action) {
        case 'Product Added':
            return 'text-green-500'; // Zaļa krāsa
        case 'Product Updated':
            return 'text-yellow-500'; // Dzeltens
        case 'Product Delited':
            return 'text-red-600'; // Sarkans
        default:
            return 'text-Neutral-950'; // Sarkans
    }
}

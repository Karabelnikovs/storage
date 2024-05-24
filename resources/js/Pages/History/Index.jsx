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
                <div className="max-w-7xl my-auto mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-3xl pl-10">
                        <div className="p-6 py-14 bg-white border-b border-gray-200">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">History</h3>
                                <ul>
                                    {history.map((entry) => (
                                        <li key={entry.id}>
                                            {entry.action}: {entry.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

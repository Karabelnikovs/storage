import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, history: initialHistory }) {
    const { user } = auth;
    const [filter, setFilter] = useState("All");

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

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredHistory = initialHistory.data.filter((entry) => {
        if (filter === "All") return true;
        return entry.action === filter;
    });

    return (
        <AuthenticatedLayout user={user}>
            <Head title="History" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-2xl sm:rounded-3xl">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-4">History</h3>
                            <div className="mb-4">
                                <label
                                    htmlFor="filter"
                                    className="font-semibold mr-2"
                                >
                                    Filter:
                                </label>
                                <select
                                    id="filter"
                                    value={filter}
                                    onChange={handleFilterChange}
                                    className="p-2 border rounded"
                                >
                                    <option value="All">All</option>
                                    <option value="Product Added">
                                        Product Added
                                    </option>
                                    <option value="Product Updated">
                                        Product Updated
                                    </option>
                                    <option value="Product Deleted">
                                        Product Deleted
                                    </option>
                                </select>
                            </div>
                            <ul>
                                {filteredHistory.map((entry) => (
                                    <li
                                        key={entry.id}
                                        className={`text-lg mb-2 ${getColorClass(
                                            entry.action
                                        )}`}
                                    >
                                        <span className="font-semibold">
                                            {entry.action}:
                                        </span>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: entry.description,
                                            }}
                                        ></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-8 flex justify-center items-center">
                            <Pagination cards={initialHistory}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Function to get color class based on action
const getColorClass = (action) => {
    switch (action) {
        case "Product Added":
            return "text-green-500"; // Green color
        case "Product Updated":
            return "text-yellow-500"; // Yellow color
        case "Product Deleted":
            return "text-red-700"; // Red color
        default:
            return "text-neutral-950"; // Neutral color
    }
};

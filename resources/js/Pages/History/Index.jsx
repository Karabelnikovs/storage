import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, history: initialHistory }) {
    const { user } = auth;
    const [filter, setFilter] = useState("All");
    const [history, setHistory] = useState(initialHistory.data);

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

    const filteredHistory = history.filter((entry) => {
        if (filter === "All") return true;
        return entry.action === filter;
    });

    const parseDescription = (description) => {
        const [username, ...descParts] = description.split(" ");
        const desc = descParts.join(" ");
        const timeMatch = desc.match(/database (.+)$/);
        const time = timeMatch ? timeMatch[1] : "";
        const cleanedDesc = desc.replace(/database .+$/, "").trim();
        return { username, desc: cleanedDesc, time };
    };

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
                                    <option value="Product Added">Product Added</option>
                                    <option value="Product Updated">Product Updated</option>
                                    <option value="Product Deleted">Product Deleted</option>
                                    <option value="Login">Login</option>
                                    <option value="Update settings">Update settings</option>
                                    <option value="Logout">Logout</option>
                                </select>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Username
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredHistory.map((entry) => {
                                        const { username, desc, time } = parseDescription(entry.description);
                                        return (
                                            <tr key={entry.id} className={getColorClass(entry.action)}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {username}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {entry.action}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: desc,
                                                        }}
                                                    ></span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {time}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
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
            return "bg-green-100"; // Light green background
        case "Product Updated":
            return "bg-yellow-100"; // Light yellow background
        case "Product Deleted":
            return "bg-red-100"; // Light red background
        default:
            return "bg-neutral-100"; // Light neutral background
    }
};

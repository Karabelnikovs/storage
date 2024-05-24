// resources/js/Pages/NotFound.jsx

import React from "react";
import { Link } from "@inertiajs/react";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
                <Link href="/" className="mt-6 inline-block text-lg text-blue-500 hover:underline">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

import axios from 'axios';
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserCard from "@/Components/UserCard";
import { Head } from "@inertiajs/react";
import AddProductCard from "@/Components/AddProductCard";

const DataManage = ({ products: initialProducts, auth }) => {
    const [products, setProducts] = useState(initialProducts);
    const { user } = auth;
    const { role } = user;

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`/products/${productId}`);
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("There was an error deleting the product!", error);
        }
    };

    return (
        <>
            <AuthenticatedLayout user={user}>
                <Head title="Manage Data" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-2xl sm:rounded-3xl">
                            <div className="p-6 bg-white flex justify-center items-center flex-col">
                                <h2 className="text-2xl font-bold mb-4">
                                    All Products:
                                </h2>
                                <div className="grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 mt-6">
                                    {products.map((product) => (
                                        <div className="w-48 h-48" key={product.id}>
                                            <UserCard
                                                name={product.name}
                                                role={product.quantity}
                                                email={product.description}
                                            />
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="mt-2 text-sm bg-red-500 text-white p-1 hover:bg-red-700 transition-all duration-500 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                    {role === "admin" && (
                                        <div className="w-48 h-96">
                                            <AddProductCard />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default DataManage;

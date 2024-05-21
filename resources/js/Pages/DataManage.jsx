import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserCard from "@/Components/UserCard";
import { Head, useForm } from "@inertiajs/react";
import AddProductCard from "@/Components/AddProductCard";
const DataManage = ({ products, auth }) => {
    const { user } = auth;
    const { name, role } = user;
    return (
        <>
            <AuthenticatedLayout user={user}>
                <Head title="Manage Data" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-2xl sm:rounded-3xl">
                            <div className="p-6 bg-white flex justify-center items-center flex-col ">
                                <h2 className="text-2xl font-bold mb-4">
                                    All Products:
                                </h2>
                                <div className="grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10  mt-6">
                                    {products.map((product) => (
                                        <div className="w-48 h-96">
                                            <UserCard
                                                name={product.name}
                                                role={product.quantity}
                                                email={product.description}
                                            />
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

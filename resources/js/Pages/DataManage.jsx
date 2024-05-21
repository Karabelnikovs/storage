import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserCard from "@/Components/UserCard";
import { Head, useForm } from "@inertiajs/react";
const DataManage = ({ products, auth }) => {
    const { user } = auth;
    return (
        <>
            <AuthenticatedLayout user={user}>
                <Head title="Manage Data" />

                {products.map((product) => (
                    <div className="w-48 h-96">
                        <UserCard
                            name={product.name}
                            role={product.quantity}
                            email={product.description}
                        />
                    </div>
                ))}
            </AuthenticatedLayout>
        </>
    );
};

export default DataManage;

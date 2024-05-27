import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserCard from "@/Components/UserCard";
import { Head, usePage } from "@inertiajs/react";
import AddProductCard from "@/Components/AddProductCard";
import AddOrderModal from "@/Components/AddOrderModal";
import EditProductModal from "@/Components/EditProductModal";
import DeleteProductModal from "@/Components/DeleteProductModal";
import toast from "react-hot-toast";
import ProductCard from "@/Components/ProductCard";
import OrderCard from "@/Components/OrderCard";

const OrdersManage = ({ orders: initialOrders, users, products, auth }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [orders, setProducts] = useState(initialOrders.data);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const { flash, errors } = usePage().props;

    const handleShowAdd = () => {
        setShowAdd(true);
    };

    const handleShowEdit = (product) => {
        setShowEdit(true);
        setEditProduct(product);
    };
    const handleShowDelete = (product) => {
        setShowDelete(true);
        setDeleteProduct(product);
    };

    useEffect(() => {
        if (flash && flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const { user } = auth;
    const { role } = user;
    return (
        <>
            <AuthenticatedLayout user={user}>
                <Head title="Manage Data" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-2xl sm:rounded-3xl">
                            <div className="p-6 bg-white flex justify-center items-center flex-col">
                                <h2 className="text-2xl font-bold mb-4">
                                    All Orders:
                                </h2>

                                <div className="grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 mt-6">
                                    {orders.map((order) => (
                                        <div
                                            className="w-48 h-48"
                                            key={order.id}
                                        >
                                            {users[order.user_id] && (
                                                <OrderCard
                                                    status={order.status}
                                                    handleShowEdit={
                                                        handleShowEdit
                                                    }
                                                    order={order}
                                                    handleShowDelete={
                                                        handleShowDelete
                                                    }
                                                    name={
                                                        users[order.user_id]
                                                            .name
                                                    }
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="w-48 h-48 flex justify-center items-center">
                                    <button onClick={() => handleShowAdd()}>
                                        <AddProductCard className="cursor-pointer" />
                                    </button>
                                </div>

                                {showAdd && (
                                    <AddOrderModal
                                        setShowAdd={setShowAdd}
                                        users={users}
                                        products={products}
                                    />
                                )}
                                {showEdit && editProduct && (
                                    <EditProductModal
                                        product={editProduct}
                                        setShowEdit={setShowEdit}
                                    />
                                )}
                                {showDelete && deleteProduct && (
                                    <DeleteProductModal
                                        product={deleteProduct}
                                        setShowDelete={setShowDelete}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default OrdersManage;
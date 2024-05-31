import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserCard from "@/Components/UserCard";
import AddUserCard from "@/Components/AddUserCard";
import EditUserModal from "@/Components/EditUserModal";
import AddUserModal from "@/Components/AddUserModal";
import DeleteProductModal from "@/Components/DeleteUserModal";
import { Head, usePage, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import toast from "react-hot-toast";

const UserManagement = ({ auth, users: initialUsers }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [users, setUsers] = useState(initialUsers.data);
    const { flash, errors } = usePage().props;
    const { user } = auth;
    const { role } = user;

    useEffect(() => {
        if (flash && flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const { post, setData } = useForm();

    const handleShowEdit = (user) => {
        if (
            role !== "admin" ||
            user.role !== "admin" ||
            user.id === auth.user.id
        ) {
            setShowEdit(true);
            setEditingUser(user);
        } else {
            toast.error("You are not authorized to edit this user.");
        }
    };

    const handleRoleChange = (userId, newRole) => {
        if (role === "admin" && newRole !== "admin") {
            // Handle role change
        } else {
            toast.error(
                "You are not authorized to change the role of this user."
            );
        }
    };

    const handleUserAdded = (newUser) => {
        // Handle user added
    };

    const handleShowDelete = (user) => {
        if (user.id === auth.user.id) {
            toast.error("You can't delete yourself here.");
        } else if (role === "admin") {
            if (user.role !== "admin") {
                setShowDelete(true);
                setDeleteUser(user);
            } else {
                toast.error("You are not authorized to delete other admins.");
            }
        } else {
            toast.error("You are not authorized to delete users.");
        }
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-2xl sm:rounded-3xl">
                        <div className="p-6 bg-white flex justify-center items-center flex-col">
                            <h2 className="text-2xl font-bold mb-4">
                                All Users:
                            </h2>

                            <div className="grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 mt-6">
                                {users.map((user) => (
                                    <div className="w-48 h-48" key={user.id}>
                                        <UserCard
                                            name={user.name}
                                            role={user.role}
                                            email={user.email}
                                            handleShowEdit={() =>
                                                handleShowEdit(user)
                                            }
                                            handleShowDelete={() =>
                                                handleShowDelete(user)
                                            }
                                            user={user}
                                        />
                                    </div>
                                ))}
                            </div>
                            {role === "admin" && (
                                <div className="w-48 h-48 flex justify-center items-center">
                                    <button onClick={() => setShowAdd(true)}>
                                        <AddUserCard className="cursor-pointer" />
                                    </button>
                                </div>
                            )}
                            {showEdit && editingUser && (
                                <EditUserModal
                                    user={editingUser}
                                    setShowEdit={setShowEdit}
                                    handleRoleChange={handleRoleChange}
                                />
                            )}
                            {showAdd && (
                                <AddUserModal
                                    setShowAdd={setShowAdd}
                                    onUserAdded={handleUserAdded}
                                />
                            )}
                            {showDelete && deleteUser && (
                                <DeleteProductModal
                                    user={deleteUser}
                                    setShowDelete={setShowDelete}
                                />
                            )}
                        </div>
                        <div className="mb-8 flex justify-center items-center">
                            <Pagination cards={initialUsers} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserManagement;

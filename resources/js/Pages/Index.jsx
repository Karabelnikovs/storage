
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserCard from "@/Components/UserCard";
import AddUserCard from "@/Components/AddUserCard";
import EditUserModal from "@/Components/EditUserModal";
import AddUserModal from "@/Components/AddUserModal";  
import { Head, usePage, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import toast from "react-hot-toast";

const UserManagement = ({ auth, users: initialUsers }) => {
    const [showAdd, setShowAdd] = useState(false);  
    const [showEdit, setShowEdit] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
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
        setShowEdit(true);
        setEditingUser(user);
    };

    const handleRoleChange = (userId, newRole) => {
       
    };

    const handleUserAdded = (newUser) => {
        // Add user logic
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-2xl sm:rounded-3xl">
                        <div className="p-6 bg-white flex justify-center items-center flex-col">
                            <h2 className="text-2xl font-bold mb-4">All Users:</h2>

                            <div className="grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10 mt-6">
                                {users.map((user) => (
                                    <div className="w-48 h-48" key={user.id}>
                                        <UserCard
                                            name={user.name}
                                            role={user.role}
                                            email={user.email}
                                            handleShowEdit={() => handleShowEdit(user)}
                                            user={user}
                                        />
                                    </div>
                                ))}
                                {role === "admin" && (
                                    <div className="w-48 h-48 flex justify-center items-center">
                                        <button onClick={() => setShowAdd(true)}>
                                            <AddUserCard className="cursor-pointer" />
                                        </button>
                                    </div>
                                )}
                            </div>

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

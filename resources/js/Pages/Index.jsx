import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddUserCard from "@/Components/AddUserCard";
import UserCard from "@/Components/UserCard";
import { Head, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function UserManagement({ auth, users }) {
    const { user } = auth;
    const { name, role } = user;
    const [editingUser, setEditingUser] = useState(null);
    const [newRole, setNewRole] = useState("");

    const { post, setData } = useForm();

    const handleRoleChange = (userId) => {
        // Pārbaude, vai pašreizējam lietotājam ir admin loma
        if (user.role !== "admin") {
            console.error("You do not have permission to change user roles.");
            return;
        }

        // Pārbaude, vai rediģējamā lietotāja loma nav admin
        if (users.find((u) => u.id === userId).role === "admin") {
            console.error("You cannot edit the role of an admin user.");
            return;
        }

        setData("role", newRole);

        post(route("user.management.update-role", userId), {
            data: { role: newRole },
            preserveScroll: true,
            onSuccess: () => {
                setUsers(
                    users.map((u) =>
                        u.id === userId ? { ...u, role: newRole } : u
                    )
                );
                setEditingUser(null);
                setNewRole("");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-2xl sm:rounded-3xl">
                        <div className="p-6 bg-white flex justify-center items-center flex-col ">
                            <h2 className="text-2xl font-bold mb-4">
                                All Users:
                            </h2>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10  mt-6">
                                {users.data.map((user) => (
                                    <div className="w-48 h-48">
                                        <UserCard
                                            name={user.name}
                                            role={user.role}
                                            email={user.email}
                                        />
                                    </div>
                                ))}

                                {role === "admin" && (
                                    <div className="w-48 h-48">
                                        <AddUserCard />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-8 flex justify-center items-center">
                            <Pagination cards={users}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

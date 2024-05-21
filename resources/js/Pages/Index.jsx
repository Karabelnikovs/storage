import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddUserCard from "@/Components/AddUserCard";
import UserCard from "@/Components/UserCard";
import { Head, useForm } from "@inertiajs/react";

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
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Management
                </h2>
            }
        >
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-2xl font-bold mb-4">
                                Welcome, {name}!
                            </h3>
                            <p className="text-lg">Role: {role}</p>
                            <h3 className="text-2xl font-bold mb-4">
                                All Users:
                            </h3>
                            <div className="grid lg:grid-cols-4 gap-4 grid-cols-1">
                                {users.map((user) => (
                                    <div className="w-48 h-96">
                                        <UserCard
                                            name={user.name}
                                            role={user.role}
                                            email={user.email}
                                        />
                                    </div>
                                ))}

                                {role === "admin" && (
                                    <div className="w-48 h-96">
                                        <AddUserCard />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

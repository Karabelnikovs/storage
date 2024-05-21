import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function UserManagement({ auth, users: initialUsers }) {
    const { user } = auth;
    const { name, role } = user;
    const [createError, setCreateError] = useState(null);

    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);
    const [newRole, setNewRole] = useState("");
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const { post, delete: destroy, setData } = useForm();

    const handleRoleChange = (userId) => {
        if (role !== "admin") {
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

    const handleUserDelete = (userId) => {
        if (role !== "admin") {
            return;
        }

        destroy(route("user.management.destroy", userId), {
            preserveScroll: true,
            onSuccess: () => {
                setUsers(users.filter((u) => u.id !== userId));
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleUserCreate = () => {
        if (role !== "admin") {
            return;
        }

        // Pārbauda, vai visi obligātie lauki ir aizpildīti
        if (
            !newUser.name ||
            !newUser.email ||
            !newUser.password ||
            !newUser.role
        ) {
            console.error("All fields are required.");
            return;
        }

        post(route("user.management.create"), {
            data: newUser,
            preserveScroll: true,
            onSuccess: (response) => {
                setUsers([...users, response.user]);
                setNewUser({ name: "", email: "", password: "", role: "" }); // Atiestatam formas laukus
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const getRoleClass = (role) => {
        switch (role) {
            case "admin":
                return "bg-red-100";
            case "worker":
                return "bg-blue-100";
            case "sorter":
                return "bg-green-100";
            default:
                return "";
        }
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-2xl font-bold mb-4">
                                Welcome, {name}!
                            </h3>
                            <p className="text-lg">Role: {role}</p>

                            {role === "admin" && (
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold mb-4">
                                        Create New User:
                                    </h3>
                                    <input
                                        type="text"
                                        value={newUser.name}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Name"
                                        className="border rounded p-2 mr-2"
                                    />

                                    <input
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="Email"
                                        className="border rounded p-2 mr-2"
                                    />
                                    <input
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                password: e.target.value,
                                            })
                                        }
                                        placeholder="Password"
                                        className="border rounded p-2 mr-2"
                                    />
                                    <select
                                        value={newUser.role}
                                        onChange={(e) =>
                                            setNewUser({
                                                ...newUser,
                                                role: e.target.value,
                                            })
                                        }
                                        className="border rounded p-2 mr-2"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="worker">Worker</option>
                                        <option value="sorter">Sorter</option>
                                    </select>
                                    <button
                                        onClick={handleUserCreate}
                                        className="bg-green-500 text-white rounded-md px-4 py-2"
                                    >
                                        Create
                                    </button>
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-4">
                                All Users:
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b-2 border-gray-200">
                                                Name
                                            </th>
                                            {role === "admin" && (
                                                <th className="py-2 px-4 border-b-2 border-gray-200">
                                                    Email
                                                </th>
                                            )}
                                            <th className="py-2 px-4 border-b-2 border-gray-200">
                                                Role
                                            </th>
                                            {role === "admin" && (
                                                <th className="py-2 px-4 border-b-2 border-gray-200">
                                                    Actions
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className={getRoleClass(
                                                    user.role
                                                )}
                                            >
                                                <td className="py-2 px-4 border-b border-gray-200 font-bold">
                                                    {user.name}
                                                </td>
                                                {role === "admin" && (
                                                    <td className="py-2 px-4 border-b border-gray-200">
                                                        {user.email}
                                                    </td>
                                                )}
                                                <td className="py-2 px-4 border-b border-gray-200">
                                                    {user.role}
                                                </td>
                                                {role === "admin" &&
                                                    user.id !==
                                                        auth.user.id && (
                                                        <td className="py-2 px-4 border-b border-gray-200">
                                                            {editingUser ===
                                                            user.id ? (
                                                                <div className="flex">
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            newUser.name
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setNewUser(
                                                                                {
                                                                                    ...newUser,
                                                                                    name: e
                                                                                        .target
                                                                                        .value,
                                                                                }
                                                                            )
                                                                        }
                                                                        placeholder="Name"
                                                                        className="border rounded p-2 mr-2"
                                                                    />
                                                                    <input
                                                                        type="email"
                                                                        value={
                                                                            newUser.email
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setNewUser(
                                                                                {
                                                                                    ...newUser,
                                                                                    email: e
                                                                                        .target
                                                                                        .value,
                                                                                }
                                                                            )
                                                                        }
                                                                        placeholder="Email"
                                                                        className="border rounded p-2 mr-2"
                                                                    />
                                                                    <select
                                                                        value={
                                                                            newRole
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setNewRole(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="border rounded p-2 mr-2"
                                                                    >
                                                                        <option value="">
                                                                            Select
                                                                            Role
                                                                        </option>
                                                                        <option value="admin">
                                                                            Admin
                                                                        </option>
                                                                        <option value="worker">
                                                                            Worker
                                                                        </option>
                                                                        <option value="sorter">
                                                                            Sorter
                                                                        </option>
                                                                    </select>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleRoleChange(
                                                                                user.id
                                                                            )
                                                                        }
                                                                        className="bg-blue-500 text-white rounded-md px-2 py-1 ml-2"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="flex">
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingUser(
                                                                                user.id
                                                                            );
                                                                            setNewUser(
                                                                                {
                                                                                    name: user.name,
                                                                                    email: user.email,
                                                                                    role: user.role,
                                                                                }
                                                                            );
                                                                            setNewRole(
                                                                                user.role
                                                                            );
                                                                        }}
                                                                        className="bg-blue-500 text-white rounded-md px-2 py-1 ml-2"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleUserDelete(
                                                                                user.id
                                                                            )
                                                                        }
                                                                        className="bg-red-500 text-white rounded-md px-2 py-1 ml-2"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

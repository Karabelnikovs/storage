import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function UserManagement({ auth, users }) {
    const { user } = auth;
    const { name, role } = user;

    const handleRoleChange = (userId, newRole) => {
        // Izveido funkciju, kas mainīs lietotāja lomu un saglabās izmaiņas
        // Tu vari izmantot API, lai saglabātu izmaiņas
        console.log(`Changing role for user ${userId} to ${newRole}`);
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
                            <h3 className="text-2xl font-bold mb-4">Welcome, {name}!</h3>
                            <p className="text-lg">Role: {role}</p>
                            <h3 className="text-2xl font-bold mb-4">All Users:</h3>
                            <ul>
                                {users.map((user, index) => (
                                    <li key={index} className={`bg-${user.role}-100 rounded-md p-2 mb-2`}>
                                        Name: {user.name}, Role: {user.role}
                                        {user.id !== auth.user.id && (
                                            <button onClick={() => handleRoleChange(user.id, 'newRole')} className="bg-blue-500 text-white rounded-md px-2 py-1 ml-2">
                                                Change Role
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    const { user } = auth;
    const { name, role } = user;

    const renderRoleSpecificContent = () => {
        switch (role) {
            case 'admin':
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Administrator Dashboard
                        </h3>
                        <p className="text-lg">
                            You have full access to manage users and data within the warehouse system. You can create, edit, and delete user accounts, generate reports, and manage all warehouse data.
                        </p>
                    </div>
                );
            case 'worker':
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Warehouse Worker Dashboard
                        </h3>
                        <p className="text-lg">
                            You can input, edit, and update data within the system. Manage product information, handle orders, and generate reports to ensure efficient warehouse operations.
                        </p>
                    </div>
                );
            case 'sorter':
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Shelf Organizer Dashboard
                        </h3>
                        <p className="text-lg">
                            You are responsible for correctly placing products on shelves according to the warehouse system. Prepare goods for reports, and ensure accurate data entry about shelf contents.
                        </p>
                    </div>
                );
            default:
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Dashboard
                        </h3>
                        <p className="text-lg">
                            Welcome to the warehouse management system. Your role is not specified.
                        </p>
                    </div>
                );
        }
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-3xl pl-10">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-2xl font-bold mb-4">
                                Welcome, {name}!
                            </h3>
                            <p className="text-lg">Role: {role}</p>
                            {renderRoleSpecificContent()}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

const ProductEdit = ({ product, auth }) => {
    const { data, setData, put, errors } = useForm({
        name: product.name,
        quantity: product.quantity,
        description: product.description,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(`/products/${product.id}`, data);
            // Atjauno produkta sarakstu pēc veiksmīgas atjaunošanas
            // Jūs varat izmantot kaut kādu apstiprinājumu vai pārbaudīt, vai atbildes statuss ir veiksmīgs
        } catch (error) {
            console.error("There was an error updating the product!", error);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Product" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-2xl sm:rounded-3xl">
                        <div className="p-6 bg-white">
                            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        
                                        <input
                                            type="text"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <input
                                            type="text"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', e.target.value)}
                                        />
                                        {errors.quantity && <div className="text-red-500">{errors.quantity}</div>}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <div className="text-red-500">{errors.description}</div>}
                                </div>
                                <div className="mt-6">
                                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
};

export default ProductEdit;

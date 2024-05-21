import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, router } from "@inertiajs/react";

const AddProduct = ({ auth, products }) => {
    const { data, setData, reset } = useForm({
        name: "",
        description: "",
        quantity: "",
    });
    const saveProduct = (e) => {
        e.preventDefault();
        router.post("/products", data, {
            onSuccess: reset(),
        });
    };

    console.log(products);
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Add Product" />

                <div className="flex items-center justify-center">
                    <form onSubmit={saveProduct}>
                        <div className="py-6 flex flex-col justify-center sm:py-12">
                            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-bl from-green-400 to-green-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                                    <div className="max-w-md mx-auto">
                                        <div>
                                            <h1 className="text-2xl font-semibold">
                                                Add Product
                                            </h1>
                                        </div>
                                        <div className="divide-y divide-gray-200">
                                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                                <div className="relative">
                                                    <input
                                                        autoComplete="off"
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 border-t-0 border-r-0 border-l-0 focus:outline-0 "
                                                        placeholder="Name"
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        value={data.name}
                                                    />
                                                    <label
                                                        htmlFor="name"
                                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                    >
                                                        Name
                                                    </label>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        autoComplete="off"
                                                        id="description"
                                                        name="description"
                                                        type="text"
                                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 border-t-0 border-r-0 border-l-0 focus:outline-none "
                                                        placeholder="Description"
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        value={data.description}
                                                    />
                                                    <label
                                                        htmlFor="description"
                                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                    >
                                                        Description
                                                    </label>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        autoComplete="off"
                                                        id="quantity"
                                                        name="quantity"
                                                        type="number"
                                                        min={1}
                                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 border-t-0 border-r-0 border-l-0 focus:outline-none "
                                                        placeholder="Quantity"
                                                        onChange={(e) =>
                                                            setData(
                                                                "quantity",
                                                                e.target.value
                                                            )
                                                        }
                                                        value={data.quantity}
                                                    />
                                                    <label
                                                        htmlFor="quantity"
                                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                    >
                                                        Quantity
                                                    </label>
                                                </div>
                                                <div className="relative">
                                                    <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default AddProduct;

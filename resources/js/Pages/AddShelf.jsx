import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import toast from "react-hot-toast";
import { Head, Link, useForm, router, usePage } from "@inertiajs/react";

const AddShelf = ({ auth, products }) => {
    const { flash, errors } = usePage().props;
    const { data, setData, reset } = useForm({
        name: "",
    });
    const saveProduct = (e) => {
        e.preventDefault();
        router.post("/shelfs", data, {
            onSuccess: reset(),
        });
    };
    useEffect(() => {
        if (flash && flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Add Product" />

                <div className="flex items-center justify-center">
                    <form onSubmit={saveProduct} className="w-full mt-10">
                        <div className="py-6 flex flex-col justify-center sm:py-12">
                            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-bl from-green-100 to-lime-200 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                                <div className="relative px-4 py-10 bg-white shadow-xl sm:rounded-3xl sm:p-20">
                                    <div className="max-w-md mx-auto">
                                        <div>
                                            <h1 className="text-2xl font-semibold">
                                                Add Shelf
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
                                                {errors.name && (
                                                    <p className="text-red-700 text-sm mt-2">
                                                        {errors.name}
                                                    </p>
                                                )}
                                                <div className="relative">
                                                    <button className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-green-100 to-lime-200 py-3 px-6 font-dm text-base font-medium text-gray-440 shadow-xl shadow-lime-300/45 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
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

export default AddShelf;

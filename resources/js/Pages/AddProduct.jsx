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
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Add Product
                    </h2>
                }
            >
                <Head title="Add Product" />
                <div className="w-full mt-24 flex items-center justify-center">
                    <form className="w-96" onSubmit={saveProduct}>
                        <h1 className="mb-4 text-4xl font-bold">Add product</h1>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                type="name"
                                name="name"
                                className="mt-1 block w-full py-1 px-2  "
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                value={data.name}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />

                            <TextInput
                                id="description"
                                type="description"
                                name="description"
                                className="mt-1 block w-full py-1 px-2"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                value={data.description}
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="quantity" value="Quantity" />
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                value={data.quantity}
                            ></input>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4">
                                Add Product
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default AddProduct;

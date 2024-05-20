import { Link, Head } from "@inertiajs/react";
import { BiLogoCodepen } from "react-icons/bi";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="flex flex-col justify-center items-center h-screen w-full bg-gradient-to-r from-slate-400 to-green-200">
                <h1 className="text-4xl font-bold mb-8 flex flex-col items-center justify-center gap-10">
                    <BiLogoCodepen size={60} />
                    Storage management app
                </h1>
                {auth.user ? (
                    <Link
                        className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                        href={route("dashboard")}
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                            href={route("login")}
                        >
                            Log in
                        </Link>
                        <Link
                            className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                            href={route("register")}
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}

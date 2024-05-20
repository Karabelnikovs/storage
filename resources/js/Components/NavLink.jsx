import { Link } from "@inertiajs/react";

<<<<<<< HEAD
export default function NavLink({ active = false, className = '', children, ...props }) {
    const baseClasses = 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ';
    const activeClasses = 'border-indigo-400 text-gray-900 focus:border-indigo-700 ';
    const inactiveClasses = 'border-transparent txt-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ';
=======
export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    const baseClasses = " ";
    const activeClasses =
        "bg-white inline-block border-l border-t border-r rounded-t py-5 px-4 text-blue-700 font-semibold";
    const inactiveClasses =
        "bg-white inline-block py-5 px-4 text-slate-400 hover:text-blue-800 font-semibold border-b";
>>>>>>> d269a927ff83b0f4da1188410b537d953bfc0cf9

    return (
        <Link
            {...props}
            className={`${baseClasses} ${
                active ? activeClasses : inactiveClasses
            } ${className}`}
        >
            {children}
        </Link>
    );
}

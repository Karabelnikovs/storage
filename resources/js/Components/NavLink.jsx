import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    const baseClasses =
        "inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ";
    const activeClasses =
        "border-green-500 text-gray-900 focus:border-green-700 ";
    const inactiveClasses =
        "border-transparent txt-gray-500 hover:text-gray-700 hover:border-green-300 focus:text-gray-700 focus:border-green-300 ";

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

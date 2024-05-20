import { Link } from "@inertiajs/react";

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

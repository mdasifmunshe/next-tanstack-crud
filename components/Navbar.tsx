import Link from 'next/link'

const navLinks = [
    { id: 1, link: '/dashboard', path: 'Dashboard' },
    { id: 2, link: '/addtodo', path: 'Add Todo' },
]

export default function Navbar() {
    return (
        <nav className="flex h-14 w-full items-center justify-center gap-4 border-b-2 border-blue-600">
            <div className="flex h-full flex-row items-center justify-center gap-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.id}
                        className="h-full p-4 font-bold hover:bg-blue-600 hover:text-white"
                        href={link.link}
                    >
                        {' '}
                        {link.path}{' '}
                    </Link>
                ))}
            </div>
        </nav>
    )
}

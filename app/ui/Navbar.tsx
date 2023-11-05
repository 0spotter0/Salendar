import Link from 'next/link'

const navItemClass = "hover:text-zoe-green transition-colors duration-200"

export default function Navbar() {
    return (
        <div className="flex justify-between px-10 py-4 border-black bg-white">
                <Link href="/">
                    <div className='flex h-20 items-center gap-3'>
                        <img src="/salamander_thick.png" className='w-20 object-contain'></img>
                        <p className={`text-2xl font-semibold`}>Salendar</p>
                    </div>
                </Link>
            <div className={`flex gap-8 items-center text-lg font-medium`}>
                <Link className={navItemClass} href='/'>About</Link>
                <Link className={navItemClass} href='/upload'>Upload</Link>
            </div>
        </div>
    )
}
import { useRouter } from 'next/router'
import Link from 'next/link'
import classnames from 'classnames'

export default function SubNavbar() {
    const router = useRouter()
    const navItems = [
        { label: 'Home', route: '/' },
        { label: 'Notifications', route: '/notifications' },
        { label: 'Schools', route: '/schools' },
        { label: 'Fast Facts', route: '/fastfacts' }
    ]

    return (
        <div className="flex flex-row w-screen h-[80px] px-[40px] items-center border-b-[1px] border-[#efefef]">
            <ul className="flex flex-row">
                {navItems.map((item, index) => (
                    <Link href={item.route}>
                    <li
                        key={`${item}-${index}`}
                        className={classnames("py-[28px] mx-[24px]", { "border-b-[3px] border-[#50B8C2]": router.route === item.route })}
                    >
                        {item.label}
                    </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

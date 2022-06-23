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
                {navItems.map((item, index) => {
                    const isActive = router.route === item.route
                    return (
                        <Link href={item.route} key={`${item}-${index}`} passHref>
                            <li className={classnames("py-[28px] mx-[24px] cursor-pointer", { "border-b-[3px] border-ocean": isActive })}>
                                <a className={classnames("font-medium", { "text-ocean": isActive })}>
                                    {item.label}
                                </a>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

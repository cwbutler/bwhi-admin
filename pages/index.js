import AppLayout from '../components/AppLayout'
import Image from 'next/image'
import notificationsImg from '../public/images/manageNotifications.png'
import schoolsImg from '../public/images/manageSchools.png'
import factsImg from '../public/images/manageFacts.png'
import Link from 'next/link'

export default function HomePage() {
  const services = [
    { name: 'Manage Notification', icon: notificationsImg, route: '/notifications' },
    { name: 'Manage Schools', icon: schoolsImg, route: '/schools' },
    { name: 'Manage Fast Facts', icon: factsImg, route: '/fastfacts' },
  ]

  return (
    <AppLayout>
      <div className="flex flex-auto flex-col px-[60px]">
        <h1 className="font-medium text-[40px] mt-[60px] mb-[40px]">Select a service</h1>
        <div className="flex flex-row flex-wrap justify-around">
          {services.map(({name, icon, route}, index) => (
            <Link href={route} key={`${name}-${index}`}>
              <div className="flex flex-col items-center rounded-[40px] border-black border-[1px] p-[40px] w-[384px] h-[384px] mb-[25px]">
                <Image
                  alt={name}
                  src={icon}
                />
                <span className="font-medium text-[32px] text-center mt-[60px] w-[200px]">{name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

import Layout from '../components/Layout'
import Image from 'next/image'
import image from '../public/images/login_image.jpeg'

export default function AuthLayout(props) {
  return (
    <Layout
      title={props.title}
      description={props.description}
      className="flex flex-row"
    >
        <div className="relative flex flex-1">    
            <Image
                priority
                alt="BWHI Auth"
                src={image}
                layout="fill"
            />
        </div>

        {props.children}
    </Layout>
  )
}

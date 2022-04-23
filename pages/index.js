import { useEffect } from 'react'
import Layout from '../components/Layout'
import { useSession, signIn } from "next-auth/react"

export default function Login() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') signIn();
  }, [status]);

  return (
    <Layout
      title="BWHI Admin | Login"
      description="Login into BWHI admin"
      className="flex flex-row"
    >
    </Layout>
  )
}

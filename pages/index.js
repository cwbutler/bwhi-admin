import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

export default function Login() {
  return (
    <Layout
      title="BWHI Admin | Login"
      description="Login into BWHI admin"
      className="flex flex-row"
    >
      <Navbar />
    </Layout>
  )
}

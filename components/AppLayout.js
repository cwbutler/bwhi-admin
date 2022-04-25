import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import SubNavbar from './SubNav'

export default function AppLayout(props) {
  return (
    <Layout
      title="BWHI Admin | Login"
      description="Login into BWHI admin"
      className="flex flex-col"
    >
      <Navbar />
      <SubNavbar />

      {props.children}
    </Layout>
  )
}

import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PageToolbar from '../components/PageToolbar'
import Table from '../components/Table'
import SchoolModal from '../components/SchoolModal'
import { addSelectedSchool, updateSelectedSchool } from '../state/reducers/schools'

export default function SchoolsPage() {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const schools = useSelector((state) => state.schools.list)
  const columns = useMemo(() => [
    { Header: 'School Name', accessor: 'name' },
    { Header: 'Service Center', accessor: 'service_center' },
    { Header: 'Hours of Operation', accessor: 'hours' },
    { Header: 'Phone Number', accessor: 'phone' },
    { Header: 'Website', accessor: 'website' }
  ], [])

  return (
    <AppLayout
        title="Schools | BWHI Admin"
        description="Schools page for BWHI Admin"
    >
      <PageToolbar
        pageTitle="Schools"
        actionTitle="Add New School"
        onActionClick={() => setIsModalOpen(true)}
      />
      
      <div className="bg-white px-[54px] py-[43px] self-stretch grow mx-[42px] my-[20px] rounded-[40px]">
        <Table columns={columns} data={schools} />
      </div>

      <SchoolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onChange={(data) => dispatch(updateSelectedSchool(data))}
        onPublish={() => {
          dispatch(addSelectedSchool())
          setIsModalOpen(false)
        }}
      />
    </AppLayout>
  )
}

import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import AppLayout from '../components/AppLayout'
import PageToolbar from '../components/PageToolbar'
import Table from '../components/Table'
import FactModal from '../components/FactModal'
import { addSelectedFact, updateSelectedFact } from '../state/reducers/facts'

export default function FastFactsPage() {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const facts = useSelector((state) => state.facts.list)
  const columns = useMemo(() => [
    { Header: 'Image', accessor: 'image', Cell: ({ value }) => <Image alt="Item Image" src={value} width={120} height={120} /> },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Description', accessor: 'description' }
  ], [])

  return (
    <AppLayout
        title="Fast Facts | BWHI Admin"
        description="Fast facts page for BWHI Admin"
    >
      <PageToolbar
        pageTitle="Fast Facts"
        actionTitle="Add New Fast Fact"
        onActionClick={() => setIsModalOpen(true)}
      />
      
      <div className="bg-white px-[54px] py-[43px] self-stretch grow mx-[42px] my-[20px] rounded-[40px]">
        <Table columns={columns} data={facts} />
      </div>

      <FactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        onChange={(data) => dispatch(updateSelectedFact(data))}
        onPublish={() => {
          dispatch(addSelectedFact())
          setIsModalOpen(false)
        }}
      />
    </AppLayout>
  )
}

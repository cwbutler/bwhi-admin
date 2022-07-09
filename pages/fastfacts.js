import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import AppLayout from '../components/AppLayout'
import PageToolbar from '../components/PageToolbar'
import Table from '../components/Table'
import FactModal from '../components/FactModal'
import { addSelectedFact, updateSelectedFact, resetSelectedFact } from '../state/reducers/facts'

export default function FastFactsPage() {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const facts = useSelector((state) => state.facts.list)
  const selectedFact = useSelector((state) => state.facts.selectedFact)
  const columns = useMemo(() => [
    { Header: 'Image', accessor: 'image', Cell: ({ value }) => value ? <Image alt="Item Image" src={value} width={120} height={120} /> : null},
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
        <Table
          columns={columns}
          data={facts}
          onEdit={(row) => {
            dispatch(updateSelectedFact(row))
            setIsEditing(true)
            setIsModalOpen(true)
          }}
          onDelete={(row) => console.log(row)}
        />
      </div>

      <FactModal
        {...selectedFact}
        isOpen={isModalOpen}
        onClose={() => {
          dispatch(resetSelectedFact())
          setIsModalOpen(false)
        }}
        onCancel={() => setIsModalOpen(false)}
        onChange={(data) => dispatch(updateSelectedFact(data))}
        onPublish={() => {
          if (isEditing) dispatch(updateSelectedFact(selectedFact))
          else dispatch(addSelectedFact())
          setIsModalOpen(false)
        }}
      />
    </AppLayout>
  )
}

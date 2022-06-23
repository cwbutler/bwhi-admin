import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import AppLayout from '../components/AppLayout'
import AlertModal from '../components/AlertModal'
import PageToolbar from '../components/PageToolbar'
import Table from '../components/Table'
import { updateSelectedAlert, addSelectedAlert, resetSelectedAlert } from '../state/reducers/notifications'


export default function NotificationsPage() {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const dispatch = useDispatch()
  const alerts = useSelector(state => state.notifications.list)
  const columns = useMemo(() => [
    { Header: 'Image', accessor: 'image', Cell: ({ value }) => <Image alt="Item Image" src={value} width={120} height={120} /> },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Date Scheduled', accessor: 'time' }
  ], [])

  return (
    <AppLayout
        title="Notifications | BWHI Admin"
        description="Notifications page for BWHI Admin"
    >
      <PageToolbar
        pageTitle="Notifications"
        actionTitle="Add New Alert"
        onActionClick={() => setIsAlertModalOpen(true)}
      />
      
      <div className="bg-white px-[54px] py-[43px] self-stretch grow mx-[42px] my-[40px] rounded-[40px]">
        <Table columns={columns} data={alerts} />
      </div>

      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => {
          dispatch(resetSelectedAlert())
          setIsAlertModalOpen(false)
        }}
        onChange={(data) => dispatch(updateSelectedAlert(data))}
        onPublish={() => {
          dispatch(addSelectedAlert())
          setIsAlertModalOpen(false)
        }}
      />
    </AppLayout>
  )
}

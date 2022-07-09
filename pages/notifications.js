import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import AlertModal from '../components/AlertModal'
import Page from '../components/PageLayout'
import { fetchNotifications, addNotifiction, updateNotification, selectors, deleteNotification, setSelected } from '../state/reducers/notifications'   

export default function NotificationsPage() {
  const dispatch = useDispatch()
  const alerts = useSelector(state => selectors.selectAll(state)) || []
  const selectedAlert = useSelector(state => state.notifications.entities[state.notifications.selectedId]) || {}
  const columns = [
    { Header: 'Image', accessor: 'image', Cell: ({ value }) => value ? <Image alt="Item Image" src={value} width={120} height={120} /> : null },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Date Scheduled', accessor: 'datetime' }
  ]

  return (
    <Page
      items={alerts}
      selectedItem={selectedAlert}
      fetchItems={() => dispatch(fetchNotifications())}
      headerTitle="Notifications | BWHI Admin"
      headerDescription="Notifications page for BWHI Admin"
      pageTitle="Notifications"
      actionTitle="Add New Alert"
      columns={columns}
      onEdit={({ id }) => dispatch(setSelected(id))}
      onDelete={(data) => dispatch(deleteNotification(data))}
      Modal={AlertModal}
      onModalClose={() => dispatch(setSelected(undefined))}
      onUpdateItem={(data) => dispatch(updateNotification(data))}
      onAddItem={(data) => dispatch(addNotifiction(data))}
    />
  )
}

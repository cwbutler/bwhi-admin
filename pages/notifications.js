import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import AlertModal from '../components/AlertModal'
import Page from '../components/PageLayout'
import { fetchNotifications, addNotifiction, updateNotification, selectors, deleteNotification, setSelected } from '../state/reducers/notifications'   
import { useState } from 'react'

export default function NotificationsPage() {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const alerts = useSelector(state => selectors.selectAll(state)) || []
  const items = alerts.filter(item => {
    return (value == 1) ? item.type == "affirmation" : item.type == "reminder"
  })
  const selectedAlert = useSelector(state => state.notifications.entities[state.notifications.selectedId]) || {}
  const columns = [
    { Header: 'Image', accessor: 'image', Cell: ({ value }) => value ? <Image alt="Item Image" src={value} width={120} height={120} /> : null },
    { Header: 'Type', accessor: 'type' },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Description', accessor: 'body' },
    { Header: 'Date Scheduled', accessor: 'scheduledTime' }
  ]

  return (
    <Page
      items={items}
      selectedItem={selectedAlert}
      fetchItems={() => dispatch(fetchNotifications())}
      headerTitle="Notifications | BWHI Admin"
      headerDescription="Notifications page for BWHI Admin"
      pageTitle={<NotificationTitle value={value} onChange={(val) => setValue(val)} />}
      actionTitle={(value == 1) ? "Add New Daily Affirmation" : "Add New Reminder"}
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

function NotificationTitle(props) {
  return (
    <select value={props.value} onChange={(e) => props.onChange?.(e.target.value)}>
      <option value={0}>Reminder Notifications</option>
      <option value={1}>Daily Affirmations</option>
    </select>
  );
}
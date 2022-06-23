import { useState } from 'react'
import { useDispatch } from 'react-redux'
import AppLayout from '../components/AppLayout'
import AlertModal from '../components/AlertModal'
import { updateSelectedAlert, addSelectedAlert, resetSelectedAlert } from '../state/reducers/notifications'

export default function NotificationsPage() {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const dispatch = useDispatch()

  return (
    <AppLayout
        title="Notifications | BWHI Admin"
        description="Notifications page for BWHI Admin"
    >
      <div className="flex flex-row items-center content-center px-[40px] pt-[42px]">
        <h1 className="text-inter text-black text-[32px] font-medium">Notifications</h1>

        <div className="grow" />

        <button
          className="bg-ocean px-[16px] py-[13px] rounded-[5px]"
          onClick={() => setIsAlertModalOpen(true)}
        >
          <span className="text-white text-[16px]">Add New Alert</span>
        </button>
      </div>
      
      <div className="bg-white px-[54px] py-[43px] self-stretch grow mx-[42px] my-[40px] rounded-[40px]">

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

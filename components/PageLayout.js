import { useEffect, useMemo, useState } from 'react'
import AppLayout from '../components/AppLayout'
import PageToolbar from '../components/PageToolbar'
import Table from '../components/Table'

export default function PageLayout(props) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const columns = useMemo(() => props.columns || [], [props.columns])

  useEffect(() => {
    props.fetchItems?.()
  }, [])

  return (
    <AppLayout
        title={props.headerTitle}
        description={props.headerDescription}
    >
      <PageToolbar
        pageTitle={props.pageTitle}
        actionTitle={props.actionTitle}
        actions={props.actions}
        onActionClick={() => {
            setIsEditing(false)
            setIsAlertModalOpen(true)
            props.onActionClick?.()
        }}
      />
      
      <div className="bg-white px-[25px] py-[25px] grow mx-[20px] my-[20px] rounded-[40px] overflow-auto">
        <Table
          columns={columns}
          data={props.items}
          onEdit={(row) => {
            setIsEditing(true)
            setIsAlertModalOpen(true)
            props.onEdit?.(row)
          }}
          onDelete={(row) => {
            if (confirm(`Are you sure you want to delete ${row.title}?`)) {
              props.onDelete?.(row)
            }
          }}
        />
      </div>

      {props.Modal && (
        <props.Modal
            isEditing={isEditing}
            item={props.selectedItem}
            isOpen={isAlertModalOpen}
            onClose={() => {
                setIsAlertModalOpen(false)
                props.onModalClose?.()
            }}
            onPublish={(data) => {
                if (isEditing) props.onUpdateItem?.(data)
                else props.onAddItem?.(data)
                setIsAlertModalOpen(false)
                setIsEditing(false)
            }}
        />
      )}

      {props.children}
    </AppLayout>
  )
}

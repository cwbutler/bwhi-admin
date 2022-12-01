import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, fetchresources, setSelected, deleteResource, updateResource, addResource } from '../state/reducers/resources'
import Page from '../components/PageLayout'
import ResourceModal from '../components/ResourceModal'

export default function ResourcesPage() {
  const dispatch = useDispatch()
  const resources = useSelector((state) => selectors.selectAll(state))
  const selectedResource = useSelector((state) => state.resources.entities[state.resources.selectedId]) || {}
  const columns = useMemo(() => [
    { Header: 'Topic', accessor: 'topic' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'URL', accessor: 'url' }
  ], [])

  return (
    <Page
      items={resources}
      selectedItem={selectedResource}
      fetchItems={() => dispatch(fetchresources())}
      headerTitle="Resources | BWHI Admin"
      headerDescription="Resources page for BWHI Admin"
      pageTitle="Resources"
      actionTitle="Add New Resource"
      columns={columns}
      onEdit={({ id }) => dispatch(setSelected(id))}
      onDelete={(data) => dispatch(deleteResource(data))}
      Modal={ResourceModal}
      onModalClose={() => dispatch(setSelected(undefined))}
      onUpdateItem={(data) => dispatch(updateResource(data))}
      onAddItem={(data) => dispatch(addResource(data))}
    />
  )
}

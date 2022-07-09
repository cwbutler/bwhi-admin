import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { selectors, fetchFacts, setSelected, deleteFact, updateFact, addFact } from '../state/reducers/facts'
import Page from '../components/PageLayout'
import FactModal from '../components/FactModal'

export default function FastFactsPage() {
  const dispatch = useDispatch()
  const facts = useSelector((state) => selectors.selectAll(state))
  const selectedFact = useSelector((state) => state.facts.entities[state.facts.selectedId]) || {}
  const columns = useMemo(() => [
    { Header: 'Image', accessor: 'image', Cell: ({ value }) => value ? <Image alt="Item Image" src={value} width={120} height={120} /> : null},
    { Header: 'Title', accessor: 'title' },
    { Header: 'Description', accessor: 'description' }
  ], [])

  return (
    <Page
      items={facts}
      selectedItem={selectedFact}
      fetchItems={() => dispatch(fetchFacts())}
      headerTitle="Facts | BWHI Admin"
      headerDescription="Facts page for BWHI Admin"
      pageTitle="Facts"
      actionTitle="Add New Fact"
      columns={columns}
      onEdit={({ id }) => dispatch(setSelected(id))}
      onDelete={(data) => dispatch(deleteFact(data))}
      Modal={FactModal}
      onModalClose={() => dispatch(setSelected(undefined))}
      onUpdateItem={(data) => dispatch(updateFact(data))}
      onAddItem={(data) => dispatch(addFact(data))}
    />
  )
}

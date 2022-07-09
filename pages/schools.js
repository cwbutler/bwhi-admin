import { useDispatch, useSelector } from 'react-redux'
import Page from '../components/PageLayout'
import SchoolModal from '../components/SchoolModal'
import { addSchool, deleteSchool, fetchSchools, setSelected, updateSchool, selectors } from '../state/reducers/schools'

export default function SchoolsPage() {
  const dispatch = useDispatch()
  const schools = useSelector((state) => selectors.selectAll(state))
  const selectedSchool = useSelector(state => selectors.selectById(state, state.schools.selectedId)) || {}
  const columns = [
    { Header: 'School Name', accessor: 'school_name' },
    { Header: 'Health Center Name', accessor: 'health_name' },
    { Header: 'Health Center Address', accessor: 'health_address' },
    { Header: 'Health Center Hours', accessor: 'health_hours' },
    { Header: 'Health Center Phone', accessor: 'health_phone' },
    { Header: 'Health Center Website', accessor: 'health_website' },
    { Header: 'Health Center Sexual Services', accessor: 'health_sexual_services' },
    { Header: 'Health Center Physical Services', accessor: 'health_physical_services' },
    { Header: 'Counseling Center Name', accessor: 'counseling_name' },
    { Header: 'Counseling Center Address', accessor: 'counseling_location' },
    { Header: 'Counseling Center Website', accessor: 'counseling_website' },
    { Header: 'Counseling Center Hours', accessor: 'counseling_hours' },
    { Header: 'Counseling Center Phone', accessor: 'counseling_phone' },
    { Header: 'Counseling Crisis Phone', accessor: 'counseling_crisis_phone' },
    { Header: 'Counseling Crisis SMS', accessor: 'counseling_crisis_text' },
    { Header: 'Counseling Crisis Services', accessor: 'counseling_services' }
  ]

  return (
    <Page
      items={schools}
      columns={columns}
      selectedItem={selectedSchool}
      fetchItems={() => dispatch(fetchSchools())}
      headerTitle="Schools | BWHI Admin"
      headerDescription="Schools page for BWHI Admin"
      pageTitle="Schools"
      actionTitle="Add New School"
      onEdit={({ id }) => dispatch(setSelected(id))}
      onDelete={(data) => dispatch(deleteSchool(data))}
      Modal={SchoolModal}
      onModalClose={() => dispatch(setSelected(undefined))}
      onUpdateItem={(data) => dispatch(updateSchool(data))}
      onAddItem={(data) => dispatch(addSchool(data))}
    />
  )
}

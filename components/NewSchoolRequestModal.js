import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolRequests, selectors } from "../state/reducers/schoolRequests";
import { ItemModalContainer, ItemModalHeader } from "./Modal";
import Table from "./Table";

export function NewSchoolRequesModal(props) {
    const dispatch = useDispatch()
    const requests = useSelector(selectors.selectAll)
    const columns = [
        { Header: 'School Name', accessor: 'school' },
        { Header: 'Submitted By', accessor: 'userName' },
    ]

    useEffect(() => {
        dispatch(fetchSchoolRequests())
    }, [])

    return (props.isOpen) ? (
        <ItemModalContainer>
            <ItemModalHeader onClose={props.onClose} title="New School Requests" />

            <div className="rounded-[8px] overflow-auto">
                <Table
                    columns={columns}
                    data={requests}
                    showActions={false}
                    tbodyClassName="border border-solid rounded-[8px]"
                />
            </div>

            <button className="bg-ocean p-[12px] rounded-[8px] w-full mb-[30px] mt-[20px]" onClick={props.onPreview}>
                <span className="text-white">Add New School</span>
            </button>
        </ItemModalContainer>
    ) : null
}
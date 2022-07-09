import { useTable } from 'react-table'
import Image from 'next/image'
import trashIcon from '../public/images/trash.png'

export default function Table({ columns, data, ...props }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <table className="w-full" {...getTableProps()}>
            <thead className="border-solid border-b-[1px] border-[#E0E4E8] whitespace-nowrap">
                {headerGroups.map((headerGroup, i) => (
                    <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, i) => (
                            <th
                                key={i}
                                className="font-inter font-medium text-[16px] p-[20px]"
                                {...column.getHeaderProps()}
                            >{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr key={i} className="border-solid border-b-[1px] border-[#E0E4E8]" {...row.getRowProps()}>
                            {row.cells.map((cell, i) => {
                                return (
                                    <td key={i} className="py-[22px] text-center" {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                            <td>
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() => props.onEdit?.(row.original)}
                                        className="border-black border-[1px] p-[8px] rounded-[5px] bg-white mx-[4px]"
                                    >
                                        <span className="font-inter text-[16px]">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => props.onDelete?.(row.original)}
                                        className="border-black border-[1px] p-[8px] rounded-[5px] bg-white mx-[4px]"
                                    >
                                        <span className="font-inter text-[16px]">Delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
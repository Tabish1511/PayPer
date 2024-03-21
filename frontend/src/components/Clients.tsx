import React from "react";
import { useState, useEffect } from "react";
import { ButtonCombo } from "./ButtonCombo";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTable, Column, usePagination, TableInstance, UsePaginationInstanceProps, UseSortByInstanceProps, UsePaginationState } from "react-table";

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>;
  };

interface ClientInterface {
    id: number;
    name: string;
    itemDescription: string;
    phone: string;
    total: number;
    deposit: number;
    months: number;
    dueDate: string;
    userId: number;
}

export function Clients() {
    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [filter, setFilter] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/client/bulk?filter=" + filter, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setClients(response.data.client);
        })
        .catch(error => {
            console.error("Error fetching clients (frontend): ", error);
        });
    }, [filter]);

    const data = React.useMemo(() => clients, [clients]);

    const columns: Array<Column<ClientInterface>> = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Item Description',
                accessor: 'itemDescription',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Header: 'Total Amount',
                accessor: 'total',
            },
            {
                Header: 'Deposit',
                accessor: 'deposit',
            },
            {
                Header: 'Installment Months',
                accessor: 'months',
            },
            {
                Header: 'Due Date',
                accessor: 'dueDate',
                Cell: ({ value }: { value: string }) => value.split('T')[0],
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: ({ value }: { value: number }) => <ButtonCombo id={value} />,
            },
        ],
        []
    );
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        state: {pageIndex},
        pageCount,
    } = useTable(
        { 
            columns, 
            data,
            //@ts-ignore 
            initialState: { pageSize: 9 }
        }, usePagination) as TableInstanceWithHooks<ClientInterface>; 

    return (
        <div className="rounded-lg w-11/12 h-5/6 bg-white px-5 pb-5">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-5 mt-4 flex justify-center rounded-lg">
                    <input
                        onChange={e => {
                            setFilter(e.target.value);
                        }}
                        type="text"
                        placeholder="Search clients by name or phone..."
                        className="w-full px-2 py-1 border rounded border-slate-400"
                    ></input>
                </div>
                <Button label="New Client" className="mx-0" onClick={() => { navigate("/createClient") }} />
            </div>
            <div>
                <table className="table-auto w-full" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="h-14 text-center">
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="h-14 text-center odd:bg-cream-main even:bg-white">
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="flex justify-center mt-3 border-solid border-2 border-black">
                <div className="flex flex-col justify-center">  {/* <<<<<<<<==== FIX THIS PRONTO!!! */}
                    <Button label="Prev" className="mt-0" onClick={previousPage} />
                </div>
                    <span className="flex flex-col justify-center"> {pageIndex+1} 0f {pageCount} </span>
                <div className="flex flex-col justify-center">  {/* <<<<<<<<==== FIX THIS PRONTO!!! */}
                    <Button label="Next" className="mt-0" onClick={nextPage} />
                </div>
                </div>
            </div>
        </div>
    );
}











































// import { useState, useEffect } from "react"
// import { ButtonCombo } from "./ButtonCombo"
// import { Button } from "./Button"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"

// interface ClientInterface {
//     client: {
//         id: number;
//         name: string;
//         itemDescription: string;
//         phone: string;
//         total: number;
//         deposit: number;
//         months: number;
//         dueDate: string;
//         userId: number;
//     }
// }

// export function Clients(){
//     const [clients, setClients] = useState([])
//     const [filter, setFilter] = useState("")
//     const navigate = useNavigate();


//     useEffect(() => {
//         axios.get("http://localhost:3000/api/v1/client/bulk?filter=" + filter, {
//             headers: {
//                 Authorization: "Bearer " + localStorage.getItem("token")
//             }
//         })
//         .then(response => {
//             setClients(response.data.client);
//         })
//         .catch(error => {
//             console.error("Error fetching clients (frontend): ", error);
//         })
//     }, [filter])
    
//     return (
//         <div className="rounded-lg w-11/12 h-5/6 bg-white px-5">
//             <div className="grid grid-cols-6 gap-4">
//                 <div className="col-span-5 mt-4 flex justify-center rounded-lg">
//                     <input onChange={e => {
//                         setFilter(e.target.value);
//                     }} type="text" placeholder="Search clients by name or phone..." className="w-full px-2 py-1 border rounded border-slate-400"
//                     ></input>
//                 </div>
//                 <Button label="New Client" className="mx-0" onClick={()=>{navigate("/createClient")}} />
//             </div>
//             <div className="">
//                 <table className="table-auto w-full">
//                 <thead>
//                     <tr className="h-14">
//                     <th>Name</th>
//                     <th>Item Description</th>
//                     <th>Phone</th>
//                     <th>Total Amount</th>
//                     <th>Deposit</th>
//                     <th>Installment Months</th>
//                     <th>Due Date</th>
//                     <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {clients.map((client, index) => <Client client={client} key={index} index={index} />)}
//                 </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }


// function Client(props: ClientInterface & {index: number} ) {
//     return (
//             <tr className="h-14 text-center odd:bg-cream-main even:bg-white">
//             <td>{props.client.name}</td>
//             <td>{props.client.itemDescription}</td>
//             <td>{props.client.phone}</td>
//             <td>{props.client.total}</td>
//             <td>{props.client.deposit}</td>
//             <td>{props.client.months}</td>
//             <td>{props.client.dueDate.split('T')[0]}</td>
//             <td><ButtonCombo id={props.client.id} /></td>
//             </tr>
//     )
// }
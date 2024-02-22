import { useState } from "react"
import { ButtonCombo } from "./ButtonCombo"


export function Clients(){
    const [clients, setClients] = useState([{
        id: 1,
        name: "Tabish",
        itemDescription: "car sale",
        phone: "+26876876389",
        total: 80000,
        deposit: 50000,
        months: 3,
        dueDate: "2024-02-14 00:00:00",
        userId: 3
    },{
        id: 2,
        name: "Tabish",
        itemDescription: "car sale",
        phone: "+26876876389",
        total: 80000,
        deposit: 50000,
        months: 3,
        dueDate: "2024-02-14 00:00:00",
        userId: 3
    }])

    return (
        <div className="rounded-lg w-11/12 h-5/6 bg-white px-5">
            <div className="">
                <table className="table-auto w-full">
                <thead>
                    <tr className="h-20">
                    <th>Name</th>
                    <th>Item Description</th>
                    <th>Phone</th>
                    <th>Total Amount</th>
                    <th>Deposit</th>
                    <th>Installment Months</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, index) => <Client key={client.id} client={client} index={index} />)}
                </tbody>
                </table>
            </div>
        </div>
    )
}



interface ClientInterface {
    client: {
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
}

function Client(props: ClientInterface & {index: number} ) {
    const rowClassName = props.index % 2 === 0 ? "h-20 bg-cream-main text-center" : "h-20 bg-white text-center ";
    return (
            <tr className={rowClassName}>
            <td className="">{props.client.name}</td>
            <td>{props.client.itemDescription}</td>
            <td>{props.client.phone}</td>
            <td>{props.client.total}</td>
            <td>{props.client.deposit}</td>
            <td>{props.client.months}</td>
            <td>{props.client.dueDate}</td>
            <td className=""><ButtonCombo/></td>
            </tr>
    )
}





























































// export function Clients(){
//     const [clients, setClients] = useState([{
//         id: 1,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 2,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 3,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 4,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 5,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 6,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 7,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 8,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 9,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },{
//         id: 10,
//         name: "Tabish",
//         itemDescription: "car sale",
//         phone: "+26876876389",
//         total: 80000,
//         deposit: 50000,
//         months: 3,
//         dueDate: "2024-02-14 00:00:00",
//         userId: 3
//     },])

//     return (
//         <div className="rounded-lg w-11/12 h-5/6 bg-white pb-5 border-solid border-2 border-black">
//             <div className="font-bold mt-6 text-lg">
//                 Clients
//             </div>
//             <div className="my-2">
//                 <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
//             </div>
//             <div>
//                 {clients.map(client => <Client client={client} />)}
//             </div>
//             <table className="table-auto">
//             <thead>
//                 <tr>
//                 <th>Name</th>
//                 <th>Item Description</th>
//                 <th>Phone</th>
//                 <th>Total Amount</th>
//                 <th>Deposit</th>
//                 <th>Installment Months</th>
//                 <th>Due Date</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {clients.map(client => <Client client={client} />)}
//             </tbody>
//             </table>
//         </div>
//     )
// }



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

// function Client(props: ClientInterface) {
//     return (
//         <div>
//             <tr>
//             <td>{props.client.name}</td>
//             <td>{props.client.itemDescription}</td>
//             <td>{props.client.phone}</td>
//             <td>{props.client.total}</td>
//             <td>{props.client.deposit}</td>
//             <td>{props.client.months}</td>
//             <td>{props.client.dueDate}</td>
//             </tr>
//             {/* {props.client.name}
//             {props.client.itemDescription}
//             {props.client.phone}
//             {props.client.total}
//             {props.client.deposit}
//             {props.client.months}
//             {props.client.dueDate} */}
//         </div>
//     )
// }
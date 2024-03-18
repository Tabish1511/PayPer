import { useState, useEffect } from "react"
import { ButtonCombo } from "./ButtonCombo"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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

export function Clients(){
    const [clients, setClients] = useState([])
    const [filter, setFilter] = useState("")
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
        })
    }, [filter])
    
    return (
        <div className="rounded-lg w-11/12 h-5/6 bg-white px-5">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-5 mt-4 flex justify-center rounded-lg">
                    <input onChange={e => {
                        setFilter(e.target.value);
                    }} type="text" placeholder="Search clients by name or phone..." className="w-full px-2 py-1 border rounded border-slate-400"></input>
                </div>
                <Button label="New Client" className="mx-0" onClick={()=>{navigate("/createClient")}} />
            </div>
            <div className="">
                <table className="table-auto w-full">
                <thead>
                    <tr className="h-14">
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
                    {clients.map((client, index) => <Client client={client} index={index} />)}
                </tbody>
                </table>
            </div>
        </div>
    )
}

function Client(props: ClientInterface & {index: number} ) {
    return (
            <tr className="h-14 text-center odd:bg-cream-main even:bg-white">
            <td>{props.client.name}</td>
            <td>{props.client.itemDescription}</td>
            <td>{props.client.phone}</td>
            <td>{props.client.total}</td>
            <td>{props.client.deposit}</td>
            <td>{props.client.months}</td>
            <td>{props.client.dueDate.split('T')[0]}</td>
            <td><ButtonCombo id={props.client.id} /></td>
            </tr>
    )
}

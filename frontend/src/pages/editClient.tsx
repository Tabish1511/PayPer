import { Appbar } from "../components/Appbar"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"


interface Client {
    id: number,
    name: string,
    itemDescription: string,
    phone: string,
    total: number,
    deposit: number,
    months: number,
    dueDate: string,
    userId: number
}

export function EditClient() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [client, setClient] = useState<Client>();
    const [name, setName] = useState("");
    const [itemDescription, setItem] = useState("");
    const [phone, setPhone] = useState("");
    const [totalAmount, setTotal] = useState("");
    const [deposit, setDeposit] = useState("");
    const [months, setMonths] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) { // Check if id is not null or undefined
            axios.get(`http://localhost:3000/api/v1/client/single?id=${id}`)
            .then(response => {
                setClient(response.data.client);
                setName(response.data.client.name);
                setItem(response.data.client.itemDescription);
                setPhone(response.data.client.phone);
                setTotal(response.data.client.total);
                setDeposit(response.data.client.deposit);
                setMonths(response.data.client.months);
                setDate(response.data.client.dueDate);
            })
            .catch(error => {
                console.error('Error fetching client data:', error);
            });
        }
    }, [id]);

    return (
        <div className="h-screen flex flex-col">
            <Appbar initial="U"/>
            
            <div className="flex-1 bg-cream-main flex justify-center">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg w-max h-max bg-white pb-5">
                            <Heading label="Edit Client" />
                            <SubHeading label="Edit client details" />
                        <div className="flex justify-center">
                            {client && (
                            <div className="w-96 h-max">
                                <InputBox onChange={e => {
                                    setName(e.target.value);
                                }} label="name" type="text" id="name" name="name" placeholder="Eg. John Doe" value={name} />
                                <InputBox onChange={e => {
                                    setItem(e.target.value);
                                }} label="Item Description" type="text" id="itemDescription" name="itemDescription" placeholder="Eg. White BMW sale" value={itemDescription} />
                                <InputBox onChange={e => {
                                    setPhone(e.target.value);
                                }} label="Phone Number" type="text" id="phone" name="phone" placeholder="+268-xxxx-xxxx" value={phone} />
                            </div>
                            )}
                            {client && (
                            <div className="w-96 h-max">
                                <InputBox onChange={e => {
                                    setTotal(e.target.value);
                                }} label="Total Amount" type="number" id="total" name="total" placeholder="Eg. 150,000" value={totalAmount} />
                                <InputBox onChange={e => {
                                    setDeposit(e.target.value);
                                }} label="Deposit" type="number" id="deposit" name="deposit" placeholder="Eg. 80,000" value={deposit} />
                                <InputBox onChange={e => {
                                    setMonths(e.target.value);
                                }} label="Months" type="number" id="months" name="months" placeholder="Eg. 6" value={months} />
                            </div>
                            )}
                        </div>
                        {client && (
                        <InputBox onChange={e => {
                            setDate(e.target.value);
                        }} label="Due Date" type="date" id="dueDate" name="dueDate" value={date.split('T')[0]} />
                        )}
                        <Button onClick={() => {
                            if(id){
                                axios.put("http://localhost:3000/api/v1/client/edit", {
                                clientId: parseInt(id), /* THIS SHOULD BE RECIEVED FROM DASHBOARD */
                                name,
                                itemDescription,
                                phone,
                                totalAmount: parseFloat(totalAmount),
                                deposit: parseFloat(deposit),
                                months: parseInt(months),
                                date
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            .then(response => {
                                if(response.status === 200){
                                    navigate("/");
                                }else{
                                    console.error("Status code not 200");
                                }
                            })
                            .catch((error) => {
                                console.log('Error: ', error)
                            })
                            }
                        }} label="Submit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// MAKE THIS PAGE REDIRECT TO DASHBOARD ON SUCCESS
// POPULATE THE INPUTS (FETCH FROM BE BASED ON 'clientId')





// import React, { useState } from 'react';

// function MyComponent() {
//   // State to hold the initial value
//   const [inputValue, setInputValue] = useState('Initial Value');

//   return (
//     <div>
//       {/* Input element with prepopulated value */}
//       <input 
//         type="text" 
//         value={inputValue} 
//         onChange={(e) => setInputValue(e.target.value)} 
//       />
//     </div>
//   );
// }

// export default MyComponent;












// interface Client {
//     id: number,
//     name: string,
//     itemDescription: string,
//     phone: string,
//     total: number,
//     deposit: number,
//     months: number,
//     dueDate: string,
//     userId: number
// }

// export function EditClient() {
//     const [searchParams] = useSearchParams();
//     const id = searchParams.get('id');
//     const [client, setClient] = useState<Client>();
//     const [name, setName] = useState("");
//     console.log(id);

//     useEffect(() => {
//         if (id) { // Check if id is not null or undefined
//             axios.get(`http://localhost:3000/api/v1/client/single?id=${id}`)
//             .then(response => {
//                 setClient(response.data.client);
//                 setName(response.data.client.name);
//             })
//             .catch(error => {
//                 console.error('Error fetching client data:', error);
//             });
//         }
//     }, [id]);

//     return (
//         <div>
//             {/* Ensure client is available before accessing its properties */}
//             {client && (
//                 <InputBox 
//                     onChange={e => {
//                         setName(e.target.value);
//                     }} 
//                     label="name" 
//                     type="text" 
//                     id="name" 
//                     name="name" 
//                     placeholder="Eg. John Doe" 
//                     value={name} // Use name state instead of client.name
//                 />
//             )}
//         </div>
//     )
// }
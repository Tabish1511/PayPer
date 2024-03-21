import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SmallButton } from "./SmallButton";

interface ButtonComboInterface{
    id: number;
}

export function ButtonCombo(props: ButtonComboInterface){
    const navigate = useNavigate();
    return (
        
        
        
        
        
        
        
        
        
        <div className="flex flex-nowrap justify-center">
            <SmallButton 
            label="✓" 
            // id={props.id} 
            onClick={()=>{
                axios.patch("http://localhost:3000/api/v1/client/paid", {
                    id: props.id
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
            }} /> {/* // PAYMENT DONE */}
















            <SmallButton label="+"  
            onClick={()=>{
                navigate('/editClient?id=' + props.id)
            }} /> {/* // EDIT CLIENT */}
            <SmallButton label="-"
            onClick={()=>{
                axios.delete("http://localhost:3000/api/v1/client/delete", {
                    data: {id: props.id},
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
            }}/> {/* // DELETE CLIENT ========== DO THIS NEXT!!!!*/}
        </div>
    )
}
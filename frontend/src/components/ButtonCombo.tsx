import axios from "axios";
import { SmallButton } from "./SmallButton";

interface ButtonComboInterface{
    id: number;
}

export function ButtonCombo(props: ButtonComboInterface){
    return (
        <div className="flex flex-nowrap justify-center">
            <SmallButton 
            label="✓" 
            id={props.id} 
            onClick={()=>{
                axios.patch("http://localhost:3000/api/v1/client/paid", {
                    id: props.id
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
            }} /> {/* // PAYMENT DONE */}
            <SmallButton label="+"/> {/* // EDIT CLIENT */}
            <SmallButton label="-"/> {/* // DELETE CLIENT ========== DO THIS NEXT!!!!*/}
        </div>
    )
}
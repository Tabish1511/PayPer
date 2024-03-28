import { Dashboard } from "./dashboard";
import { Signin } from "./signin";


const token = localStorage.getItem("token");

export function MainRouter(){
    return token ? <Dashboard/> : <Signin/>;
}
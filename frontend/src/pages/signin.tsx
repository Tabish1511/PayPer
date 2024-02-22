import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from "axios"
import { useState } from "react"

export function Signin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="bg-cream-main h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg w-96 h-max bg-white">
                    <Heading label="Sign In" />
                    <SubHeading label="Enter your details" />
                    <InputBox onChange={e => {
                        setUsername(e.target.value);
                    }} label="Username" type="email" id="username" name="username" placeholder="john@gmail.com" />
                    <InputBox onChange={e => {
                        setPassword(e.target.value);
                    }} label="Password" type="password" id="password" name="password" placeholder="1234Aa@" />
                    <Button onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                    }} label="Sign Up" />
                    <BottomWarning warning="Don't have an account? " link="Sign up" to={"/signup"}/>
                </div>
            </div>
        </div>
    )
}
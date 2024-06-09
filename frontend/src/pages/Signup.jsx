import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";


export default function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSignup = async () => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {
                username,
                firstName,
                lastName,
                password
            })
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        } catch (err){
            if(err.response.data.message == "Email already taken"){
                setError("Email already taken")
            }
            else if(err.response.data.message="Invalid inputs"){
                setError("Please enter required credentials")
            }
        }
    }

    return (
        <div className="flex justify-center bg-neutral-400 items-center h-screen">
            <div className="flex flex-col rounded-md p-4 bg-white">
                <Heading label={"Sign Up"} />

                <SubHeading text={`Enter your information to create an account`} />

                <InputBox onChange={e => {
                    setFirstName(e.target.value)
                }} placeholder={"John"} label={"First Name"} />

                <InputBox onChange={e => {
                    setLastName(e.target.value)
                }} placeholder={"Doe"} label={"Last Name"} />

                <InputBox onChange={e => {
                    setUsername(e.target.value)
                    setError("")
                }} placeholder={"example@xyz.com"} label={"Email"} />

                <InputBox onChange={e => {
                    setPassword(e.target.value)
                }} placeholder={""} label={"Create Password"} />

                <div className="pt-4">
                    <Button onClick={handleSignup} title={"Sign Up"} ></Button>
                    <div className="flex justify-center text-rose-600 text-sm font-semibold">
                        {error}
                    </div>
                </div>

                <BottomWarning text={"Already have account? "} link={"Signin"} to={"/signin"} />
            </div>
        </div>
    )
}
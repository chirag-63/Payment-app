import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            })
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        }
        catch (err) {
            if (err.response.data.message == "Invalid username or password") {
                setError(err.response.data.message + ", try again later")
            }
            else if(err.response.data.message="Invalid inputs"){
                setError("Please enter required credentials")
            }
        }
    }

    return (
        <div className="flex justify-center bg-neutral-400 items-center h-screen">
            <div className="flex flex-col rounded-md p-4 bg-white">

                <Heading label={"Sign In"} />

                <SubHeading text={"Enter your credentials to access your account"} />

                <InputBox onChange={e => {
                    setUsername(e.target.value)
                    setError("")
                }} placeholder={"type your email"} label={"Email"} />

                <InputBox onChange={e => {
                    setPassword(e.target.value)
                    setError("")
                }} placeholder={"type your password"} label={"Password"} />

                <div className="pt-4">
                    <Button onClick={handleSignin} title={"Sign In"} ></Button>
                    <div className="flex justify-center text-rose-600 text-sm font-semibold">
                        {error}
                    </div>
                </div>

                <BottomWarning text={"Don't have an account? "} link={"Signup"} to={"/signup"} />
            </div>
        </div>
    )
}


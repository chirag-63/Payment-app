import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function Appbar() {
    const [firstName, setFirstName] = useState("");
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/userinfo`, {
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        }).then((response) => {
                setFirstName(response.data.firstName)
            })
    }, [])

    return (
        <div className="flex justify-between bg-white h-16 items-center border-[2px]">
            <div onClick={()=>{Navigate("/dashboard")}} className="pl-6 text-2xl font-bold select-none hover:cursor-pointer">
                Payments App
            </div>
            <div className="flex items-center pr-6 text-md font-medium ">
                <h2 className="mr-3">Hello, {firstName}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
        </div>
    )
}
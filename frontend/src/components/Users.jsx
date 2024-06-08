import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

let id = 1;
export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")

    //should add debouncing here
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        })
        .then((response) => {
            setUsers(response.data.user)
        })
    }, [filter])

    return (
        <div className="flex flex-col justify-start px-6 ">
            <h2 className="text-xl font-bold my-2">
                Users
            </h2>
            <InputBox onChange={e => setFilter(e.target.value)} placeholder={"Search users..."} />
            <div>
                {users.map(user => <User key={id++} user={user} />)}
            </div>
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between items-center mb-3">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-lg">
                    {user.firstName[0]}
                    {user.lastName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <Button onClick={e => {
                navigate(`/send?id=${user._id}&fName=${user.firstName}&lName=${user.lastName}`)
            }} title={"Send Money"} />
        </div>
    </div>
}
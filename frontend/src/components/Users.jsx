import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { useState } from "react";

let id = 1;
export function Users() {
    const [users, setUsers] = useState([{
        firstName: "Khandu",
        lastName: "Don",
        _id: 1
    },{
        firstName: "Durgesh",
        lastName: "Nai",
        _id: 2
    },{
        firstName: "Lord",
        lastName: "Puneet",
        _id: 3
    }]);

    return (
        <div className="flex flex-col justify-start px-6 ">
            <h2 className="text-xl font-bold my-2">
                Users
            </h2>
            <InputBox placeholder={"Search users..."} />
            <div>
                {users.map(user => <User key={id++} user={user} />)}
            </div>
        </div>
    )
}

function User({ user }) {
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
            <Button title={"Send Money"} />
        </div>
    </div>
}
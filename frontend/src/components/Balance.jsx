import { useEffect, useState } from "react"
import axios from "axios";

export function Balance() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
        }).then((response) => {
                setBalance(response.data.balance)
            })
    }, [])

    return (
        <div className="flex h-16 items-center px-6 text-lg font-bold">
            Your Balance : ₹ {balance}
        </div>
    )
}
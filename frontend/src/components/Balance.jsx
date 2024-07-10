import { useState } from "react"
import axios from "axios";
import loader from "../assets/dot-loader.gif"

export function Balance() {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [showLoader, setShowLoader] = useState(false);

    const fetchBalance = () => {
        setLoading(true);
        setShowText(false);
        setShowLoader(true);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setTimeout(() => {
                setBalance(response.data.balance);
                setLoading(false);
                setShowLoader(false);
            }, 1200);
        })
    }

    return (
        <div className="flex h-16 items-center px-6 text-lg font-bold">
            Your Balance :
            {showText && (
                <div onClick={fetchBalance} className="ml-2 mt-1 text-blue-800 text-sm hover:cursor-pointer hover:underline active:text-black select-none">
                    click to view
                </div>
            )}
            {showLoader && <img src={loader} alt="Loading..." className="ml-2 mt-1 w-12 h-12" />}
            {loading ? <div className="ml-2 mt-1"></div> : <GiveBalance balance={balance} />}
        </div>
    )
}

function GiveBalance({ balance }) {
    return (
        <div className="ml-2">
            {balance !== null && `₹ ${balance}`}
        </div>
    );
}
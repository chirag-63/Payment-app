import { Appbar } from "../components/Appbar"
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const allowedKeycodes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace']

export default function SendMoney() {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const fname = searchParams.get("fName")
    const lname = searchParams.get("lName")
    const [amount, setAmount] = useState(0);
    const Navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (!allowedKeycodes.includes(event.key)) {
            event.preventDefault();
        }
    };

    const handleTransfer = async () => {
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`,
                {to: id, amount}, 
                {
                    headers: {Authorization: "Bearer " + localStorage.getItem("token")}
                }
            )
            if(res.data.message == "Transfer successful"){
                Navigate("/done");
            } else {
                Navigate("/failed");
            }
        } catch (err) {
            Navigate("/failed");
        }
    }

    return (
        <div className="bg-gray-100 h-screen">
            <Appbar />
            <div className="flex justify-center mt-28">
                <div className="h-full flex flex-col justify-center">
                    <div className="border h-min text-card-foreground max-w-md p-4 space-y-4 w-96 bg-white shadow-lg rounded-lg">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h2 className="text-3xl font-bold text-center">Make Payment</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <span className="text-2xl text-white select-none">{fname[0].toUpperCase()}</span>
                                </div>
                                <h3 className="text-2xl font-semibold">{fname} {lname}</h3>
                            </div>
                            <div className="space-y-4 mt-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="amount">
                                        Amount (in Rs)
                                    </label>
                                    <input
                                        onChange={e => {
                                            setAmount(e.target.value)
                                        }}
                                        type="tel"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-lg font-serif outline-none select-none"
                                        id="amount"
                                        placeholder="Enter amount"
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <button onClick={handleTransfer} className="justify-center rounded-md text-base font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white active:bg-green-700 select-none">
                                    Initiate Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
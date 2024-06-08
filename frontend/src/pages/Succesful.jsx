import { Appbar } from "../components/Appbar"
import { useState } from "react";
import axios from "axios";
import React from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";

export default function Successful() {
    const Navigate = useNavigate();

    return (
        <div className="bg-gray-100 h-screen">
            <Appbar />
            <div className="flex justify-center mt-24">
                <div className="h-full flex flex-col justify-center bg-gray-100">
                    <div className="h-min max-w-md space-y-4 w-96 bg-gray-100">
                        <img className="rounded-full bg-gray-100 hover:cur select-none"
                            src="https://i.pinimg.com/originals/48/a2/93/48a293976e2c10478e2eebf754ee8d25.gif" alt="payment done" draggable="false" />
                    </div>
                    <div className="mb-10"> </div>
                    <div className="flex flex-col justify-center h-ful mx-auto">
                        <button onClick={()=>{
                            Navigate("/dashboard")
                        }} className="rounded-lg bg-cyan-600 px-4 py-2.5 text-white font-medium text-base shadow-md shadow-slate-400 focus:outline-none select-none hover:cursor-pointer">
                            Back to dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
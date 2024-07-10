import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Successful from "./pages/Succesful";
import Failed from "./pages/failed";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/done" element={<Successful/>} />
        <Route path="/failed" element={<Failed/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

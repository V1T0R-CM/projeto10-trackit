import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserContext from "../context/UserContext";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Today from "./Today";
import Habits from "./Habits"
import History from "./History"



export default function App(){
    const [userInfo, setUserInfo] = useState({})
    
    return (
        <BrowserRouter>
            <UserContext.Provider value={{userInfo, setUserInfo}}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/cadastro" element={<Register/>}/>
                    <Route path="/hoje" element={<Today/>}/>
                    <Route path="/habitos" element={<Habits/>}/>
                    <Route path="/historico" element={<History/>}/>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}
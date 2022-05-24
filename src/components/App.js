import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserContext from "../context/UserContext";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";


export default function App(){
    const [userInfo, setUserInfo] = useState({})
    
    return (
        <BrowserRouter>
            <UserContext.Provider value={{userInfo, setUserInfo}}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/cadastro" element={<Register/>}/>
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}
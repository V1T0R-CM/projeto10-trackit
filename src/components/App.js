import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Today from "./Today";
import Habits from "./Habits"
import History from "./History"



export default function App(){
    const [userInfo, setUserInfo] = useState({})
    
    function attTodayHabits(){
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(getSuccess)
    }

    function getSuccess(response){
        setUserInfo({...userInfo, dayHabits: response.data})
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{userInfo, setUserInfo, attTodayHabits}}>
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
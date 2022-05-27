import { useState, useContext} from "react";
import { useLocation } from "react-router-dom"
import UserContext from "../context/UserContext";
import Header from "./Header"
import Footer from "./Footer";

export default function Today(){
    const { userInfo } = useContext(UserContext)
    const userDayInfo = useLocation().state
    return(
    <>
        <Header imgURL={userInfo.image}/>
        <Footer value={99}/>
    </>)
}
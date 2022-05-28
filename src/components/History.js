import { useState, useContext} from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import Header from "./Header"
import Footer from "./Footer";

export default function History(){
    const { userInfo } = useContext(UserContext)
    return (
    <Main>  
        <Header imgURL={userInfo.image}/>
        <h2>Histórico</h2>
        <TextBox>Em breve você poderá ver o histórico dos seus hábitos aqui!</TextBox>
        <Footer dayHabits={userInfo.dayHabits}/>
    </Main>)
}

const Main = styled.div`
    background-color: #f2f2f2;
    padding-bottom: 100px;
    padding-top: 70px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    h2{
        font-weight: 400;
        font-size: 23px;
        color: #126BA5;
        margin-top: 28px;
    }
`

const TextBox = styled.div`
    margin-top: 18px;
    font-weight: 400;
    font-size: 18px;
    color: #666666;
`
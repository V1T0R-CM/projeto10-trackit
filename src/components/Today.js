import { useState, useEffect, useContext} from "react";
import dayjs from 'dayjs'
import styled from "styled-components";
import UserContext from "../context/UserContext";
import Header from "./Header"
import Footer from "./Footer";
import axios from "axios";


export default function Today(){
    const { userInfo, setUserInfo } = useContext(UserContext)
    const dayjs = require('dayjs')
    
    useEffect(()=>{
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(getSuccess)
    },[])

    function getSuccess(response){
        setUserInfo({...userInfo, dayHabits: response.data})
    }

    function progressMessege(){
        let complete=0
        if(userInfo.dayHabits){
            for(let habit of userInfo.dayHabits){
                if(habit.done){
                    complete++
                }
            }
        }
        else if(!userInfo.dayHabits || userInfo.dayHabits.length===0){
            return (<SubTitle color="#BABABA">Nenhum hábito concluído ainda </SubTitle>)
        }
        else{
            return (<SubTitle color="#8FC549">{`${(complete/userInfo.dayHabits.length)*100}% dos hábitos concluídos`}</SubTitle>)
        }
    }

    return(
    <Main>
        <Header imgURL={userInfo.image}/>
        <Title>
            {`${["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"][dayjs().day()]}, ${dayjs().format("DD/MM")}`}
        </Title>
        {progressMessege()}

        <Footer dayHabits={userInfo.dayHabits ? userInfo.dayHabits : []}/>
    </Main>)
}

const Title = styled.span`
    color: #126BA5;
    font-weight: 400;
    font-size: 23px;
    margin-top: 28px;
`

const SubTitle = styled.span`
    font-weight: 400;
    font-size: 18px;
    color: ${props => props.color};
    margin-top: 5px;
`

const Main = styled.div`
    background-color: #f2f2f2;
    padding-bottom: 100px;
    padding-top: 70px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`
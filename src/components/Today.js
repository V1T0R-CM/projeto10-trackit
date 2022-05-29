import { useState, useEffect, useContext} from "react";
import dayjs from 'dayjs'
import styled from "styled-components";
import UserContext from "../context/UserContext";
import Header from "./Header"
import Footer from "./Footer";
import axios from "axios";
import checkmark from "../assets/image/Vector.png"


function HabitMarkBox({userInfo, infoHabit, attTodayHabits}){
    const[marked, setMarked] = useState(infoHabit.done)

    function checkSuccess(){
        setMarked(true)
        attTodayHabits()
    }

    function uncheckSuccess(){
        setMarked(false)
        attTodayHabits()
    }

    function habitCheckMark(){
        if(!marked){
            const config = {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`
                }
            }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${infoHabit.id}/check`,{}, config);
            promise.then(checkSuccess)
        }
        else{
            const config = {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`
                }
            }
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${infoHabit.id}/uncheck`,{}, config);
            promise.then(uncheckSuccess)
        }
    }

    function changeColor(){
        if(marked && infoHabit.highestSequence==infoHabit.currentSequence){
            return "#8FC549"
        }
        else{
            return "#666666"
        }
    }

    return(
        <Task>
            <div>
                <h1>{infoHabit.name}</h1>
                <HabitBoxInfo color={marked?"#8FC549":"#666666"}>Sequência atual: <span>{`${infoHabit.currentSequence} dias`}</span></HabitBoxInfo>
                <HabitBoxInfo color={changeColor()}>Seu recorde: <span>{`${infoHabit.highestSequence} dias`}</span></HabitBoxInfo>
            </div>
            <TaskMark color={marked?"#8FC549":"#EBEBEB"} onClick={()=>habitCheckMark()}><img src={checkmark}/></TaskMark>
        </Task>
    )
}

export default function Today(){
    const { userInfo, setUserInfo, attTodayHabits} = useContext(UserContext)
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
        for(let habit of userInfo.dayHabits){
            if(habit.done){
                complete++
            }
        }
        if(userInfo.dayHabits.length>0){
            return (<SubTitle color="#8FC549">{`${Math.round((complete/userInfo.dayHabits.length)*100)}% dos hábitos concluídos`}</SubTitle>)
        }
        return (<SubTitle color="#BABABA">Nenhum hábito concluído ainda</SubTitle>)
    }

    return(
    <Main>
        <Header imgURL={userInfo.image}/>
        <Title>
            {`${["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"][dayjs().day()]}, ${dayjs().format("DD/MM")}`}
        </Title>
        {userInfo.dayHabits?progressMessege():<SubTitle color="#BABABA">Nenhum hábito concluído ainda</SubTitle>}
        <TaskList>
            {userInfo.dayHabits?userInfo.dayHabits.map(habit=><HabitMarkBox key={habit.id} userInfo={userInfo} attTodayHabits={attTodayHabits} infoHabit={habit}/>):""}
        </TaskList>
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

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 18px;
`

const Task = styled.div`
    width:100%;
    height:94px;
    margin-top: 10px;
    background-color: #FFFFFF;    
    border-radius: 5px;
    padding: 13px;
    display: flex;
    justify-content: space-between;
    color: #666666;

    h1{
        font-weight: 400;
        font-size: 20px;
        margin-bottom: 6px;
    }
`

const HabitBoxInfo = styled.div`
    font-weight: 400;
    font-size: 12.976px;

    span{
        color:${props=>props.color};
    }
`
const TaskMark = styled.button`
    width: 69px;
    height: 69px;
    background-color: ${props => props.color};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border:none;
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
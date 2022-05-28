import { useState, useEffect, useContext, Children} from "react";
import {ThreeDots} from "react-loader-spinner"
import UserContext from "../context/UserContext";
import axios from "axios";
import Header from "./Header"
import Footer from "./Footer";
import styled from "styled-components";

function Habit({id, name, days, userInfo, userHabits, setUserHabits}){
    function render(){
        const renderList=[]
        const week=["D","S","T","Q","Q","S","S"]
        for(let i=0; i<week.length; i++){
            if(days.indexOf(i)===-1){
                renderList.push(<WeekdayBox key={i} marked={false}>{week[i]}</WeekdayBox>)
            }
            else{
                renderList.push(<WeekdayBox key={i} marked={true}>{week[i]}</WeekdayBox>)
            }
        }
        return(renderList)
    }
    
    function deleteSuccess(){
        setUserHabits(userHabits.filter(item => item.id !== id))
    }
    function deleteHabit(){
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const promise=axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config)
        promise.then(deleteSuccess)
    }

    return(
        <HabitBox>
            <HabitTitle>
                {name}
                <Trash onClick={()=>deleteHabit()}><ion-icon name="trash-outline"></ion-icon></Trash>
            </HabitTitle>
            <DaysList>
                {render()}
            </DaysList>
        </HabitBox>
    )
}

function Weekday({children, disable, day, setHabitDays, habitDays}){
    const [marked, setMarked] = useState(false)

    function toggle(){
        if(marked && !disable){
            setMarked(false)
            setHabitDays(habitDays.filter(item => item !== day))
        }
        else if(!disable){
            setMarked(true)
            setHabitDays([...habitDays, day])
        }
    }

    return (
        <WeekdayBox marked = {marked} onClick = {()=>toggle()}>
            {children}
        </WeekdayBox>
    )
}

function WeekdayList({disable, setHabitDays, habitDays}){
    function render(){
        const renderList=[]
        const week=["D","S","T","Q","Q","S","S"]
        for(let i=0; i<week.length; i++){
            renderList.push(<Weekday key={i} disable={disable} day={i} setHabitDays={setHabitDays} habitDays={habitDays}>{week[i]}</Weekday>)
        }
        return renderList
    }

    return(
        <DaysList>
            {render()}
        </DaysList>
    )
}

function CreateHabit({setInCreate, setUserHabits, userHabits, userInfo}){
    const [habitName, setHabitName] = useState("")
    const [habitDays, setHabitDays]= useState([])
    const [disable, setDisable]= useState(false)

    function postSuccess(response){
        setUserHabits([...userHabits, response.data])
        setInCreate(false)
    }

    function postInfo(){
        let valid=true
        if(habitName.length===0){
            valid=false
        }
        
        else if(habitDays.length===0){
            valid=false
        }

        if(valid){
            setDisable(true)
            const config = {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`
                }
            }
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {name: habitName, days: habitDays.sort((a,b)=>a-b)}, config);
            promise.then(postSuccess)
        }
    }

    function submitData(event){
        event.preventDefault();
        postInfo()
    }
    
    return (
    <CreationBox onSubmit={submitData}>
        <input 
        type="text" 
        id="Habit Name" 
        value={habitName} 
        required
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Nome do hábito"
        disabled = {disable}/>

        <WeekdayList disable={disable} setHabitDays={setHabitDays} habitDays={habitDays}/>
        <CreationOptions>
            <span onClick={()=>disable ? null:setInCreate(false)}>Cancelar</span>
            <button type="submit" disabled = {disable}>{disable?<ThreeDots color="#FFFFFF" width={52} height={14}/>:"Salvar"}</button>
        </CreationOptions>
    </CreationBox>)
}

export default function Habits(){
    const { userInfo } = useContext(UserContext)
    const [userHabits, setUserHabits] = useState([])
    const [inCreate, setInCreate] = useState(false)

    useEffect(()=>{
      const config = {
          headers: {
              "Authorization": `Bearer ${userInfo.token}`
          }
      }
      const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config)
      promise.then(response=>setUserHabits(response.data))
    },[])
    
    function habitsRender(){
        if(userHabits.length===0){
            return "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"
        }
        else{
            return(
                userHabits.map(item => <Habit key={item.id} id={item.id} name={item.name} days={item.days} userHabits={userHabits} setUserHabits={setUserHabits} userInfo={userInfo}/>)
            )
        }
    }

    return (
    <Main>  
        <Header imgURL={userInfo.image}/>
            <TitleBar>
                Meus hábitos
                <button onClick={()=>setInCreate(true)}><ion-icon name="add-outline"></ion-icon></button>
            </TitleBar>
            {inCreate? <CreateHabit setInCreate={setInCreate} setUserHabits={setUserHabits} userHabits={userHabits} userInfo={userInfo}/>:""}
            <HabitsList>
                {habitsRender()}
            </HabitsList>
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
`

const TitleBar = styled.div`
    font-weight: 400;
    font-size: 23px;
    color: #126BA5;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:22px;

    button{
        display:flex;
        align-items:center;
        justify-content: center;
        width: 40px;
        height: 35px;
        background-color: #52B6FF;
        border-radius: 5px;
        border: hidden;
        color: #ffffff;
        font-size: 27px;
    }
`

const HabitsList = styled.div`
    width: 100%;
    margin-top: 30px;
    font-weight: 400;
    font-size: 18px;
    color: #666666;
`
const HabitBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;
    height: 90px;
    width: 100%;
    padding: 15px;

    div{
        margin-bottom: 0;
    }
`

const HabitTitle = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    width: 100%;
    font-weight: 400;
    font-size: 20px;
    color: #666666;
`
const Trash = styled.div`
    font-size: 15px;
`

const CreationBox = styled.form`
    background-color: #ffffff;
    width: 100%;
    height: 180px;
    border-radius: 5px;
    margin-top: 22px;
    padding: 18px;
    display:flex;
    flex-direction: column;

    input{
        width: 100%;
        height: 45px;
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 8px;
        padding: 10px;
    }

    input::placeholder{
        font-weight: 400;
        font-size: 20px;
        color:  #dbdbdb;
    }
`

const CreationOptions = styled.div`
    width:100%;
    display:flex;
    justify-content: flex-end;
    align-items: center;

    button{
        background-color: #52B6FF;
        border-radius: 5px;
        width: 84px;
        height: 35px;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        border: hidden;
        margin-left: 22px;
        display: flex;
        align-items: center;
        justify-content:center;
    }

    span{
        font-weight: 400;
        font-size: 16px;
        color: #52B6FF;
    }
`

const DaysList = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
`

const WeekdayBox = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content:center;
    background-color: ${props=>props.marked?"#d5d5d5":"#ffffff"};
    font-weight: 400;
    font-size: 20px;
    color: ${props=>props.marked?"#ffffff":"#d5d5d5"};
    margin-bottom: 30px;
`
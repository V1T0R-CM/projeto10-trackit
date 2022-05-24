import { useState, useContext} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {ThreeDots} from "react-loader-spinner"
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/image/logo.png";
import UserContext from "../context/UserContext";

export default function Login(){
    const [loginInfo,setLoginInfo]=useState({email:'', password:''})
    const [disable, setDisable]=useState(false)
    const { userInfo, setUserInfo } = useContext(UserContext)
    const navigate = useNavigate()

    function submitData(event){
        event.preventDefault();
    }

    function postError(){
        setDisable(false)
        setLoginInfo({email:'', password:''})
        alert("Email ou senha invalidos!")
    }

    function postSuccess(response){
        setUserInfo(response.data)
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(response => navigate("/hoje", {replace:true, state: response }))

    }

    function postInfo(){
        const validateEmail = /\S+@\S+\.\S+/
        let valid = true

        if (!validateEmail.test(loginInfo.email)){
            valid=false
        }

        else if (loginInfo.password.length===0){
            valid=false
        }
        if(valid){
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", loginInfo)
            setDisable(true)
            promise.catch(postError)
            promise.then(postSuccess)
        }
    }
    
    return (
    <Main>
        <img src={logo}/>
        <form onSubmit={submitData}>
            <input 
            type="email" 
            id="email" 
            value={loginInfo.email} 
            required
            onChange={(e) => setLoginInfo({...loginInfo, email: e.target.value})}
            placeholder="email"
            disabled = {disable}/>

            <input 
            type="password" 
            id="password" 
            value={loginInfo.password}
            required
            onChange={(e) => setLoginInfo({...loginInfo,password: e.target.value})}
            placeholder="senha"
            disabled = {disable}/>

            <button type="submit" onClick={()=>postInfo()} disabled = {disable}>{disable?<ThreeDots color="#FFFFFF" width={52} height={14}/>:"Cadastrar"}</button>
        </form>
        <Link to="/cadastro"><span>Não tem uma conta? Cadastre-se!</span></Link>
    </Main>)
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    img{
        margin-top: 68px;
        margin-bottom: 40px;
        width: 180px;
        height: 180px;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width:100%;
        margin-bottom: 25px;
    }
    
    input{
        width: 75%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
        padding: 11px;
    }

    input::placeholder{
        font-weight: 400;
        font-size: 20px;
        color: #DBDBDB;
    }

    button{
        background-color: #52B6FF;
        border-radius: 5px;
        border: hidden;
        width: 75%;
        height: 45px;
        margin-bottom: 25px;
        font-weight: 400;
        font-size: 20px;
        color: #FFFFFF;
        display: flex;
        align-items:center;
        justify-content: center;
    }

    span{
        text-decoration-line: underline;
        color: #52B6FF;
        font-weight: 400;
        font-size: 14px;
    }
`
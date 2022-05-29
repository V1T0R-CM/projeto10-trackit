import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {ThreeDots} from "react-loader-spinner"
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/image/logo.png";

export default function Register(){
    const [registerInfo, setRegisterInfo]=useState({email:'', password:'', name:'', image:''})
    const [disable, setDisable]=useState(false)
    const navigate = useNavigate()

    function postInfo(){
        const validateEmail = /\S+@\S+\.\S+/
        const validateImage = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i')
        let valid = true

        if (!validateEmail.test(registerInfo.email)){
            valid=false
        }

        else if (!validateImage.test(registerInfo.image)){
            valid=false
        }

        else if (registerInfo.name.length===0){
            valid=false
        }

        else if (registerInfo.password.length===0){
            valid=false
        }
        if(valid){
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", registerInfo)
            setDisable(true)
            promise.catch(postError)
            promise.then(postSuccess)
        }
    }

    function postError(){
        setDisable(false)
        setRegisterInfo({email:'', password:'', name:'', image:''})
        alert("Email já cadastrado!")
    }

    function postSuccess(){
        navigate("/")
    }
    
    function submitData(event){
        event.preventDefault();
        postInfo()
    }

    return (
    <Main>
        <img src={logo}/>
        <form onSubmit={submitData}>
            <input 
            type="email" 
            id="email" 
            value={registerInfo.email} 
            required
            onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})}
            placeholder="email"
            disabled = {disable}/>

            <input 
            type="password" 
            id="password" 
            value={registerInfo.password}
            required
            onChange={(e) => setRegisterInfo({...registerInfo,password: e.target.value})}
            placeholder="senha"
            disabled = {disable}/>
            
            <input 
            type="text" 
            id="name" 
            value={registerInfo.name} 
            required
            onChange={(e) => setRegisterInfo({...registerInfo, name: e.target.value})}
            placeholder="nome"
            disabled = {disable}/>

            <input 
            type="text" 
            id="image" 
            value={registerInfo.image}
            required
            onChange={(e) => setRegisterInfo({...registerInfo,image: e.target.value})}
            placeholder="foto"
            disabled = {disable}/>

            <button type="submit" disabled = {disable}>{disable?<ThreeDots color="#FFFFFF" width={52} height={14}/>:"Cadastrar"}</button>
        </form>
        <Link to="/"><span>Já tem uma conta? Faça login!</span></Link>
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
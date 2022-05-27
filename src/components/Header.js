import styled from "styled-components";

export default function Header({imgURL}){
    return (
    <Main>
        <h1>TrackIt</h1>
        <img src={imgURL}/>
    </Main>)
} 


const Main = styled.div`
    padding-left: 5%;
    padding-right: 5%;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    font-family: 'Playball';
    font-weight: 400;
    font-size: 40px;
    color: #FFFFFF;
    position:fixed;
    top:0;
    left:0;

    img{
        width: 51px;
        height: 51px;
        border-radius: 100px;
    }
`
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer({value}){
    return(
        <Main>
            <FrameProgress>
                <Link to="/hoje">
                    <CircularProgressbar
                        value={value}
                        text={"Hoje"}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                        })}
                    />
                </Link>
            </FrameProgress>
            <Navigation>
                <Link to="/habitos"><span>Hábitos</span></Link>
                <Link to="/historico"><span>Histórico</span></Link>
            </Navigation>
      </Main>
    )
}

const Main = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
`

const FrameProgress = styled.div`
    width:90px;
    height:90px;
    position: absolute;
`

const Navigation = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    margin-top: 30px;
    background-color: #ffffff;

    span{
        font-weight: 400;
        font-size: 18px;
        color: #52B6FF;
    }

    a{
        text-decoration: none;
    }
`

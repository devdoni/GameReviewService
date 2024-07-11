import React from "react";
import Menubar from "./Menubar";
import './css/home.css';

const Home = ({isLogined, setIsLogined}) => {
    return(
        <>
            <Menubar isLogined={isLogined} setIsLogined={setIsLogined}/>
            <div id="hompage">
                <ul className="mainimg">
                    <li><img src={process.env.PUBLIC_URL + './imgs/leftarrow.png'} className="arw" /></li>
                    <li><img src={process.env.PUBLIC_URL + './imgs/palworld.jpg'} className="mimgs"/></li>
                    <li><img src={process.env.PUBLIC_URL + './imgs/stardewvalley.jpg'} className="mimgs"/></li>
                    <li><img src={process.env.PUBLIC_URL + './imgs/callofduty.jpg'} className="mimgs"/></li>
                    <li><img src={process.env.PUBLIC_URL + './imgs/rightarrow.png'} className="arw" /></li>
                </ul>

                <div className="btnbox" />
                <div className="btnbox" />
                <div className="btnbox" />
                <div className="btnbox" />
                <div className="btnbox" />
                <div className="btnbox" />
                <div className="btnbox" />

                
                    <div className="table1">
                        <table>
                            <tr className="thead1">
                                <td colSpan="2"><h2>가상 현실게임</h2>
                                <p>집중 조명 태그</p></td>
                            </tr>
                            <div className="tablebgimg">
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/battlegrounds.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/alyx.jpg'} className="table1imgs"/></td>
                            </tr>
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/sekiro.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/pahasmophobia.jpg'} className="table1imgs"/></td>
                            </tr>
                            </div>
                        </table>

                        <table>
                            <tr className="thead1">
                                <td colSpan="2"><h2>가상 현실게임</h2>
                                <p>집중 조명 태그</p></td>
                            </tr>
                            <div className="tablebgimg">
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/sekiro.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/spider-man_remastered.jpg'} className="table1imgs"/></td>
                            </tr>
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/assassin`s_odyssey.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/assassin`s_creed_varhalla.jpg'} className="table1imgs"/></td>
                            </tr>
                            </div>
                        </table>
                    </div>

                    
                
                    
            </div>
        </>
    );
}

export default Home;
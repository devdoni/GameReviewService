import React from "react";
import Menubar from "./Menubar";
import './css/home.css';

const Home = () => {
    return(
        <>
            <div id="hompage">
                <ul className="mainimg">
                    <li><img src={process.env.PUBLIC_URL + './imgs/leftarrow.png'} className="arw" /></li>
                    <li><img src={process.env.PUBLIC_URL + './imgs/mainimgs/palworld.jpg'} className="mimgs"/></li>
                    <li><img src={process.env.PUBLIC_URL + './imgs/mainimgs/stardewvalley.jpg'} className="mimgs"/></li>
                    <li><img src={process.env.PUBLIC_URL + './imgs/mainimgs/callofduty.jpg'} className="mimgs"/></li>
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
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/battlegrounds.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/alyx.jpg'} className="table1imgs"/></td>
                            </tr>
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/sekiro.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/pahasmophobia.jpg'} className="table1imgs"/></td>
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
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/sekiro.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/spider-man_remastered.jpg'} className="table1imgs"/></td>
                            </tr>
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/assassin`s_odyssey.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/assassin`s_creed_varhalla.jpg'} className="table1imgs"/></td>
                            </tr>
                            </div>
                        </table>
                    </div>

                    <div className="table1">
                        <table>
                            <tr className="thead1">
                                <td colSpan="2"><h2>가상 현실게임</h2>
                                <p>집중 조명 태그</p></td>
                            </tr>
                            <div className="tablebgimg">
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/cyberpunk2077.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/hogwarts_legacy.jpg'} className="table1imgs"/></td>
                            </tr>
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/war_thunder.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/yu-gi-oh_master_duel.jpg'} className="table1imgs"/></td>
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
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/baldur`s_gate3.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/sannabi.jpg'} className="table1imgs"/></td>
                            </tr>
                            <tr>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/tekken.jpg'} className="table1imgs"/></td>
                                <td><img src={process.env.PUBLIC_URL + './imgs/mainimgs/torchlight.jpg'} className="table1imgs"/></td>
                            </tr>
                            </div>
                        </table>
                    </div>

                    {/* category btn */}
                    <div className="categorybox">
                        <h2>카테고리별로 살펴보기</h2>
                        <a className="rpgimg">
                            <div className="imgcarousel">
                                <img src="./imgs/category/bladur`s_gate3_rpg.jpg"  className="imgcsl"/>
                                <div className="gradient"></div>
                                <span>RPG</span>
                            </div>
                        </a>

                        <a className="smulimg">
                            <div className="imgcarousel">
                                <img src="./imgs/category/stardew_valley_simulation.jpg"  className="imgcsl"/>
                                <div className="gradient"></div>
                                <span>시뮬레이션</span>
                            </div>
                        </a>

                        <a className="sptimg">
                            <div className="imgcarousel">
                                <img src="./imgs/category/football_manager2024_allsports.jpg"  className="imgcsl"/>
                                <div className="gradient"></div>
                                <span>스포츠</span>
                            </div>
                        </a>

                    </div>

                    {/* 

                        <div className="btnbox" />
                        <div className="btnbox" />
                        <div className="btnbox" />

                        
                        
                    </div> */}
                    
            </div>
        </>
    );
}

export default Home;
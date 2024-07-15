import React, { useEffect, useState } from "react";
import Menubar from "./Menubar";
import './css/home.css';
import CategorySlideView from "./CategorySlideView";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import MainGames from './db/MainGames.json';


const Home = () => {

    //Hook 
    const [games, setGames] = useState([]);
    useEffect(() => {
        const getData = () => {
            console.log('MainGames==>', MainGames)
            setGames(MainGames);
            console.log('games==>', games)
        };
        getData();
    }, []);

    // 슬라이드를 설정하는 부분
    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        autoplaySpeed: 4000,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 3
        
      };

    return(
        <>
        <div id="hompage">

        <div id="mainthum_slide">
            <Slider {...settings} className="main_slider">
                {games.map((game) => (
                <div id="main_content">
                <div className="main_thum" key={game.no}>
                    <Link to={`/${game.href}`}>
                        <img src={`./imgs/${game.src}`} alt={`${game.name}`} className="mimgs"/>
                        <div className="overlay">
                            <h3>{game.name}</h3>
                            <p>{game.info}</p>
                        </div>
                    </Link>
                </div>
                </div>
            ))}
            </Slider>

        </div>

                    <div className="game_table">
                        <table>
                            <tr className="thead">
                                <td colSpan="2"><h2>할인/가격</h2>
                                <p>집중 조명 태그</p></td>
                            </tr>
                            <div className="tablebgimg">
                            <tr>
                                <td>
                                    <div className="img_container">
                                        <img src={process.env.PUBLIC_URL + './imgs/mainimgs/battlegrounds.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>        
                                </td>
                                <td>
                                    <div className="img_container">
                                        <img src={process.env.PUBLIC_URL + './imgs/mainimgs/alyx.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/sekiro.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/pahasmophobia.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </div>
                        </table>
                        

                        <table>
                            <tr className="thead">
                                <td colSpan="2"><h2>무료제품</h2>
                                <p>집중 조명 태그</p></td>
                            </tr>
                            <div className="tablebgimg">
                            <tr>
                                <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/sekiro.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/spider-man_remastered.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/assassin`s_odyssey.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/assassin`s_creed_varhalla.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </div>
                        </table>
                        
                    </div>
                    <button className="morebtn_left">더보기</button>
                    <button className="morebtn_right">더보기</button>

                    <div className="game_table">
                        <table>
                            <tr className="thead">
                                <td colSpan="2"><h2>가상 현실게임</h2>
                                <p>집중 조명 태그</p></td>
                            </tr>
                            <div className="tablebgimg">
                            <tr>
                                <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/cyberpunk2077.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/hogwarts_legacy.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="img_container">
                                        <img src={process.env.PUBLIC_URL + './imgs/mainimgs/war_thunder.jpg'} className="table1imgs"/>
                                            <div className="overlay">
                                                <p>게임 짧은소개</p>
                                            </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="img_container">
                                        <img src={process.env.PUBLIC_URL + './imgs/mainimgs/yu-gi-oh_master_duel.jpg'} className="table1imgs"/>
                                            <div className="overlay">
                                                <p>게임 짧은소개</p>
                                            </div>
                                    </div>

                                </td>
                            </tr>
                            </div>
                        </table>
                        

                        <table>
                            <tr className="thead">
                                <td colSpan="2"><h2>가상 현실게임</h2>
                                <p>집중 조명 태그</p></td>
                            </tr>
                            <div className="tablebgimg">
                            <tr>
                            <td>
                                <div className="img_container">
                                    <img src={process.env.PUBLIC_URL + './imgs/mainimgs/baldur`s_gate3.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                </div>
                            </td>
                            <td>
                                <div className="img_container">
                                <img src={process.env.PUBLIC_URL + './imgs/mainimgs/sannabi.jpg'} className="table1imgs"/>  
                                    <div className="overlay">
                                        <p>게임 짧은소개</p>
                                    </div>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <div className="img_container">
                                    <img src={process.env.PUBLIC_URL + './imgs/mainimgs/tekken.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                </div>                               
                            </td>
                            <td>
                                <div className="img_container">
                                    <img src={process.env.PUBLIC_URL + './imgs/mainimgs/torchlight.jpg'} className="table1imgs"/>
                                        <div className="overlay">
                                            <p>게임 짧은소개</p>
                                        </div>
                                </div>
                            </td>
                            </tr>
                            </div>
                        </table>
                        
                    </div>
                    <button className="morebtn_left">더보기</button>
                    <button className="morebtn_right">더보기</button>

                    {/* category btn */}
                    <div className="categorybox">
                        <h2>카테고리별로 살펴보기</h2>
                        <CategorySlideView />
                    </div>
                    
            </div>
        </>
    );
}

export default Home;
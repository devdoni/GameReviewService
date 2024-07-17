import React, { useEffect, useState } from "react";
import './css/home.css';
import CategorySlideView from "./CategorySlideView";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import MainGames from './db/MainGames.json';
import popularDB from './db/popularDB.json';
import CustomArrow from "./etc/CustomArrow";
import GameTable from "./games/GameTable";


const Home = () => {

    //Hook 
    const [games, setGames] = useState([]);
    const [popGames, setPopGames] = useState([]);
    useEffect(() => {
        const getData = () => {
            setGames(MainGames);
            setPopGames(popularDB);
            console.log('data ==>',MainGames,popularDB);
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
        slidesToScroll: 3,
        nextArrow: <CustomArrow icon=">" className={"slick-next"}/>,
        prevArrow: <CustomArrow icon="<" className={"slick-prev"}/>
        
      };

    return(
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
            <GameTable />
                    {/* category btn */}
                    <div className="categorybox">
                        <h2>카테고리별로 살펴보기</h2>
                        <CategorySlideView />
                    </div>
                    
            </div>
        </div>
    );
}

export default Home;
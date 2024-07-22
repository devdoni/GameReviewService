import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import "../css/games.css";
import "../css/home.css";
import FreeCustomArrow from "../etc/FreeCustomArrow";
import Slider from "react-slick";
import MainGames from '../db/MainGames.json';
import popularDB from '../db/popularDB.json';



const Free = () => {

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

const settings = {
    dots: true,
    dotsClass: 'free-slick-dots custom-dots',
    infinite: false,
    autoplay:true,
    autoplaySpeed: 4000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <FreeCustomArrow icon="./imgs/rightarrow.png" className={"free-slick-next"}/>,
    prevArrow: <FreeCustomArrow icon="./imgs/leftarrow.png" className={"free-slick-prev"}/>
    

  };

  const [popularArr, setPopularArr] = useState([]);

    useEffect(() => {
        console.log('useEffect()');

        console.log('popularDB: ', popularDB);
        setPopularArr(popularDB);

    }, []);

    const linkClickHandler = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }

    

return(
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div id="hompage">

        <div id="freethum_slide">
            <h1>무료 플레이 게임</h1>
            <Slider {...settings} className="free_slider">
                {games.map((game) => (
                <div id="free_content">
                <div className="free_thum" key={game.no}>
                    <Link to={`/${game.href}`}>
                    <div className="free-image-info-container">
                        <img src={`./imgs/${game.src}`} alt={`${game.name}`} className="fimgs"/>
                        <div className="free-game_info">
                            <h3>{game.name}</h3>
                            <p>{game.info}</p>
                        </div>
                    </div>
                    </Link>
                </div>
                </div>
            ))}
            </Slider>
        </div>

        <div id="free_wrap">
            <div className="free-header">
                무료 게임
            </div>
        <div className="free-sub-header">
            <div className="free-sub-header-item sub-item">게임 이름</div>
        </div>
        <div className="items">
        {
            popularArr.map((popular, idx) => {
                return (
                    <div className="item" key={idx}>
                        <div className="rank">{idx + 1}</div>
                        <div className="thumbnail">
                            <Link to={`/detail/${popular['no']}`} onClick={linkClickHandler}>
                                <img src={popular['thumnail-link']} alt={popular['title']} />
                            </Link>
                        </div>
                        <div className="title">{popular['Name']}</div>
                        <button className="free-play">무료 플레이</button>
                    </div>
                )
            })
        }
    </div>
</div>
    </div>
    </motion.div>
    

    )
}
export default Free;
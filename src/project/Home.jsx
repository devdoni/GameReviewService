import React, { useEffect, useState } from "react";
import './css/home.css';
import CategorySlideView from "./CategorySlideView";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import MainGames from './db/MainGames.json';
import popularDB from './db/popularDB.json';
import CustomArrow from "./etc/CustomArrow";
import GameTable from "./games/GameTable";
import { motion } from 'framer-motion';
import txt_kor from './db/txt_kor.json';
import txt_eng from './db/txt_eng.json';
import txt_chi from './db/txt_chi.json';

const Home = ({isLogined, setIsLogined, langFileName}) => {
    
    //Hook 
    const [games, setGames] = useState([]);
    const [popGames, setPopGames] = useState([]);
    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    useEffect(() => {
        const getData = () => {
            setGames(MainGames);
            setPopGames(popularDB);
            console.log('data ==>',MainGames,popularDB);
        };
        getData();

        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);

        }
    }, [langFileName]);

    const settings = {
        dots: true,
        dotsClass: 'slick-dots custom-dots',
        infinite: true,
        autoplay:true,
        autoplaySpeed: 4000,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <CustomArrow icon="./imgs/rightarrow.png" className={"slick-next"}/>,
        prevArrow: <CustomArrow icon="./imgs/leftarrow.png" className={"slick-prev"}/>
        
      };

    return(
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
                <GameTable langFileName={langFileName}/>
            </div>
            <div className="categorybox">
                <h2>{lang.browseByCategory}</h2>
                <CategorySlideView />
            </div>
            
        </div>
        </motion.div>
    );
}

export default Home;
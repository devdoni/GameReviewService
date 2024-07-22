import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import '../css/free.css'
import Slider from "react-slick";
import MainGames from '../db/MainGames.json';
import popularDB from '../db/popularDB.json';
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import MainCustomArrow from "../etc/MainCustomArrow";
import { getProdFlag } from "../utils/utils";



const Free = ({langFileName}) => {

    const [games, setGames] = useState([]);
    const [lang, setLang] = useState(txt_kor);    
    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }
    useEffect(() => {
        if(!getProdFlag()) console.log('[Free] useEffect()');

        if (langFileName === 'kor') {
            setLang(languageData.kor);
        } else if (langFileName === 'eng') {
            setLang(languageData.eng);
        } else if (langFileName === 'chi') {
            setLang(languageData.chi);
        } else {    
            setLang(languageData.kor);
        }


        getData();
    }, [langFileName]);

    const [popularArr, setPopularArr] = useState([]);

    const getData = () => {
        setGames(MainGames);
        setPopularArr(popularDB.filter(game => game.Price === '무료'))
    };

    
    
    const linkClickHandler = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }


    const settings = {
        dots: true,
        infinite: false,
        autoplay:true,
        autoplaySpeed: 4000,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true, 
        centerPadding: '0px',
        nextArrow: <MainCustomArrow icon="./imgs/rightarrow.png" className="custom-arrow" />,
        prevArrow: <MainCustomArrow icon="./imgs/leftarrow.png" className="custom-arrow" />,
        appendDots: dots => (
            <div style={{ display: "flex", justifyContent: "center", bottom: "10px" }}>
              <ul style={{ margin: "0px", padding: "0", listStyle: "none", display: "flex", justifyContent: "center" }}>{dots}</ul>
            </div>
          ),
          customPaging: i => (
            <button
              style={{
                width: "20px",
                height: "10px",
                borderRadius: "3px",
                background: "rgba(255, 255, 255, 0.5)",
                border: "none",
                cursor: "pointer",
                padding: "0"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255, 255, 255, 1)"}
              onMouseLeave={e => e.currentTarget.classList.contains("slick-active") ? e.currentTarget.style.background = "rgba(255, 255, 255, 1)" : e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)"}
            />
          )
        };

    

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div id="hompage">
                <div id="freethum_slide">
                    <h1>{lang.freePlayGame}</h1>
                    <Slider {...settings} className="free_slider">
                        {games.map((game) => (
                            <div className="free_content" key={game.no}>
                                <div className="free_thum">
                                    <Link to={`/${game.href}`}>
                                        <div className="free-image-info-container">
                                            <img src={`./imgs/${game.src}`} alt={`${game.name}`} className="fimgs" />
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
                        {lang.freeGames}
                    </div>
                    <div className="free-sub-header">
                        <div className="free-sub-header-item sub-item">{lang.gameName}</div>
                    </div>
                    <div className="items">
                        {popularArr.map((popular, idx) => (
                            <div className="item" key={idx}>
                                <div className="rank">{idx + 1}</div>
                                <div className="thumbnail">
                                    <Link to={`/detail/${popular['no']}`} onClick={linkClickHandler}>
                                        <img src={popular['thumnail-link']} alt={popular['title']} />
                                    </Link>
                                </div>
                                <div className="title">{popular['Name']}</div>
                                <Link to={popular.href}><button className="free-play">{lang.freePlay}</button></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

    export default Free;
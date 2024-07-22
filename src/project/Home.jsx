import React, { useEffect, useState } from "react";
import './css/home.css';
import CategorySlideView from "./CategorySlideView";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import MainGames from './db/MainGames.json';
import popularDB from './db/popularDB.json';
import GameTable from "./games/GameTable";
import { motion } from 'framer-motion';
import txt_kor from './db/txt_kor.json';
import txt_eng from './db/txt_eng.json';
import txt_chi from './db/txt_chi.json';
import MainCustomArrow from "./etc/MainCustomArrow";
import { getProdFlag } from "./utils/utils";

const Home = ({ langFileName}) => {
    
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
      if(!getProdFlag()) console.log('[Home] useEfect()');
        const getData = () => {
            setGames(MainGames);
            setPopGames(popularDB);
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
        nextArrow: <MainCustomArrow icon="./imgs/rightarrow.png" className="slick-next" />,
        prevArrow: <MainCustomArrow icon="./imgs/leftarrow.png" className="slick-prev" />
        
      };

      return (
        <motion.div className="home-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div id="hompage">
            <div className="main-slider-container">
              <div id="mainthum_slide">
                <div className="inner-border">
                  <Slider {...settings} className="main_slider">
                    {games.map((game) => (
                      <div id="main_content" key={game.no}>
                        <div className="main_thum">
                          <Link to={`/${game.href}`}>
                            <img src={`./imgs/${game.src}`} alt={game.name} className="mimgs" />
                            <div className="main_overlay">
                              <h3>{game.name}</h3>
                              <p>{game.info}</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
    
            <div className="game_table">
              <GameTable langFileName={langFileName} />
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
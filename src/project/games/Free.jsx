import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import "../css/games.css";
import "../css/home.css";
import CustomArrow from "../etc/CustomArrow";
import Slider from "react-slick";
import MainGames from '../db/MainGames.json';
import popularDB from '../db/popularDB.json';
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';


const Free = ({langFileName}) => {

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
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow icon="./imgs/rightarrow.png" className={"slick-next"}/>,
    prevArrow: <CustomArrow icon="./imgs/leftarrow.png" className={"slick-prev"}/>
    

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
            <h1>{lang.freePlayGames}</h1>
            <Slider {...settings} className="free_slider">
                {games.map((game) => (
                <div id="free_content">
                <div className="free_thum" key={game.no}>
                    <Link to={`/${game.href}`}>
                    <div className="image-info-container">
                        <img src={`./imgs/${game.src}`} alt={`${game.name}`} className="fimgs"/>
                        <div className="game_info">
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
        <div className="sub-header">
            {/* <div className="sub-header-item sub-rank">순위</div> */}
            <div className="sub-header-item sub-item">{lang.gameName}</div>
            {/* <div className="sub-header-item sub-price">가격</div>
            <div className="sub-header-item sub-dicount">할인 정보</div> */}
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
                        <button className="wish-button">{lang.addToWishlist}</button>
                        <button className="free-play">{lang.freePlay}</button>
                        {/* <div className="price">{popular['Price']}원</div>
                        <div className="discount">{popular['Discount']}</div> */}
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
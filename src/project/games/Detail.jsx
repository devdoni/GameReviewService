import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
import popularDB_kor from '../db/popularDB_kor.json'
import popularDB_eng from '../db/popularDB_eng.json'
import popularDB_chi from '../db/popularDB_chi.json'
import ReviewWrite from "../review/ReviewWrite";
import ReviewList from "../review/ReviewList";
import Slider from "react-slick";
import { motion } from 'framer-motion';
import WishSelect from "../member/WishSelect";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import { getProdFlag } from "../utils/utils";


const Detail = ({langFileName}) => {

    const { no } = useParams(); 
    const [popularTargetObj, setPopularTargetObj] = useState({});
    const [writeFlag, setWriteFlag] = useState(false);
    const [lang, setLang] = useState(txt_kor);          // txt_kor ---> lang is undefined

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }


    useEffect(() => {
        if(!getProdFlag()) console.log('[Detail] useEffect()');

        if (langFileName === 'kor') {
            setPopularTargetObj(popularDB_kor.find(p => p.no === parseInt(no)));
            setLang(languageData.kor);
        } else if (langFileName === 'eng') {
            setPopularTargetObj(popularDB_eng.find(p => p.no === parseInt(no)));
            setLang(languageData.eng);
        } else if (langFileName === 'chi') {
            setPopularTargetObj(popularDB_chi.find(p => p.no === parseInt(no)));
            setLang(languageData.chi);
        } else {    
            setPopularTargetObj(popularDB_kor.find(p => p.no === parseInt(no)));
            setLang(languageData.kor);
        }

    }, [langFileName]); 

    useEffect(() => {
        setWriteFlag(prev => !prev);
    }, []);


    const imgUrl = [ 
        popularTargetObj.detail_img_01,
        popularTargetObj.detail_img_02,
        popularTargetObj.detail_img_03,
        popularTargetObj.detail_img_04
    ];
    
    const settings = {
        dots: true,
        dotsClass: "custom-dots",
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: i => (
            <button>
                <img src={`/imgs/data/${popularTargetObj.detail_img_dir}/${imgUrl[i]}`} alt={`thumbnail ${i + 1}`} />
            </button>
        ),
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="detail"
        >
            <div id="gamesinfo_wrap">
                <div className="detail_header">
                    <h1>{popularTargetObj.Name}</h1>
                </div>

                <div className="detail_item">
                    <div className="slider_wrapper">
                        <Slider {...settings}>
                            {imgUrl.map((img, index) => (
                                <div key={index} className="slider_image">
                                    <img className="s_img" src={`/imgs/data/${popularTargetObj.detail_img_dir}/${img}`} alt={`game image ${index + 1}`} />
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="game_info">
                        <div><img src={popularTargetObj['thumnail-link']} alt="thumbnail" /></div>
                        <div className="game_name"><strong>{lang.gameName}<br/></strong> {popularTargetObj.Name}</div>
                        <div className="game_release_date"><strong>{lang.releaseDate}:<br/></strong> {popularTargetObj.date}</div>
                        <div className="game_introduction"><strong>{lang.gameIntroduction} <br/></strong> {popularTargetObj.description}</div>
                        <div className="game_genre"><strong>{lang.gameGenre}</strong> {popularTargetObj.genre}</div>
                        <div className="buttons_wrapper">
                            <Link to={popularTargetObj.href}><button className="action_button">{lang.goToPurchaseSite}</button></Link>
                            <WishSelect no={no} gameName={popularTargetObj.Name} gameHref={popularTargetObj.href} gameSrc={popularTargetObj['thumnail-link']} setWriteFlag={setWriteFlag} langFileName={langFileName} />
                        </div>
                    </div>
   
                </div>
            </div>       
            <div className="game_detail_info">
                <div className="section">
                    <p>{popularTargetObj.Name}{lang.gameDetail}</p>
                    {popularTargetObj.detail_info}
                </div>
                <div className="highlight-container">
                    <div className="highlight">
                        <div>
                            <span>{lang.averageRating}</span>
                            <span className="star-rating">⭐ {popularTargetObj.score}</span>
                        </div>
                        <div>
                            <span>{lang.discountInformation}</span>
                            <span>{popularTargetObj.Discount}</span>
                        </div>
                        <div>
                            <span>{lang.price}</span>
                            <span>{popularTargetObj.Price}</span>
                        </div>
                    </div>
                    <div className="game_recom">
                        <p>{lang.recommendedSystem}</p>
                        <div>
                            {lang.OS}: {popularTargetObj.operation_system}<br/>
                            {lang.processor}: {popularTargetObj.processor}<br/>
                            {lang.memory}: {popularTargetObj.memory}<br/>
                            {lang.graphics}: {popularTargetObj.graphics}<br/>
                            {lang.storage}: {popularTargetObj.storage}
                        </div>
                    </div>
                </div>
            </div>
            
            <ReviewWrite gameName={popularTargetObj.Name} langFileName={langFileName} no={no} gameSrc={popularTargetObj['thumnail-link']} setWriteFlag={setWriteFlag} writeFlag={writeFlag} />
            <ReviewList gameName={popularTargetObj.Name} langFileName={langFileName} no={no} setWriteFlag={setWriteFlag} writeFlag={writeFlag} />
        </motion.div>
    );
};


export default Detail;
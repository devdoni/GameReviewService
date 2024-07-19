import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
import popularDB_kor from '../db/popularDB_kor.json'
import popularDB_eng from '../db/popularDB_eng.json'
import popularDB_chi from '../db/popularDB_chi.json'
import ReviewWrite from "../review/ReviewWrite";
import ReviewList from "../review/ReviewList";

import Slider from "react-slick";
import { motion } from 'framer-motion'

const Detail = ({langFileName}) => {

    const { no } = useParams(); 
    const [popularTargetObj, setPopularTargetObj] = useState({});

    useEffect(() => {
        console.log('[Detail] useEffect()');

        if (langFileName === 'kor') {
            setPopularTargetObj(popularDB_kor.find(p => p.no === parseInt(no)));
        } else if (langFileName === 'eng') {
            setPopularTargetObj(popularDB_eng.find(p => p.no === parseInt(no)));
        } else if (langFileName === 'chi') {
            setPopularTargetObj(popularDB_chi.find(p => p.no === parseInt(no)));
        } else {    
            setPopularTargetObj(popularDB_kor.find(p => p.no === parseInt(no)));
        }

    }, [langFileName]); 

    const imgUrl = [ 
        popularTargetObj.detail_img_01,
        popularTargetObj.detail_img_02,
        popularTargetObj.detail_img_03,
        popularTargetObj.detail_img_04
    ];

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, 
    };

    return (
        <>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
                        <div><img src={popularTargetObj['thumnail-link']} /></div>
                        <div><strong>{popularTargetObj.game_name}:</strong> {popularTargetObj.Name}</div>
                        <div><strong>{popularTargetObj.game_release_date}:</strong> {popularTargetObj.date}</div>
                        <div><strong>{popularTargetObj.game_introduction}:</strong> {popularTargetObj.description}</div>
                        <div><strong>{popularTargetObj.game_genre}:</strong> {popularTargetObj.genre}</div>
                    </div>
                </div>
            </div>       
            <ReviewWrite gameName={popularTargetObj.gameName} />
            <ReviewList gameName={popularTargetObj.gameName} />
        </motion.div>
        </>
    );
};


export default Detail;
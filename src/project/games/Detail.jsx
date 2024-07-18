import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
import popularDB from '../db/popularDB.json';
import ReviewWrite from "../review/ReviewWrite";
import ReviewList from "../review/ReviewList";
import Slider from "react-slick";
import { motion } from 'framer-motion'

const Detail = () => {

    const { no } = useParams(); 
    const gameDetail = popularDB.find(p => p.no === parseInt(no)); 
    const [writeFlag, setWriteFlag] = useState(false);
    const [gameName, setGameName] = useState('');
    

    useEffect(() => {
        console.log('[Detail] useEffect()');

        if (gameDetail) {   
            setGameName(gameDetail.Name);
        }
    }, [no, gameDetail]); 

    const imgUrl = [ 
        gameDetail.detail_img_01,
        gameDetail.detail_img_02,
        gameDetail.detail_img_03,
        gameDetail.detail_img_04
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
                    <h1>{gameDetail.Name}</h1>
                </div>

                <div className="detail_item">
                    <div className="slider_wrapper">
                        <Slider {...settings}>
                            {imgUrl.map((img, index) => (
                                <div key={index} className="slider_image">
                                    <img className="s_img" src={`/imgs/data/${gameDetail.detail_img_dir}/${img}`} alt={`game image ${index + 1}`} />
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="game_info">
                        <div><strong>이름:</strong> {gameDetail.Name}</div>
                        <div><strong>출시시간:</strong> {gameDetail.date}</div>
                        <div><strong>게임소개:</strong> {gameDetail.description}</div>
                        <div><strong>게임장르:</strong> {gameDetail.main_genre}</div>
                    </div>
                </div>
            </div>       
            <ReviewWrite gameName={gameName} setWriteFlag={setWriteFlag} />
            <ReviewList gameName={gameName} writeFlag={writeFlag} setWriteFlag={setWriteFlag} />
        </motion.div>
        </>
    );
};


export default Detail;
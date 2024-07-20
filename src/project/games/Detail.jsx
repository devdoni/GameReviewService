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
import { motion } from 'framer-motion'
import CustomArrow from "../etc/CustomArrow";
import WishSelect from "./WishSelect";


const Detail = ({langFileName}) => {

    const { no } = useParams(); 
    const [popularTargetObj, setPopularTargetObj] = useState({});
    const [writeFlag, setWriteFlag] = useState(false);

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
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <CustomArrow icon="./imgs/rightarrow.png" className={"slick-next"}/>,
        prevArrow: <CustomArrow icon="./imgs/leftarrow.png" className={"slick-prev"}/>
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
                        <div className="buttons_wrapper">
                            <Link to={popularTargetObj.href}><button className="action_button">구매 사이트 이동</button></Link>
                            <WishSelect no={no} gameName={popularTargetObj.Name} gameHref={popularTargetObj.href} gameSrc={popularTargetObj['thumnail-link']} setWriteFlag={setWriteFlag}/>
                        </div>
                    </div>
                </div>
            </div>       
            <ReviewWrite gameName={popularTargetObj.Name} setWriteFlag={setWriteFlag} writeFlag={writeFlag} />
            <ReviewList gameName={popularTargetObj.Name} setWriteFlag={setWriteFlag} writeFlag={writeFlag} />

        </motion.div>
        </>
    );
};

export default Detail;
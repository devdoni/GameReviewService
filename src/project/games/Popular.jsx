import React, { useEffect, useState } from "react";
import "../css/games.css";
import { motion } from 'framer-motion'
import popularDB from '../db/popularDB.json'
import { Link } from "react-router-dom";


const Popular = () => {

    // hook

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
        <div id="popular_wrap">
            <div className="popular-header">
                최고 인기 게임
            </div>
        <div className="sub-header">
            <div className="sub-header-item sub-rank">순위</div>
            <div className="sub-header-item sub-item">게임 이름</div>
            <div className="sub-header-item sub-price">가격</div>
            <div className="sub-header-item sub-dicount">할인 정보</div>
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
                        <div className="price">{popular['Price']}원</div>
                        <div className="discount">{popular['Discount']}</div>
                    </div>
                )
            })
        }
    </div>
</div>
</motion.div>
    );
}


export default Popular;
import React, { useEffect, useState } from "react";
import "../css/games.css";
import { motion } from 'framer-motion'
import popularDB from '../db/popularDB.json'
import { Link } from "react-router-dom";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import { getProdFlag } from "../utils/utils";

const Popular = ({langFileName}) => {

    // hook

    const [popularArr, setPopularArr] = useState([]);
    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi
    }

    useEffect(() => {
        if(!getProdFlag()) console.log('[Popular] useEffect()');
        setPopularArr(popularDB);

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
                {lang.topPopularGames}
            </div>
        <div className="sub-header">
            <div className="sub-header-item sub-rank">{lang.rank}</div>
            <div className="sub-header-item sub-item">{lang.gameName}</div>
            <div className="sub-header-item sub-price">{lang.price}</div>
            <div className="sub-header-item sub-dicount">{lang.discountInformation}</div>
        </div>
        <div className="items">
        {
            popularArr.map((popular, idx) => {
                return (
                    <Link to={`/detail/${popular['no']}`} onClick={linkClickHandler} id="item_Link">
                    <div className="item" key={idx}>
                        <div className="rank">{idx + 1}</div>
                        <div className="thumbnail">

                                <img src={popular['thumnail-link']} alt={popular['title']} />
                            
                        </div>
                        <div className="title">{popular['Name']}</div>
                        <div className="price">{popular.Price === '무료' ? popular.Price : `${popular.Price}원`}</div>
                        <div className="discount">{popular['Discount']}</div>
                    </div>
                    </Link>
                )
            })
        }
    </div>
</div>
</motion.div>
    );
}


export default Popular;
import React, { useEffect, useState } from "react";
import { getMyInfo, getMyWishList, getProdFlag, getUserDB } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { Link, useNavigate } from "react-router-dom";
import '../css/common.css';
import '../css/wishlist.css';
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';

import { motion } from 'framer-motion'

const WishList = ({isLogined,langFileName}) => {

    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }


    const navigate = useNavigate();
    const [ currentNick, setCurrentNick ] = useState('');
    const [ myWishList, setMyWishList ] = useState({});

    useEffect(() => {

        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);

        }

        if (!getProdFlag) console.log('[WishList] useEffect()');
        if (!isLogined) {
            alert(lang.thisServiceRequiresLogin);
            navigate('/signin');
            return ;
        }
        let myInfo = getMyInfo(getLoginedSessionId());
        setCurrentNick(myInfo.uNick);
        
        let myWish = getMyWishList(getLoginedSessionId());
        setMyWishList(myWish);

    }, [langFileName]);
    // 로그인이 되어있지 않았을 경우 렌더링 하지 않음
    if (!isLogined) {
        return null;
    }
    return (
        <>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}>
            <div id="wishlist_wrap">
                <div className="wish_title">
                    <span>{currentNick}&nbsp;{lang.whoseWishlist}</span>
                </div>
                <div className="wish_dropdown">
                </div>
                {Object.keys(myWishList).length === 0 ? (
                    <div className="no_wishlist">
                        {lang.noWishlist}
                    </div>
                ) : (
                    Object.keys(myWishList).map((key, index) => (
                        <div className="wish_contentbox" key={index}>
                            <div className="game_image">
                                <img src={`${myWishList[key].src}`} alt="game" />
                            </div>
                            <div className="game_name">
                                {myWishList[key].game}
                            </div>
                            <div className="game_buttons">
                                <Link to={`/detail/${myWishList[key].no}`}><button className="detail_button">{lang.detailPage}</button></Link>
                                <Link to={myWishList[key].href}><button className="buy_play_button">{lang.buyOrPlay}</button></Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
            </motion.div>
        </>
    );
};

export default WishList;
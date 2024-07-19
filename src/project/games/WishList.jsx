import React, { useEffect, useState } from "react";
import { getMyInfo, getMyWishList, getProdFlag, getUserDB } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { Link, useNavigate } from "react-router-dom";
import '../css/common.css';
import '../css/wishlist.css';


const WishList = () => {
    const [ currentNick, setCurrentNick ] = useState('');
    const [ myWishList, setMyWishList ] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        if (!getProdFlag) console.log('[WishList] useEffect()');
        if (getLoginedSessionId() === '') {
            alert('올바르지 않은 요청입니다');
            navigate('/');
            return;
        }
        let myInfo = getMyInfo(getLoginedSessionId());
        setCurrentNick(myInfo.uNick);
        
        let myWish = getMyWishList(getLoginedSessionId());
        setMyWishList(myWish);

        console.log('mywishList==>',myWish );
    }, []);

    return (
        <>
        <div id="wishlist_wrap">
            <div className="wish_title">
                <span>{currentNick}&nbsp;님의 찜 목록</span>
            </div>
            <div className="wish_dropdown">
            </div>
            {Object.keys(myWishList).map((key, index) => (
            <div className="wish_contentbox" key={index}>
                <div className="game_image">
                    <img src={`${myWishList[key].src}`} alt="game" /> 
                </div>
                <div className="game_name">
                    {myWishList[key].game}
                </div>
                <div className="game_buttons">
                    <Link to={`/detail/${myWishList[key].no}`}><button className="detail_button">상세 페이지</button></Link>
                    <Link to={myWishList[key].href}><button className="buy_play_button">게임 구매/플레이</button></Link>
                </div>
            
            </div>
            ))}
        </div> 
        </>
    );
};

export default WishList;
import React, { useEffect, useState } from "react";
import { getMyInfo, getMyWishList, getProdFlag, getUserDB } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { Link, useNavigate } from "react-router-dom";
import '../css/common.css';
import '../css/wishlist.css';


const WishList = ({isLogined}) => {


    const navigate = useNavigate();
    const [ currentNick, setCurrentNick ] = useState('');
    const [ myWishList, setMyWishList ] = useState({});

    useEffect(() => {
        if (!getProdFlag) console.log('[WishList] useEffect()');
        if (!isLogined) {
            alert('로그인이 필요한 서비스입니다');
            navigate('/signin');
            return ;
        }
        let myInfo = getMyInfo(getLoginedSessionId());
        setCurrentNick(myInfo.uNick);
        
        let myWish = getMyWishList(getLoginedSessionId());
        setMyWishList(myWish);

        console.log('mywishList==>',myWish );
    }, []);
    // 로그인이 되어있지 않았을 경우 렌더링 하지 않음
    if (!isLogined) {
        return null;
    }
    return (
        <>
            <div id="wishlist_wrap">
                <div className="wish_title">
                    <span>{currentNick}&nbsp;님의 찜 목록</span>
                </div>
                <div className="wish_dropdown">
                </div>
                {Object.keys(myWishList).length === 0 ? (
                    <div className="no_wishlist">
                        찜 한 게임이 존재하지 않습니다.
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
                                <Link to={`/detail/${myWishList[key].no}`}><button className="detail_button">상세 페이지</button></Link>
                                <Link to={myWishList[key].href}><button className="buy_play_button">게임 구매/플레이</button></Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default WishList;
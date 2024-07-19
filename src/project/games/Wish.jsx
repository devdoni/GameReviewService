import React, { useEffect, useState } from "react";
import '../css/common.css';
import '../css/detail.css';
import { getDateTime, getMyWishList, getProdFlag, getUserWishListDB, setMyWishList, setUserWishListDB,} from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { CiHeart } from "react-icons/ci";

const Wish = ({ no, gameName, setWriteFlag, writeFlag, gameHref, gameSrc }) => {    
    const [isWish, setIsWish] = useState(false);
    const [sessionID, setSessionID] = useState('');

    useEffect(() => {
        if (!getProdFlag()) console.log('[Wish] useEffect()');
        console.log('gamename ==>', gameName);
        const sessionId = getLoginedSessionId();

        setSessionID(sessionId);

        if (sessionId !== '') {
            let myWishList = getMyWishList(sessionId);
            if (myWishList && myWishList.hasOwnProperty(no.toString())) {
                setIsWish(true);
            } else {
                setIsWish(false);
            }
        }
    }, [writeFlag, no]);

    const wishListBtnClickHandler = () => {
        if (!getProdFlag()) console.log('[Wish] wishListBtnClickHandler()');

        if (sessionID === '') {
            alert('로그인이 필요한 서비스입니다.');
            return;
        }

        let userWishInfos = getUserWishListDB() || {};
        if (!userWishInfos[sessionID]) {
            userWishInfos[sessionID] = {};
        }

        let myWishList = userWishInfos[sessionID];
        const gameKey = no.toString();

        if (isWish) {
            if (myWishList.hasOwnProperty(gameKey)) {
                delete myWishList[gameKey];
                setUserWishListDB(userWishInfos);
                alert(`${gameName} 게임이 찜 리스트에서 제거되었습니다.`);
                setIsWish(false);
            }
        } else {
            if (window.confirm(`${gameName} 게임을 찜 하시겠습니까?`)) {
                myWishList[gameKey] = {
                    game: gameName,
                    no: no,
                    src: gameSrc, 
                    href: gameHref,
                    addDate: getDateTime(),

                };
                setUserWishListDB(userWishInfos);
                alert(`${gameName} 게임이 찜 리스트에 추가되었습니다.`);
                setIsWish(true);
            } else {
                alert("요청이 취소되었습니다");
            }
        }

        setWriteFlag(prev => !prev);
    };

    return (
        <>
            <CiHeart size={50} color={isWish ? "#ff0000" : "#000"} onClick={wishListBtnClickHandler} />
        </>
    );
}

export default Wish;
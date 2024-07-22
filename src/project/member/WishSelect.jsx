import React, { useEffect, useState } from "react";
import '../css/common.css';
import '../css/detail.css';
import { getDateTime, getMyWishList, getProdFlag, getUserWishListDB, setUserWishListDB,} from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { AiFillHeart } from "react-icons/ai";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';

const WishSelect = ({ no, gameName, setWriteFlag, writeFlag, gameHref, gameSrc,langFileName }) => {   
     
    const [isWish, setIsWish] = useState(false);
    const [sessionID, setSessionID] = useState('');

    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    useEffect(() => {
        if (!getProdFlag()) console.log('[Wish] useEffect()');

        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);

        }

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
    }, [writeFlag, no,langFileName]);

    const handleClick = () => {
        wishListBtnClickHandler();
    };

    const wishListBtnClickHandler = () => {
        if (!getProdFlag()) console.log('[Wish] wishListBtnClickHandler()');

        if (sessionID === '') {
            alert(lang.thisServiceRequiresLogin);
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
                alert(`${gameName} ${lang.removedFromWishlist}`);
                setIsWish(false);
            }
        } else {
            if (window.confirm(`${gameName} ${lang.wantAdd}`)) {
                myWishList[gameKey] = {
                    game: gameName,
                    no: no,
                    src: gameSrc, 
                    href: gameHref,
                    addDate: getDateTime(),

                };
                setUserWishListDB(userWishInfos);
                alert(`${gameName}${lang.added}`);
                setIsWish(true);
            } else {
                alert(lang.cancelRequest);
            }
        }

        setWriteFlag(prev => !prev);
    };

    return (
        <button className="wish-button" onClick={handleClick}>
            <AiFillHeart
                size={24}
                className={`heart-icon ${isWish ? 'active' : ''}`}
            />
            {lang.addTo}
        </button>
    );
}
export default WishSelect;
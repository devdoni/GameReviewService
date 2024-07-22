import React, { useEffect, useState } from "react";
import '../css/myinfo.css';
import { FaEdit, FaGamepad, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserDB, getProdFlag } from "../utils/utils";
import { getLoginedSessionId, setLoginedSessionId } from "../utils/session";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import { motion } from 'framer-motion'


const Myinfo = ({setIsLogined, isLogined,langFileName}) => {


    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    //Hook
    const navigate = useNavigate();
    
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

        if(!getProdFlag())console.log('[Myinfo] useEffect()'); 
        if(getLoginedSessionId() === '') {
            alert(lang.thisServiceRequiresLogin);
            navigate('/signin');
        }
    }, [langFileName])

    
    // 로그인이 되어있지 않았을 경우 렌더링 하지 않음
    if (!isLogined) {
        return null;
    }

    // HANDLER START
    const deleteBtnHandler = () => {
        if(!getProdFlag()) console.log('[MyInfo] deleteBtnHandler()');

        if (window.confirm('')) {
            
            deleteUserDB(getLoginedSessionId());

            alert(lang.reallySiginOut);

            setLoginedSessionId();
            setIsLogined(false);
            navigate('/');

            } else { 
                alert(lang.cancelSiginOut);
                return;
            }
        } 
    // HANDLER END

    // COMPONENT START
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div id="myinfo_wrap" className="myinfo-container">
            <Link to={'/modify'}>
                <div className="myinfo-button">
                    <FaEdit size={50} />
                    <span>{lang.modifyMyInfo}</span>
                </div>
            </Link>
            <div className="myinfo-button" onClick={deleteBtnHandler}>
                <FaSignOutAlt size={50} />
                <span>{lang.singOut}</span>
            </div>

            <Link to={'/wishlist'}>
                <div className="myinfo-button">
                    <FaGamepad size={50} />
                    <span>{lang.seeMyWishlist}</span>
                </div>
            </Link>
            <Link to={'/myreviewlist'}>
                <div className="myinfo-button">
                    <FaListAlt size={50} />
                    <span>{lang.seeMyReview}</span>
                </div>
            </Link>

        </div>
        </motion.div>
    );

    // COMPONENT END
}

export default Myinfo;
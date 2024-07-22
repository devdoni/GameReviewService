import React, { useEffect } from "react";
import '../css/myinfo.css';
import { FaEdit, FaGamepad, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserDB, getProdFlag } from "../utils/utils";
import { getLoginedSessionId, setLoginedSessionId } from "../utils/session";
import { motion } from 'framer-motion'

const Myinfo = ({setIsLogined, isLogined}) => {

    //Hook
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!getProdFlag())console.log('[Myinfo] useEffect()'); 
        if(getLoginedSessionId() === '') {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/signin');
        }
    }, [])
    // 로그인이 되어있지 않았을 경우 렌더링 하지 않음
    if (!isLogined) {
        return null;
    }

    // HANDLER START
    const deleteBtnHandler = () => {
        if(!getProdFlag()) console.log('[MyInfo] deleteBtnHandler()');

        if (window.confirm('정말로 회원탈퇴를 하시겠습니까?')) {
            
            deleteUserDB(getLoginedSessionId());

            alert('회원탈퇴가 완료되었습니다.');

            setLoginedSessionId();
            setIsLogined(false);
            navigate('/');

            } else { 
                alert("회원 탈퇴 요청이 취소되었습니다.");
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
                    <span>내 정보 수정</span>
                </div>
            </Link>
            <div className="myinfo-button" onClick={deleteBtnHandler}>
                <FaSignOutAlt size={50} />
                <span>회원 탈퇴</span>
            </div>

            <Link to={'/wishlist'}>
                <div className="myinfo-button">
                    <FaGamepad size={50} />
                    <span>내가 찜한 게임 보기</span>
                </div>
            </Link>
            <Link to={'/myreviewlist'}>
                <div className="myinfo-button">
                    <FaListAlt size={50} />
                    <span>내가 작성한 리뷰 보기</span>
                </div>
            </Link>

        </div>
        </motion.div>
    );

    // COMPONENT END
}

export default Myinfo;
import React from "react";
import '../css/myinfo.css';
import { FaEdit, FaGamepad, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getProdFlag, getUserDB, getUserReviewDB, getUserWishListDB, setUserDB, setUserReviewDB, setUserWishListDB } from "../utils/utils";
import { getLoginedSessionId, setLoginedSessionId } from "../utils/session";

const Myinfo = ({setIsLogined}) => {

    const navigate = useNavigate();
    const deleteBtnHandler = () => {
        if(!getProdFlag()) console.log('[Modify] deleteBtnHandler()');

        if (window.confirm('정말로 회원탈퇴를 하시겠습니까?')) {
            
            //DELETE USER INFO
            let allUserInfo = getUserDB();

            delete allUserInfo[getLoginedSessionId()].uPw;
            delete allUserInfo[getLoginedSessionId()].uNick;
            delete allUserInfo[getLoginedSessionId()].uPhone;
            delete allUserInfo[getLoginedSessionId()].uMail;
            delete allUserInfo[getLoginedSessionId()].uModDate;

            setUserDB(allUserInfo);

            let allUserRiview = getUserReviewDB();

            delete allUserRiview[getLoginedSessionId()];

            setUserReviewDB(allUserRiview);


            let allWishDB = getUserWishListDB();

            delete allWishDB[getLoginedSessionId()];

            setUserWishListDB(allWishDB);   

            alert('회원탈퇴가 완료되었습니다.');

            setLoginedSessionId();
            setIsLogined(false);
            navigate('/');

            } else { 
                alert("회원 탈퇴 요청이 취소되었습니다.");
            }
        } 
        
    return (
        <div id="myinfo_wrap" className="myinfo-container">
            <Link to={'/modify'}>
                <div className="myinfo-button">
                    <FaEdit size={50} />
                    <span>내 정보 수정</span>
                </div>
            </Link>
            <Link to={'/wishlist'}>
                <div className="myinfo-button">
                    <FaGamepad size={50} />
                    <span>찜한 게임 보기</span>
                </div>
            </Link>
                <div className="myinfo-button" onClick={deleteBtnHandler}>
                    <FaSignOutAlt size={50} />
                    <span>회원 탈퇴</span>
                </div>
        </div>
    );
}

export default Myinfo;
import React, { useEffect, useState } from "react";
import { getDateTime, getMyInfo, getProdFlag, getUserDB, getUserReviewDB, modNickDuplicateCheck, nickNameDuplicateCheck, setMyInfo, setUserDB, setUserReviewDB, userIdCheck, userNameCheck, userNickNameCheck, userPwCheck } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { getLoginedSessionId, setLoginedSessionId } from "../utils/session";

const Modify = ({setIsLogined}) => {

    //hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uNick, setUNick] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uMail, setUMail] = useState('');
    const navigate = useNavigate();

    const [isPwCheck, setIsPwCheck] = useState(true);        // 비밀번호 검증을 체크하는 State  
    const [isNickNameCheck, setIsNickNameCheck] = useState(true);  // 닉네임 검증을 체크하는 State

    useEffect(() => {
        // MT DB GET
        if(!getProdFlag()) console.log('[Modify] useEffect()');

        let myInfo = getMyInfo(getLoginedSessionId());
        if (myInfo === undefined) {
            alert('로그인이 필요한 서비스입니다.')
            navigate('/signin');
            return;
        }

        setUId(myInfo.uId);
        setUPw(myInfo.uPw);
        setUNick(myInfo.uNick);
        setUPhone(myInfo.uPhone);
        setUMail(myInfo.uMail);
    }, [])

    const uIdChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uIdChangeHandler()');

        setUId(e.target.value);

    }

    const uPwChaneHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uPwChaneHandler()');

        setUPw(e.target.value);

        let regPwCheck = userPwCheck(e.target.value);
        if (regPwCheck) {
            setIsPwCheck(true);        
        } else {
            setIsPwCheck(false);
        }

    }
    const uNickChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uNickChangeHandler()');

        setUNick(e.target.value);

        let regNickNameCheck = userNickNameCheck(e.target.value);
        if (regNickNameCheck) {
            setIsNickNameCheck(true);
        } else {
            setIsNickNameCheck(false);
        }

    }

    const uPhoneChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uPhoneChangeHandler()');

        setUPhone(e.target.value);
    }

    const uMailChangeHandler = (e) => {
        if(!getProdFlag()) console.log('[Modify] uMailChangeHandler()');

        setUMail(e.target.value);

    }

    const modifyBtnHandler = ()  => {
        if(!getProdFlag()) console.log('[Modify] modifyBtnHandler()');

        if (!isPwCheck || !isNickNameCheck) {
            alert('입력 정보를 확인해주세요');
            return;
        }

        let myInfo = getMyInfo(getLoginedSessionId());
        myInfo.uPw = uPw;
        myInfo.uNick = uNick;
        myInfo.uPhone = uPhone;
        myInfo.uMail = uMail;
        myInfo.uModDate = getDateTime();
        
        setMyInfo(getLoginedSessionId(), myInfo);


        alert('정보 수정이 완료되었습니다.');
        navigate('/');

    }

    const deleteBtnHandler = () => {
        if(!getProdFlag()) console.log('[Modify] deleteBtnHandler()');

        if (window.confirm('정말로 회원탈퇴를 하시겠습니까?')) {
            
            //DELETE USER INFO
            let allUserInfo = getUserDB();

            delete allUserInfo[getLoginedSessionId()].uPw;
            delete allUserInfo[getLoginedSessionId()].uPhone;
            delete allUserInfo[getLoginedSessionId()].uMail;
            delete allUserInfo[getLoginedSessionId()].uModDate;

            setUserDB(allUserInfo);

            let allUserRiview = getUserReviewDB();

            delete allUserRiview[getLoginedSessionId()];

            setUserReviewDB(allUserRiview);

            alert('회원탈퇴가 완료되었습니다.');

            setLoginedSessionId();
            setIsLogined(false);
            navigate('/');

            } else { 
                alert("회원 탈퇴 요청이 취소되었습니다.");
            }

        } 


    return(
        <div id="modify_wrap">
            <div className="modify">
                <input id="input_id" name="UserId" type="text" value={uId} readOnly onChange={uIdChangeHandler}/>
                <input className="basic_input" name="UserPw" type="password" value={uPw} onChange={uPwChaneHandler} placeholder="변경할 비밀번호를 입력해주세요"/>
                {
                    isPwCheck
                    ?
                    <p>비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</p>
                    :
                    <p style={{color: '#ff0000'}}>비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</p>
                }
                <br />
                <input className="basic_input" name="UserNickname" type="text" value={uNick} onChange={uNickChangeHandler}/>
                {
                    isNickNameCheck
                    ?
                    null
                    :    
                    <p style={{color: '#ff0000'}}>변경할 닉네임을 입력해주세요. (한글, 영어, 숫자 조합 3~16자)</p>
                }
                <input className="basic_input" name="UserPhone" type="text" value={uPhone} onChange={uPhoneChangeHandler} placeholder="변경할 휴대폰번호" />
                <br />
                <input className="basic_input" type="email" name="UserEmail" value={uMail} onChange={uMailChangeHandler} placeholder="변경할 이메일 주소" />
                <br />
                <input className="basic_btn" type="button" onClick={modifyBtnHandler} value="정보수정" />
                <input className="basic_btn" type="button" onClick={deleteBtnHandler} value="회원탈퇴" />
            </div>
        </div>
    );
}

export default Modify;
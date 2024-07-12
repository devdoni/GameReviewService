import React, { useEffect, useState } from "react";
import '../css/signup.css';
import { Link, useNavigate } from "react-router-dom";
import { getDateTime, getUserDB, getUserReviewDB, IdDuplicateCheck, setUserDB, setUserReviewDB, userIdCheck, userNameCheck, userNickNameCheck, userPwCheck } from "../utils/utils";
import Menubar from "../Menubar";
const SignUp = () => {

    //hook 
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uName, setUName] = useState('');
    const [uNick, setUNick] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uMail, setUMail] = useState('');

    const [isIdCheck, setIsIdCheck] = useState(false);        // 아이디 검증을 체크하는 State
    const [isPwCheck, setIsPwCheck] = useState(false);        // 비밀번호 검증을 체크하는 State  
    const [isNameCheck, setIsNameCheck] = useState(false);    // 이름 검증을 체크하는 State  
    const [isNickNameCheck, setIsNickNameCheck] = useState(false);  // 닉네임 검증을 체크하는 State
    const [isIdDuplicateCheck, setIsIdDuplicateCheck] = useState(false);    // 아이디 중복체크 State


    const navgigate = useNavigate();

    useEffect(() => {
        console.log('[SIGNUP] useEffect()');
    },[])

    //Handler
    const uIdChangeHandler = (e) => {
        console.log('[SIGNUP] uIdChangeHandler');

        setUId(e.target.value);

        let regIdCheck = userIdCheck(e.target.value);
        if (regIdCheck) {
            setIsIdCheck(true);        
        } else {
            setIsIdCheck(false);
        }

    }

    const uPwChaneHandler = (e) => {
        console.log('[SignUp] uPwChaneHandler');

        setUPw(e.target.value);
        let regPwCheck = userPwCheck(e.target.value);
        if (regPwCheck) {
            setIsPwCheck(true);        
        } else {
            setIsPwCheck(false);
        }
    }


    const uNameChangeHandler = (e) => {
        console.log('[SignUp] uNameChangeHandler');

        setUName(e.target.value);
        let regNameCheck = userNameCheck(e.target.value);
        if (regNameCheck) {
            setIsNameCheck(true);
        } else {
            setIsNameCheck(false);
        }

    }

    const uNickChangeHandler = (e) => {
        console.log('[SignUp] uNickChangeHandler');

        setUNick(e.target.value);
        let regNickNameCheck = userNickNameCheck(e.target.value);
        if (regNickNameCheck) {
            setIsNickNameCheck(true);
        } else {
            setIsNickNameCheck(false);
        }
    }

    const uPhoneChangeHandler = (e) => {
        console.log('[SignUp] uPhoneChangeHandler');

        setUPhone(e.target.value);
    }

    const uMailChangeHandler = (e) => {
        console.log('[SignUp] uMailChangeHandler');

        setUMail(e.target.value);

    }

    const SignUpBtnHandler = () => {
        console.log('[Signup] SignUpBtnHandler');
        
        if (!isIdDuplicateCheck) {
            alert('아이디 중복체크를 해주세요.');
            return;
        }

        if (uPw === '' || uName === ''|| uNick === '') {
            alert('필수 정보를 입력해주세요.');
            return;
        }

        if (!isIdCheck || !isPwCheck || !isNameCheck || !isNickNameCheck) {
            alert('입력 정보를 확인해주세요.');
            return;
        }
        // USER DB 
        let UserDB = getUserDB();
        if (UserDB === null) {
                // DB에 회원정보 하나도 없는 경우
            let newUserObj = {
                [uId] : {
                    'uId': uId,
                    'uPw': uPw,
                    'uName': uName,
                    'uNick': uNick,
                    'uPhone': uPhone,
                    'uMail': uMail,
                    'uRegDate': getDateTime(),
                    'uModDate': getDateTime(),
                }
            }
            setUserDB(newUserObj);

          } else {
            // DB에 회원정보가 하나라도 있는 경우
            let userObj = UserDB;
            userObj[uId] = {
                'uId': uId,
                'uPw': uPw,
                'uName': uName,
                'uNick': uNick,
                'uPhone': uPhone,
                'uMail': uMail,
                'uRegDate': getDateTime(),
                'uModDate': getDateTime(),
            }
            setUserDB(userObj);

          }
        // REVIEW DB
          let userReviewSvcDB = getUserReviewDB();
          if (userReviewSvcDB === null) {
            let newUserReviews = {
                [uId]: {

                }
            }
            setUserReviewDB(newUserReviews);

          } else {
            let userReviews = getUserReviewDB();
            userReviews[uId] = {}

            setUserReviewDB(userReviews);
          }
          alert('회원가입에 성공했습니다.');

          navgigate('/signin');

        }

        const idDuplicateCheckBtn = () => {
            console.log('[Signup] idDuplicateCheckBtn()')
            let idCheck = IdDuplicateCheck(uId);

            if(isIdDuplicateCheck) {
                alert('이미 중복체크가 완료되었습니다.');
                return;
            }

            if(!isIdCheck) {
                alert('아이디는 5~20자의 영어 소문자와 숫자 조합만 사용 가능합니다. ')
                return;
            }

            if(idCheck) {
                console.log('idCheck ===>', idCheck)
                setIsIdDuplicateCheck(false);
                alert('중복된 아이디입니다.');

            } else {
                let result = window.confirm('가입 가능한 아이디입니다, 사용하시겠습니까?');
                if (result)
                {
                    setIsIdDuplicateCheck(true);
                    document.getElementById('input_id').readOnly = true; 
                   
                } else {
                    setIsIdDuplicateCheck(false);
                }

            }

        }


    

    return (
        <div id="signup_wrap">
            <div className="signup">
                <input id="input_id" name="UserId" type="text" onChange={uIdChangeHandler} placeholder="[필수] 아이디" />
                <input className="basic_btn" type="button" onClick={idDuplicateCheckBtn} value="중복체크" />
                {
                    isIdCheck
                    ?
                    <p>5~20자의 영어 소문자와 숫자 조합만 사용 가능합니다.</p>
                    :
                    <p style={{color: '#ff0000'}}>5~20자의 영어 소문자와 숫자 조합만 사용가능합니다.</p>
                }
                {
                    isIdDuplicateCheck
                    ?
                    null
                    :
                    <p style={{color: '#ff0000'}}>아이디 중복체크를 해주세요.</p>
                }
                <input class="basic_input" name="UserPw" type="password" onChange={uPwChaneHandler} placeholder="[필수] 비밀번호"/>
                {
                    isPwCheck
                    ?
                    <p>하나 이상의 특수문자와 영 대소문자와 숫자 조합을 사용해주세요. (8~16자)</p>
                    :
                    <p style={{color: '#ff0000'}}>하나 이상의 특수문자와 영 대소문자와 숫자 조합을 사용해주세요. (8~16자)</p>
                }
                <input className="basic_input" name="UserName" type="text" onChange={uNameChangeHandler} placeholder="[필수] 이름"/>
                {
                    isNameCheck
                    ?
                    <p>&nbsp</p>
                    :    
                    <p style={{color: '#ff0000'}}>이름을 입력해주세요.</p>
                }
                <input className="basic_input" name="UserNickname" type="text" onChange={uNickChangeHandler} placeholder="[필수] 닉네임" />
                {
                    isNickNameCheck
                    ?
                    <p> </p>
                    :    
                    <p style={{color: '#ff0000'}}>닉네임을 입력해주세요. (한글, 영어, 숫자 조합 3~16자)</p>
                }
                <input className="basic_input" name="UserPhone" type="text" onChange={uPhoneChangeHandler} placeholder="[선택] 휴대전화 번호 010-0000-0000" />
                <br />
                <input className="basic_input" type="email" name="UserEmail" onChange={uMailChangeHandler} placeholder="[선택] 이메일 주소" />
                <br />
                <input className="basic_btn" type="button" onClick={SignUpBtnHandler} value="회원가입" />
                <Link to={'/'}><input class="basic_btn" type="button" value="돌아가기" /></Link>
            </div>
        </div>
    );
}


export default SignUp;
import React, { useEffect, useState } from "react";
import '../css/review.css';
import { FaStar } from 'react-icons/fa';
import { getDateTime, getMyInfo, getMyReviewDB, getProdFlag, setMyReviewDB } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";


const ReviewWrite = ({gameName , setWriteFlag}) => {
    // 별의 Index
    const ARRAY = [0, 1, 2, 3, 4];

    // Hook
    const [score, setScore] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [reviewComment, setReviewComment] = useState('');
    const [currentNick, setCurrentNick] = useState('');

    useEffect(()=> {
        console.log('[ReviewWrite] useEffect()');
        if (getLoginedSessionId() === '') {
            return;
        }
        let myInfo = getMyInfo(getLoginedSessionId());
        setCurrentNick(myInfo.uNick);
        console.log('currentNick ==>', currentNick);
    }, []);

    const starScore = index => {
        const newScore = index + 1; //클릭한 별의 인덱스에 1을 더한 값을 점수로 설정
        setScore(newScore);
    };

    const reviewCommentHandler = (e) => {
        if(!getProdFlag()) console.log('[ReviewWrite] reviewCommentHandler()', e.target.value);
        setReviewComment(e.target.value);
    }

    const submitClickHandler = () => {
        if(!getProdFlag()) console.log('[ReviewWrite] submitClickHandler()');

        if (getLoginedSessionId() === '') {
            alert('로그인이 필요한 서비스입니다.');
            setReviewComment('');
            setScore(0);
            return;
        }

        if (reviewComment === '' || score === 0) {
            alert('별점 또는 리뷰 내용을 입력해주세요.');
            return;
        }

        let reviewDB = getMyReviewDB(getLoginedSessionId());
        console.log(reviewDB);

        if (reviewDB.hasOwnProperty(gameName)) {
            alert('해당 게임에 이미 리뷰를 작성하셨습니다\n수정 하거나 삭제 후 진행해주세요.');
            return;
        }
        reviewDB[gameName] = {
            "nick": currentNick,
            "star": score,
            "review": reviewComment,
            "regDate": getDateTime(),
            "modDate": getDateTime()
        }
        setMyReviewDB(getLoginedSessionId(), reviewDB);

        alert("작성이 완료되었습니다.");
        setWriteFlag((prev) => !prev);
        setReviewComment('');
        setScore(0); //초기값으로 되돌림
    }

    return (
        <div id="detail_wrap">
            <div className="container">
                <h2>해당 게임에 대한 리뷰 작성</h2>
                <form id="ratingForm">
                    <div className="form-content">
                        <textarea id="review" className="review-box" value={reviewComment} onChange={reviewCommentHandler} placeholder="리뷰를 작성해주세요."></textarea>
                    </div>
                    <div className="options">
                        <div className="recommendation">
                            <label>별점을 선택해주세요</label>
                            {ARRAY.map((el, index) => (
                                <FaStar
                                    key={index}
                                    size="25"
                                    color={
                                        hoverIndex >= index || score > index
                                            ? "#ffc107"
                                            : "#e4e5e9"
                                    }
                                    onClick={() => starScore(index)}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(-1)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                    </div>
                    <input type="button" className="submit-btn" value="리뷰 작성" onClick={submitClickHandler}/>
                </form>
            </div>
        </div>
    );
};
export default ReviewWrite;
import React, { useState } from "react";
import { getDateTime, getMyReviewDB, setMyReviewDB } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { useNavigate } from "react-router-dom";
import '../css/detail.css';

const ReviewWrite = () => {

    // Hook
    const [reviewComment, setReviewComment] = useState('');
    const [Score, setScore] = useState('');
    const [currentNick, setCurrentNick] = useState('');

    const nav = useNavigate();

    // Handler

    const reviewCommentWriteChangeHandler = (e) => {
        console.log('[Detail] reviewWriteboxChangeHandler()');
        setReviewComment(e.target.value); 

    }

    const subBtnClickHandler = () => {
        console.log('[Detail] subBtnClickHandler()');

        if (getLoginedSessionId() === '') {
            alert('로그인이 필요한 서비스입니다.');
            nav('/signin');
            return;
        }

        if (reviewComment === '' || Score === '') {
            alert('별점 또는 리뷰 내용을 입력해주세요.');
            return;
        }
        let reviewDB = getMyReviewDB(getLoginedSessionId());
        reviewDB[getDateTime()] = {
            "nick": currentNick,
            "star": Score,
            "review": reviewComment,
            "regDate": getDateTime(),
            "modDate": getDateTime()
        }    
        setMyReviewDB(getLoginedSessionId(),reviewDB);

        alert("작성이 완료되었습니다.");
        
        setReviewComment('');
    }

    const reviewStarClickHandler_five = (e) => {

        setScore(e.target.value);
    }
    const reviewStarClickHandler_four = (e) => {

        setScore(e.target.value);
    }
    const reviewStarClickHandler_three = (e) => {

        setScore(e.target.value);
    }
    const reviewStarClickHandler_two = (e) => {

        setScore(e.target.value);
    }
    const reviewStarClickHandler_one = (e) => {

        setScore(e.target.value);
    }
    return (
        <div id="detail_wrap">
        <div className="container">
            <h2>리뷰를 작성해주세요</h2>
            <form id="ratingForm">
        <div className="rating">
            <input type="radio" id="star5" name="rating" value="★★★★★" onClick={reviewStarClickHandler_five}/>
            <label for="star5"></label>
            <input type="radio" id="star4" name="rating" value="★★★★" onClick={reviewStarClickHandler_four}/>
            <label for="star4"></label>
            <input type="radio" id="star3" name="rating" value="★★★" onClick={reviewStarClickHandler_three}/>
            <label for="star3"></label>
            <input type="radio" id="star2" name="rating" value="★★" onClick={reviewStarClickHandler_two}/>
            <label for="star2"></label>
            <input type="radio" id="star1" name="rating" value="★" onClick={reviewStarClickHandler_one}/>
            <label for="star1"></label>
        </div>
            <input type="text" id="review" class="review-box" value={reviewComment} onChange={reviewCommentWriteChangeHandler} placeholder="리뷰를 작성해주세요." />
                <input type="button" className="submit-btn" value="제출하기" onClick={subBtnClickHandler}/>
            </form>
        </div>
    </div>
    )
}

export default ReviewWrite;
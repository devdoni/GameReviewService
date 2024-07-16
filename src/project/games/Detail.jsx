import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
import { getLoginedSessionId } from "../utils/session";
import { getDateTime, getMyInfo, getMyReviewDB, getUserReviewDB, setMyReviewDB, setUserReviewDB } from "../utils/utils";
const Detail = () => {

    const { no } = useParams();

    const [reviewWrite, setReviewWrite] = useState('');
    const [writeFlag, setWriteFlag] = useState(false);
    const [star, setStar] = useState('');
    const [reviews, setReviews] = useState([]);
    const [currentNick, setCurrentNick] = useState('');

    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let myReview = await getMyReviewDB(getLoginedSessionId());
                let myReviewArr = Object.values(myReview);
                setReviews(myReviewArr.reverse());

                let myInfo = await getMyInfo(getLoginedSessionId());
                let currentNick = myInfo.uNick;
                setCurrentNick(currentNick);
                setWriteFlag(false);
            } catch (error) {
                console.error('Failed to fetch user review:', error);
            }
        };
    
        fetchData();
    }, [writeFlag]);

    const reviewWriteboxChangeHandler = (e) => {
        console.log('[Detail] reviewWriteboxChangeHandler()');
        setReviewWrite(e.target.value); 

    }

    const subBtnClickHandler = () => {
        console.log('[Detail] subBtnClickHandler()');
        console.log('star ==>', star);
        console.log('review ==>', reviewWrite);

        if (getLoginedSessionId() === '') {
            alert('로그인이 필요한 서비스입니다.');
            nav('/signin');
            return;
        }

        if (reviewWrite === '' || star === '') {
            alert('별점 또는 리뷰 내용을 입력해주세요.');
            return;
        }
        let reviewDB = getMyReviewDB(getLoginedSessionId());
        reviewDB[getDateTime()] = {
            "nick": currentNick,
            "star": star,
            "review": reviewWrite,
            "regDate": getDateTime(),
            "modDate": getDateTime()
        }    
        setMyReviewDB(getLoginedSessionId(),reviewDB);

        alert("작성이 완료되었습니다.");
        setWriteFlag(true);
        
        setReviewWrite('');
    }



    const reviewStarClickHandler_five = (e) => {

        setStar(e.target.value);
    }
    const reviewStarClickHandler_four = (e) => {

        setStar(e.target.value);
    }
    const reviewStarClickHandler_three = (e) => {

        setStar(e.target.value);
    }
    const reviewStarClickHandler_two = (e) => {

        setStar(e.target.value);
    }
    const reviewStarClickHandler_one = (e) => {

        setStar(e.target.value);
    }


    return(
        <>
        <div>
            Detail
            <br />
            {no}
        </div>

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
            <input type="text" id="review" class="review-box" value={reviewWrite} onChange={reviewWriteboxChangeHandler} placeholder="리뷰를 작성해주세요..." />
                <input type="button" className="submit-btn" value="제출하기" onClick={subBtnClickHandler}/>
                </form>
        </div>
    </div>

    <div className="review_wrap">
    {reviews.map((review, idx) => (
        <ul>
        <li key={idx}>
            {review.star}
        </li>
        <li>
            {review.regDate}
        </li>
        <li>
            {review.nick} {review.review}
        </li>
        </ul>
    ))}
    </div>

    
    </>
    );
}

export default Detail;
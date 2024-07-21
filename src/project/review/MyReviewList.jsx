import React, { useEffect, useState } from "react";
import { getMyInfo, getMyReviewDB, getProdFlag } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { Link, useNavigate } from "react-router-dom";
import '../css/myreview.css';
const  MyReviewList = () => {
    // Hook
    const navigate = useNavigate();
    const [myReview, setMyReview] = useState([]);
    const [currentNick, setCurrentNick] = useState('');

    useEffect(() => {
        if (!getProdFlag()) {
            console.log('[Myinfo] useEffect()');
        }
        if (getLoginedSessionId() === '') {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/signin');
            return;
        } else {
            setData();
            let myInfo = getMyInfo(getLoginedSessionId());
            setCurrentNick(myInfo.uNick);
        }
    }, []);

    const setData = () => {

            const sessionId = getLoginedSessionId();
            const myReviews = getMyReviewDB(sessionId);

            console.log('Fetched myReviews:', myReviews); // 데이터가 제대로 들어오는지 확인

            if (!myReviews) {
                setMyReview([]);
                return;
            }

            // 객체의 값을 배열로 변환
            const reviewArray = Object.keys(myReviews).map(key => ({
                ...myReviews[key],
                no: key
            }));

            setMyReview(reviewArray);
        };

        return (
            <div id="myreview_wrap">
                <div className="myreview_title">
                    <span>{currentNick}&nbsp;님의 리뷰 목록</span>
                </div>
                {myReview.map((review, index) => (
                    <div key={index} className="review_content">
                        <div className="game_image">
                            <img src={review.img_src} alt="게임 이미지" />
                        </div>
                        <div className="game_name">
                            <h3>{review.gameName}</h3>
                        </div>
                        <div className="review_details">
                            <p>내가 작성한 리뷰: {review.review}</p>
                            <p>내가 준 별점: {review.star}</p>
                            <p>작성한 시간: {review.regDate}</p>
                        </div>
                        <div className="detail_page">
                            <Link to={`/detail/${review.no}`}>상세 페이지</Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };




export default MyReviewList;
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../css/review.css'
import { getUserReviewDB } from '../utils/utils';




const ReviewList = ({ gameName, writeFlag }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        console.log('[ReviewList] useEffect()');
        setData(); 
    },[writeFlag, gameName]);
    


    const setData = () => {
        const userReviewDB = getUserReviewDB();

        if (!userReviewDB) {
            // 데이터베이스가 없는 경우 처리
            setReviews([]);
            return;
        }

        const allReviews = [];

        for (const user in userReviewDB) {
            if (userReviewDB.hasOwnProperty(user)) {
                const userData = userReviewDB[user];

                if (userData.hasOwnProperty(gameName)) {
                    const reviewData = userData[gameName];
                    allReviews.push({
                        user: user,
                        gameName: gameName,
                        nick: reviewData.nick,
                        star: reviewData.star,
                        review: reviewData.review,
                        regDate: reviewData.regDate
                    });
                }
            }
        }

        setReviews(allReviews);
    };
    return (
        <div id="review_list">
            {reviews.length === 0 ? (
                <div className="no-reviews">리뷰가 없습니다.</div>
            ) : (
                reviews.map((review, idx) => (
                    <div key={idx} className="review_item">
                        <div className="review_header">
                            <div className="nickname">{review.nick}</div>
                            <div className="rating">별점: {review.star}</div>
                        </div>
                        <div className="review_text">
                            <p>{review.review}</p>
                            <p className="reg-date">작성일시: {review.regDate}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewList;

import React, { useEffect, useState } from 'react';
import '../css/review.css'
import { getProdFlag, getUserReviewDB, getMyReviewDB, setMyReviewDB, getDateTime } from '../utils/utils';
import { getLoginedSessionId } from '../utils/session';
import StarRating from './StarRating';


const ReviewList = ({ gameName, writeFlag}) => {
    const [reviews, setReviews] = useState([]);
    const [modifying, setModifying] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [editingReview, setEditingReview] = useState(null); 
    const [modalIsOpen, setModalIsOpen] = useState(false); 

    useEffect(() => {
        console.log('[ReviewList] useEffect()');
        setData();
        const sessionId = getLoginedSessionId();
        if (sessionId) {
            setLoggedInUserId(sessionId);
        }
    }, [writeFlag, gameName, modifying]);

    const setData = () => {
        const userReviewDB = getUserReviewDB();

        if (!userReviewDB) {
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

    const editBtnClickHandler = (review) => {
        console.log('[ReviewList] editBtnClickHandler()');
        setEditingReview({ ...review }); 
        setModalIsOpen(true); 
    };

    const saveEditHandler = () => {
        if (!editingReview) return;

        const updateReviewDB = getMyReviewDB(loggedInUserId);
        updateReviewDB[gameName] = {
            ...updateReviewDB[gameName],
            review: editingReview.review,
            star: editingReview.star, 
            regDate: getDateTime() 
        };

        setMyReviewDB(loggedInUserId, updateReviewDB);
        setEditingReview(null); 
        setModalIsOpen(false); 
        setModifying((prev) => !prev);
    };

    const cancelEditHandler = () => {
        setEditingReview(null); 
        setModalIsOpen(false); 
    };

    const deleteBtnClickHandler = () => {
        console.log('[ReviewList] deleteBtnClickHandler()');
        const reviewDelete = window.confirm("삭제하시겠습니까?");
        if (reviewDelete) {
            if (!getProdFlag()) console.log("참입니다");
            let deleteMyReviewDB = getMyReviewDB(getLoginedSessionId());

            delete deleteMyReviewDB[`${gameName}`];

            setMyReviewDB(getLoginedSessionId(), deleteMyReviewDB);

            setModifying((prev) => !prev);

        } else {
            if (!getProdFlag()) console.log("거짓입니다");
        }
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
                        <div className='review_text'>
                            <p>{review.review}</p>
                            <p className="reg-date">작성일시: {review.regDate}</p>
                        </div>
                        {loggedInUserId === review.user && (
                            <div className="review_actions">
                                <button className="edit-button" onClick={() => editBtnClickHandler(review)}>수정</button>
                                <button className="delete-button" onClick={deleteBtnClickHandler}>삭제</button>
                            </div>
                        )}
                    </div>
                ))
            )}

            {modalIsOpen && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <span className="close" onClick={cancelEditHandler}>&times;</span>
                        <h2>리뷰 수정</h2>
                        <textarea
                            className='editbox'
                            value={editingReview.review}
                            onChange={(e) =>
                                setEditingReview({
                                    ...editingReview,
                                    review: e.target.value
                                })
                            }
                        />
                        <StarRating
                            rating={editingReview.star}
                            setRating={(rating) => setEditingReview({
                                ...editingReview,
                                star: rating
                            })}
                        />
                        <button className='save-button' onClick={saveEditHandler}>저장</button>
                        <button className='cancel-button' onClick={cancelEditHandler}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewList;
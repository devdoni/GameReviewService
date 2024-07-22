import React, { useEffect, useState } from 'react';
import '../css/review.css'
import { getProdFlag, getUserReviewDB, getMyReviewDB, setMyReviewDB, getDateTime } from '../utils/utils';
import { getLoginedSessionId } from '../utils/session';
import StarRating from './StarRating';
import { FaStar } from 'react-icons/fa';
import reviewData from '../db/reviewDB.js'


const ReviewList = ({ gameName, writeFlag, no}) => {
    const [reviews, setReviews] = useState([]);
    const [modifying, setModifying] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('dateDesc'); // 기본 정렬은 최신 작성순

    const getUserReviewDB = () => reviewData;

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

                if (userData.hasOwnProperty(no)) {
                    const reviewData = userData[no];
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

        // 기본 정렬 (최신 작성순)
        allReviews.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));

        setReviews(allReviews);
    };

    useEffect(() => {
        console.log(reviews);
    }, [reviews]);

    useEffect(() => {
        console.log(editingReview);
    }, [editingReview]);

    const editBtnClickHandler = (review) => {
        console.log('[ReviewList] editBtnClickHandler()');
        setEditingReview({ ...review });
        setModalIsOpen(true);
    };

    const saveEditHandler = () => {
        if (!editingReview) return;

        const updateReviewDB = getMyReviewDB(loggedInUserId);
        updateReviewDB[no] = {
            ...updateReviewDB[no],
            review: editingReview.review,
            star: editingReview.star,
            regDate: getDateTime()
        };
        alert('리뷰 수정이 완료되었습니다');
        setMyReviewDB(loggedInUserId, updateReviewDB);
        setEditingReview(null);
        setModalIsOpen(false);
        setModifying((prev) => !prev);
    };

    const cancelEditHandler = () => {
        alert('수정 요청이 취소되었습니다');
        setEditingReview(null);
        setModalIsOpen(false);
    };

    const deleteBtnClickHandler = (reviewNo) => {
        console.log('[ReviewList] deleteBtnClickHandler()');
        const reviewDelete = window.confirm("삭제하시겠습니까?");
        if (reviewDelete) {
            if (!getProdFlag()) console.log("참입니다");
            let deleteMyReviewDB = getMyReviewDB(getLoginedSessionId());

            delete deleteMyReviewDB[`${reviewNo}`];

            alert('리뷰 삭제가 완료되었습니다');
            setMyReviewDB(getLoginedSessionId(), deleteMyReviewDB);

            setModifying((prev) => !prev);
        } else {
            if (!getProdFlag()) console.log("거짓입니다");
            alert('삭제 요청이 취소되었습니다');
        }
    };

    // 정렬을 담당하는 Handler
    const handleSort = (e) => {
        const order = e.target.value;
        setSortOrder(order);

        let sortedReviews = [...reviews];
        if (order === 'ratingAsc') {
            sortedReviews.sort((a, b) => a.star - b.star);
        } else if (order === 'ratingDesc') {
            sortedReviews.sort((a, b) => b.star - a.star);
        } else if (order === 'dateAsc') {
            sortedReviews.sort((a, b) => new Date(a.regDate) - new Date(b.regDate));
        } else {
            sortedReviews.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
        }
        setReviews(sortedReviews);
    };

    return (
        <div id="review_list">
            <div className="sort_buttons">
                <select onChange={handleSort} value={sortOrder}>
                    <option value="dateDesc">최근 작성 기준 정렬</option>
                    <option value="dateAsc">과거 작성 기준 정렬</option>
                    <option value="ratingDesc">별점 높은순 정렬</option>
                    <option value="ratingAsc">별점 낮은순 정렬</option>
                </select>
            </div>
            {reviews.length === 0 ? (
                <div className="no-reviews">리뷰가 없습니다.</div>
            ) : (
                reviews.map((review, idx) => (
                    <div key={idx} className="review_item">
                        <div className="review_header">
                            <div className="nickname">{review.nick}</div>
                            <div className="rating">
                                {Array.from({ length: review.star }, (_, i) => (
                                    <FaStar key={i} size={20} color="#ffc107" />
                                ))}
                            </div>
                        </div>
                        <div className='review_text'>
                            <p>{review.review}</p>
                            <p className="reg-date">작성일: {review.regDate}</p>
                        </div>
                        {loggedInUserId === review.user && (
                            <div className="review_actions">
                                <button className="edit-button" onClick={() => editBtnClickHandler(review)}>수정</button>
                                <button className="delete-button" onClick={() => deleteBtnClickHandler(review.no)}>삭제</button>
                            </div>
                        )}
                    </div>
                ))
            )}

            {modalIsOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={cancelEditHandler}>&times;</span>
                        <h2>리뷰 수정</h2>
                        <textarea
                            className="editbox"
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
                            size={20} // 별 크기를 줄임
                        />
                        <div className="button-group">
                            <button className="save-button" onClick={saveEditHandler}>저장</button>
                            <button className="cancel-button" onClick={cancelEditHandler}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewList;
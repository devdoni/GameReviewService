import React, { useEffect, useState } from 'react';
import '../css/review.css'
import { getProdFlag, getUserReviewDB, getMyReviewDB, setMyReviewDB, getDateTime } from '../utils/utils';
import { getLoginedSessionId } from '../utils/session';
import StarRating from './StarRating';
import { FaStar } from 'react-icons/fa';
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import reviewData from '../db/reviewDB';

const ReviewList = ({ gameName, writeFlag, no,langFileName}) => {
    const [reviews, setReviews] = useState([]);
    const [modifying, setModifying] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('dateDesc'); // 기본 정렬은 최신 작성순

    const getUserReviewDB = () => reviewData;

    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }

    useEffect(() => {
        if (langFileName === 'kor') {
            setLang(languageData.kor);

        } else if (langFileName === 'eng') {
            setLang(languageData.eng);

        } else if (langFileName === 'chi') {
            setLang(languageData.chi);

        } else {    
            setLang(languageData.kor);

        }

        console.log('[ReviewList] useEffect()');
        setData();
        const sessionId = getLoginedSessionId();
        if (sessionId) {
            setLoggedInUserId(sessionId);
        }
    }, [writeFlag, gameName, modifying,langFileName]);
    

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
        alert(lang.reviewModified);
        setMyReviewDB(loggedInUserId, updateReviewDB);
        setEditingReview(null);
        setModalIsOpen(false);
        setModifying((prev) => !prev);
    };

    const cancelEditHandler = () => {
        alert(lang.cancelModify);
        setEditingReview(null); 
        setModalIsOpen(false); 
    };

    const deleteBtnClickHandler = (reviewNo) => {
        console.log('[ReviewList] deleteBtnClickHandler()');
        const reviewDelete = window.confirm(lang.wantDelete);
        if (reviewDelete) {
            if (!getProdFlag()) console.log("참입니다");
            let deleteMyReviewDB = getMyReviewDB(getLoginedSessionId());

            delete deleteMyReviewDB[`${reviewNo}`];

            alert(lang.alreadyDeleted);
            setMyReviewDB(getLoginedSessionId(), deleteMyReviewDB);

            setModifying((prev) => !prev);
        } else {
            if (!getProdFlag()) console.log("거짓입니다");
            alert(lang.cancelDelete);
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
                <div className="no-reviews">{lang.noReviewsAvailable}</div>
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
                            <p className="reg-date">{lang.writtenDay}{review.regDate}</p>
                        </div>
                        {loggedInUserId === review.user && (
                            <div className="review_actions">
                                <button className="edit-button" onClick={() => editBtnClickHandler(review)}>{lang.modify}</button>
                                <button className="delete-button" onClick={() => deleteBtnClickHandler(review)}>{lang.delete}</button>
                            </div>
                        )}
                    </div>
                ))
            )}

            {modalIsOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={cancelEditHandler}>&times;</span>
                        <h2>{lang.modifyReview}</h2>
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
                            <button className="save-button" onClick={saveEditHandler}>{lang.save}</button>
                            <button className="cancel-button" onClick={cancelEditHandler}>{lang.cancel}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewList;
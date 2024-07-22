import React, { useEffect, useState } from "react";
import { getDateTime, getMyInfo, getMyReviewDB, getProdFlag, setMyReviewDB } from "../utils/utils";
import { getLoginedSessionId } from "../utils/session";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import styles from '../css/myreview.module.css';
import StarRating from "./StarRating";
import txt_kor from '../db/txt_kor.json';
import txt_eng from '../db/txt_eng.json';
import txt_chi from '../db/txt_chi.json';
import { motion } from 'framer-motion';

const  MyReviewList = (langFileName) => {

    const [lang, setLang] = useState(txt_kor);

    const languageData = {
        kor: txt_kor,
        eng: txt_eng,
        chi: txt_chi,
    }
    // Hook
    const navigate = useNavigate();
    const [fixFlag, setFixFlag] = useState(false);
    const [myReview, setMyReview] = useState([]);
    const [editingReview, setEditingReview] = useState(null); 
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [currentNick, setCurrentNick] = useState('');
    const [sortOrder, setSortOrder] = useState('dateDesc'); // 기본 정렬은 최신 작성순

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

        if (!getProdFlag()) {
            console.log('[Myinfo] useEffect()');
        }
        if (getLoginedSessionId() === '') {
            alert(lang.thisServiceRequiresLogin);
            navigate('/signin');
            return;
        } else {
            setData();
            let myInfo = getMyInfo(getLoginedSessionId());
            setCurrentNick(myInfo.uNick);
        }
    }, [fixFlag,langFileName]);

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

        // 기본 정렬 (최신 작성순)
        reviewArray.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));

        setMyReview(reviewArray);
    };

    // Handler 
    const deleteBtnClickHandler = (no) => {
        console.log('[MyReviewList] deleteBtnClickHandler()');
        const reviewDelete = window.confirm(lang.wantDelete);
        if (reviewDelete) {
            if (!getProdFlag()) console.log("참입니다");
            let deleteMyReviewDB = getMyReviewDB(getLoginedSessionId());

            delete deleteMyReviewDB[`${no}`];

            alert(lang.wantDelete);
            setMyReviewDB(getLoginedSessionId(), deleteMyReviewDB);

            setFixFlag((prev) => !prev);

        } else {
            if (!getProdFlag()) console.log("거짓입니다");
            alert(lang.cancelDelete);
        }
    };

    const editBtnClickHandler = (review) => {
        console.log('[MyReviewList] editBtnClickHandler()');
        setEditingReview({ ...review }); 
        setModalIsOpen(true); 
    };
    const saveEditHandler = (no) => {
        if (!editingReview) return;
        const loggedInUserId = getLoginedSessionId();
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
        setFixFlag((prev) => !prev);
    };

    const cancelEditHandler = () => {
        alert(lang.cancelModify);
        setEditingReview(null); 
        setModalIsOpen(false); 
        
    };

    // 정렬을 담당하는 Handler
    const handleSort = (e) => {
        const order = e.target.value;
        setSortOrder(order);

        let sortedReviews = [...myReview];
        if (order === 'ratingAsc') {
            sortedReviews.sort((a, b) => a.star - b.star);
        } else if (order === 'ratingDesc') {
            sortedReviews.sort((a, b) => b.star - a.star);
        } else if (order === 'dateAsc') {
            sortedReviews.sort((a, b) => new Date(a.regDate) - new Date(b.regDate));
        } else {
            sortedReviews.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
        }
        setMyReview(sortedReviews);
    };

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <div className={styles.myreview_wrap}>
            <div className={styles.myreview_title}>
                <span>{currentNick}&nbsp;{lang.whoseReview}</span>
            </div>
            <div className={styles.sort_buttons}>
                <select onChange={handleSort} value={sortOrder}>
                    <option value="dateDesc">{lang.sortByMostRecent}</option>
                    <option value="dateAsc">{lang.sortByPastWriting}</option>
                    <option value="ratingDesc">{lang.sortByHighestRating}</option>
                    <option value="ratingAsc">{lang.sortByLowestRating}</option>
                </select>
            </div>
            {myReview.length === 0 ? (
                <div className={styles.no_reviews}>
                    {lang.noReview}
                </div>
            ) : (
                myReview.map((review, index) => (
                    <div key={index} className={styles.review_content}>
                        <div className={styles.game_info}>
                            <div className={styles.game_image}>
                                <img src={review.img_src} alt="게임 이미지" />
                            </div>
                            <div className={styles.game_name}>
                                <h3>{review.gameName}</h3>
                            </div>
                            <div className={styles.game_buttons}>
                                <Link to={`/detail/${review.no}`}>
                                    <button className={styles.detail_button}>{lang.detailPage}</button>
                                </Link>
                                <Link to={review.game_href}>
                                    <button className={styles.play_button}>{lang.buyOrPlay}</button>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.review_info}>
                            <div className={styles.review_details}>
                                <div className={styles.review_text}>
                                    <p><strong>{lang.writtenReview}</strong> {review.review}</p>
                                </div>
                                <div className={styles.review_rating}>
                                    <p><strong>{lang.score}</strong> {[...Array(review.star)].map((_, i) => (
                                        <FaStar key={i} color="#ffc107" />
                                    ))}</p>
                                </div>
                                <div className={styles.review_date}>
                                    <p><strong>{lang.writtenDate}</strong> {review.regDate}</p>
                                </div>
                            </div>
                            <div className={styles.review_actions}>
                                <button onClick={() => editBtnClickHandler(review)}>{lang.modify}</button>
                                <button onClick={() => deleteBtnClickHandler(review.no)}>{lang.delete}</button>
                            </div>
                        </div>
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
                            <button className="save-button" onClick={() => saveEditHandler(editingReview.no)}>{lang.save}</button>
                            <button className="cancel-button" onClick={cancelEditHandler}>{lang.cancel}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </motion.div>
    );
}
export default MyReviewList;
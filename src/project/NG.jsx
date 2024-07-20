import React from "react";
import './css/index.css';
import './css/common.css';
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NG = () => {
    return (
        <div id="ng" className="ng-container">
            <h1>올바르지 않은 요청입니다</h1>
            <Link to={'/'}>
                <button className="home-button">
                    <FaHome size={20} />
                    <span>홈페이지로 돌아가기</span>
                </button>
            </Link>
        </div>
    );
}

export default NG;
import React, { useState } from "react";
import './css/index.css';
import { getProdFlag } from "./utils/utils";
import { Link } from "react-router-dom";
const Footer = () => {

    //Handler
    const footerLogoClickHadnler = () => {
        if(!getProdFlag()) console.log('[Footer] footerLogoClickHadnler()'); {
            window.scroll({top: 0, left: 0, behavior: 'smooth'});
        }
    }

    return(
        <div id="footer">
            <div className="footer_content">
                <div className="footer_logo">
                    <img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} alt="logo" onClick={footerLogoClickHadnler}/>
                </div>
            <div className="footer_text">
                <div className="copyright">
                    © 2024 Games Corporation. All rights reserved.
                </div>
            <div className="footer_info">
                <Link to={'/privacypolicy'} onClick={footerLogoClickHadnler}>개인정보처리방침</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to={'/termsofservice'} onClick={footerLogoClickHadnler}>이용약관</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to={'/copyrightpolicy'} onClick={footerLogoClickHadnler}>저작권 정책</Link>
            </div>
        </div>
    </div>
</div>
    );
}

export default Footer;
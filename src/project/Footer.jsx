import React from "react";
import './css/footer.css';
import { Link } from "react-router-dom";
import { getProdFlag } from "./utils/utils";
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
                    <img src={`${process.env.PUBLIC_URL}/imgs/logo.png`} onClick={footerLogoClickHadnler}/>
                </div>
            <div className="footer_text">
                <div className="copyright">
                    © 2024 Games Corporation. All rights reserved.
                </div>
            <div className="footer_info">
                <a href="#none">개인정보처리방침</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#none">이용약관</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#none">저작권 정책</a>
            </div>
        </div>
    </div>
</div>
    );
}

export default Footer;